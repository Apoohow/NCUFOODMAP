import clientPromise from './mongodb';
import { Restaurant, RestaurantInput } from '../models/Restaurant';
import { FoodAnalysis, FoodAnalysisInput } from '../models/FoodAnalysis';
import { Collection, Db, ObjectId } from 'mongodb';

let db: Db;
let restaurants: Collection<Restaurant>;
let foodAnalyses: Collection<FoodAnalysis>;

async function init() {
  if (db) return;
  try {
    const client = await clientPromise;
    db = client.db('ncufoodmap');
    restaurants = db.collection('restaurants');
    foodAnalyses = db.collection('foodAnalyses');

    // 創建地理空間索引
    await restaurants.createIndex({ location: '2dsphere' });
  } catch (error) {
    console.error('資料庫初始化失敗:', error);
    throw error;
  }
}

export async function getRestaurants() {
  try {
    await init();
    const result = await restaurants.find({}).toArray();
    return { restaurants: result };
  } catch (error) {
    return { error: '獲取餐廳列表失敗' };
  }
}

export async function getRestaurantById(id: string) {
  try {
    await init();
    const result = await restaurants.findOne({ _id: new ObjectId(id) });
    return { restaurant: result };
  } catch (error) {
    return { error: '獲取餐廳資訊失敗' };
  }
}

export async function addRestaurant(restaurantData: RestaurantInput) {
  try {
    await init();
    const now = new Date();
    const restaurant = {
      ...restaurantData,
      createdAt: now,
      updatedAt: now,
    };
    const result = await restaurants.insertOne(restaurant);
    return { restaurant: result };
  } catch (error) {
    return { error: '新增餐廳失敗' };
  }
}

export async function updateRestaurant(id: string, restaurantData: Partial<RestaurantInput>) {
  try {
    await init();
    const result = await restaurants.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { 
        $set: {
          ...restaurantData,
          updatedAt: new Date(),
        }
      },
      { returnDocument: 'after' }
    );
    return { restaurant: result };
  } catch (error) {
    return { error: '更新餐廳資訊失敗' };
  }
}

export async function deleteRestaurant(id: string) {
  try {
    await init();
    const result = await restaurants.deleteOne({ _id: new ObjectId(id) });
    return { success: result.deletedCount === 1 };
  } catch (error) {
    return { error: '刪除餐廳失敗' };
  }
}

export async function addFoodAnalysis(analysisData: FoodAnalysisInput) {
  try {
    await init();
    const now = new Date();
    const analysis = {
      ...analysisData,
      createdAt: now,
      updatedAt: now,
    };
    const result = await foodAnalyses.insertOne(analysis);
    return { success: true, analysis: result };
  } catch (error) {
    console.error('新增飲食分析失敗:', error);
    return { success: false, error: '新增飲食分析失敗' };
  }
}

export async function getFoodAnalyses(restaurantId?: string) {
  try {
    await init();
    const query = restaurantId ? { restaurantId: new ObjectId(restaurantId) } : {};
    const result = await foodAnalyses.find(query).toArray();
    return { success: true, analyses: result };
  } catch (error) {
    console.error('獲取飲食分析失敗:', error);
    return { success: false, error: '獲取飲食分析失敗' };
  }
}

export async function getFoodAnalysisById(id: string) {
  try {
    await init();
    const result = await foodAnalyses.findOne({ _id: new ObjectId(id) });
    return { success: true, analysis: result };
  } catch (error) {
    console.error('獲取飲食分析失敗:', error);
    return { success: false, error: '獲取飲食分析失敗' };
  }
} 