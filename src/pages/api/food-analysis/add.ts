import type { NextApiRequest, NextApiResponse } from 'next';
import { addFoodAnalysis } from '../../../lib/db';
import { FoodAnalysisInput } from '../../../models/FoodAnalysis';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只允許 POST 請求' });
  }

  try {
    const foodAnalysisData: FoodAnalysisInput = req.body;
    const result = await addFoodAnalysis(foodAnalysisData);

    if (!result.success) {
      throw new Error(result.error);
    }

    res.status(201).json(result);
  } catch (error) {
    console.error('新增飲食分析失敗:', error);
    res.status(500).json({
      success: false,
      error: '新增飲食分析失敗'
    });
  }
} 