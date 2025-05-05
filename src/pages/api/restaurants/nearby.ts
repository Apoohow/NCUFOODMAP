import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: '只允許 GET 請求' });
    }

    try {
        const { type, radius, lat, lng } = req.query;

        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
            {
                params: {
                    location: `${lat},${lng}`,
                    radius: radius || 1000,
                    type: 'restaurant',
                    keyword: type || '',
                    language: 'zh-TW',
                    key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
                },
            }
        );

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Google Maps API 錯誤:', error);
        res.status(500).json({ message: '無法獲取餐廳資訊' });
    }
} 