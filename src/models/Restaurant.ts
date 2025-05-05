import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '請輸入餐廳名稱'],
    maxlength: [60, '餐廳名稱不能超過60個字']
  },
  description: {
    type: String,
    required: [true, '請輸入餐廳描述'],
    maxlength: [1000, '描述不能超過1000個字']
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  address: {
    type: String,
    required: [true, '請輸入地址']
  },
  rating: {
    type: Number,
    min: [1, '評分最低為1'],
    max: [5, '評分最高為5']
  },
  photos: [{
    url: String,
    caption: String
  }],
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  categories: [{
    type: String
  }],
  priceRange: {
    type: String,
    enum: ['$', '$$', '$$$', '$$$$'],
    required: true
  },
  openingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// 創建地理空間索引
RestaurantSchema.index({ location: '2dsphere' });

export default mongoose.models.Restaurant || mongoose.model('Restaurant', RestaurantSchema);

export interface Restaurant {
  _id?: ObjectId;
  name: string;
  description: string;
  address: string;
  location: {
    type: 'Point';
    coordinates: [number, number]; // [經度, 緯度]
  };
  categories: string[];
  rating: number;
  priceRange: string;
  openingHours: {
    monday: { open: string; close: string };
    tuesday: { open: string; close: string };
    wednesday: { open: string; close: string };
    thursday: { open: string; close: string };
    friday: { open: string; close: string };
    saturday: { open: string; close: string };
    sunday: { open: string; close: string };
  };
  photos: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RestaurantInput extends Omit<Restaurant, '_id' | 'createdAt' | 'updatedAt'> {} 