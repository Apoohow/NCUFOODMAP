import type { NextApiRequest, NextApiResponse } from 'next';
import { getFoodAnalyses } from '../../../lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: '只允許 GET 請求' });
  }

  try {
    const { restaurantId } = req.query;
    const result = await getFoodAnalyses(restaurantId as string);

    if (!result.success) {
      throw new Error(result.error);
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('獲取飲食分析列表失敗:', error);
    res.status(500).json({
      success: false,
      error: '獲取飲食分析列表失敗'
    });
  }
} 