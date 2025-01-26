import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

const connectDB = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('db_ques'); 
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    throw err;
  }
};

export default connectDB;
