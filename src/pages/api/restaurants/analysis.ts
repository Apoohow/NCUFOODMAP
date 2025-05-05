import { NextApiRequest, NextApiResponse } from 'next';
import { getRestaurants } from '../../../lib/db';

interface Analysis {
  totalRestaurants: number;
  categories: Record<string, number>;
  averageRating: number;
  priceDistribution: Record<string, number>;
  popularHours: Record<string, number>;
  locationClusters: any[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: '只允許 GET 請求' });
  }

  try {
    const result = await getRestaurants();
    const restaurants = result.restaurants || [];
    
    // 初始化分析結果
    const analysis: Analysis = {
      totalRestaurants: restaurants.length,
      categories: {},
      averageRating: 0,
      priceDistribution: {},
      popularHours: {},
      locationClusters: []
    };

    // 計算統計數據
    let totalRating = 0;
    restaurants.forEach(restaurant => {
      // 統計類別
      restaurant.categories.forEach(category => {
        analysis.categories[category] = (analysis.categories[category] || 0) + 1;
      });

      // 計算平均評分
      totalRating += restaurant.rating;

      // 統計價格分布
      analysis.priceDistribution[restaurant.priceRange] = 
        (analysis.priceDistribution[restaurant.priceRange] || 0) + 1;
    });

    analysis.averageRating = restaurants.length > 0 ? totalRating / restaurants.length : 0;

    res.status(200).json(analysis);
  } catch (error) {
    console.error('分析餐廳數據失敗:', error);
    res.status(500).json({ error: '分析餐廳數據失敗' });
  }
} 