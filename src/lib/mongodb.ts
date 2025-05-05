import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('請在環境變數中設定 MONGODB_URI');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // 在開發環境中使用全局變數來避免重複連接
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // 在生產環境中創建新的連接
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise; 