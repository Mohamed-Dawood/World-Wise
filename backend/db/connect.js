import mongoose from 'mongoose';

export const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log('DB connected successfully...');
  } catch (error) {
    console.error('Error in connecting DB:', error);
    throw new Error('DB Connection Failed');
  }
};
