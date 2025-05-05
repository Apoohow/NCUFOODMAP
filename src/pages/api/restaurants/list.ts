import { NextApiRequest, NextApiResponse } from 'next';
import { getRestaurants } from '../../../lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: '只允許 GET 請求' });
  }

  try {
    const result = await getRestaurants();
    res.status(200).json(result);
  } catch (error) {
    console.error('獲取餐廳列表失敗:', error);
    res.status(500).json({ error: '獲取餐廳列表失敗' });
  }
} 