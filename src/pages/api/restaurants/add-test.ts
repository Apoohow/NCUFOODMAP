import { NextApiRequest, NextApiResponse } from 'next';
import { addRestaurant } from '../../../lib/db';
import { RestaurantInput } from '../../../models/Restaurant';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只允許 POST 請求' });
  }

  const testRestaurant: RestaurantInput = {
    name: '測試餐廳',
    description: '這是一個測試餐廳',
    address: '320桃園市中壢區中大路300號',
    location: {
      type: 'Point' as const,
      coordinates: [121.195043, 24.967917] // 中央大學的經緯度
    },
    rating: 4.5,
    priceRange: '$$',
    categories: ['中式料理', '學生餐廳'],
    photos: [],
    openingHours: {
      monday: { open: '11:00', close: '20:00' },
      tuesday: { open: '11:00', close: '20:00' },
      wednesday: { open: '11:00', close: '20:00' },
      thursday: { open: '11:00', close: '20:00' },
      friday: { open: '11:00', close: '20:00' },
      saturday: { open: '11:00', close: '20:00' },
      sunday: { open: '11:00', close: '20:00' }
    }
  };

  try {
    const result = await addRestaurant(testRestaurant);
    res.status(200).json(result);
  } catch (error) {
    console.error('新增測試餐廳失敗:', error);
    res.status(500).json({ error: '新增測試餐廳失敗' });
  }
} 