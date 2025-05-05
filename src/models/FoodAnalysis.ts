import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const FoodAnalysisSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  dish: {
    type: String,
    required: [true, '請輸入菜品名稱'],
    maxlength: [100, '菜品名稱不能超過100個字']
  },
  nutritionFacts: {
    calories: {
      type: Number,
      required: true
    },
    protein: {
      type: Number,
      required: true
    },
    carbohydrates: {
      type: Number,
      required: true
    },
    fat: {
      type: Number,
      required: true
    },
    fiber: {
      type: Number,
      required: true
    },
    sugar: {
      type: Number,
      required: true
    },
    sodium: {
      type: Number,
      required: true
    }
  },
  healthScore: {
    type: Number,
    required: true,
    min: [0, '健康評分最低為0'],
    max: [100, '健康評分最高為100']
  },
  analysis: {
    type: String,
    required: [true, '請輸入分析結果'],
    maxlength: [2000, '分析結果不能超過2000個字']
  },
  recommendations: [{
    type: String,
    maxlength: [500, '建議不能超過500個字']
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.FoodAnalysis || mongoose.model('FoodAnalysis', FoodAnalysisSchema);

export interface NutritionFacts {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
}

export interface FoodAnalysis {
  _id?: ObjectId;
  restaurantId: ObjectId;
  dish: string;
  nutritionFacts: NutritionFacts;
  healthScore: number;
  analysis: string;
  recommendations: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FoodAnalysisInput extends Omit<FoodAnalysis, '_id' | 'createdAt' | 'updatedAt'> {} 