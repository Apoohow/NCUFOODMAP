import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db('ncufoodmap');
    
    // 嘗試執行一個簡單的命令來測試連接
    await db.command({ ping: 1 });
    
    res.status(200).json({ message: '成功連接到 MongoDB！' });
  } catch (error) {
    console.error('MongoDB 連接錯誤:', error);
    res.status(500).json({ error: '無法連接到 MongoDB' });
  }
} 