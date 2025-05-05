import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import Restaurant from '../../../models/Restaurant';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '只允許 POST 請求' });
  }

  try {
    await dbConnect();

    const testRestaurant = {
      name: '中大學餐',
      description: '提供美味的學生餐點',
      location: {
        type: 'Point',
        coordinates: [121.1947, 24.9704] // 中央大學的大約座標
      },
      address: '桃園市中壢區中大路300號',
      rating: 4,
      photos: [{
        url: 'https://example.com/photo.jpg',
        caption: '店面照片'
      }],
      categories: ['學生餐廳', '中式料理'],
      priceRange: '$',
      openingHours: {
        monday: { open: '08:00', close: '20:00' },
        tuesday: { open: '08:00', close: '20:00' },
        wednesday: { open: '08:00', close: '20:00' },
        thursday: { open: '08:00', close: '20:00' },
        friday: { open: '08:00', close: '20:00' },
        saturday: { open: '08:00', close: '20:00' },
        sunday: { open: '08:00', close: '20:00' }
      }
    };

    const restaurant = await Restaurant.create(testRestaurant);
    res.status(201).json({ success: true, data: restaurant });
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ success: false, error: error.message });
  }
} 