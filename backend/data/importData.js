import fs from 'fs';
import dotenv from 'dotenv';
import { connectDB } from '../db/connect.js';
import City from '../models/cityModel.js';

dotenv.config();

const data = JSON.parse(fs.readFileSync('data/data.json', 'utf-8'));

const DB = process.env.MONGO_DB_URL.replace(
  '<db_password>',
  process.env.MONGO_DB_PASSWORD
);

const importDate = async () => {
  try {
    await connectDB(DB);

    await City.deleteMany();
    console.log('Data deleted successfully');

    await City.create(data);
    console.log('Data Imported Successfully');
  } catch (error) {
    console.log(error);
  }
};
importDate();
