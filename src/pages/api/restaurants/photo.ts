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
        const { photo_reference } = req.query;

        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/photo`,
            {
                params: {
                    maxwidth: 400,
                    photo_reference,
                    key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
                },
                responseType: 'arraybuffer',
            }
        );

        res.setHeader('Content-Type', 'image/jpeg');
        res.send(response.data);
    } catch (error) {
        console.error('Google Maps Photo API 錯誤:', error);
        res.status(500).json({ message: '無法獲取餐廳照片' });
    }
} 