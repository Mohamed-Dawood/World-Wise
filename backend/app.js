import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { connectDB } from './db/connect.js';
import cityRouter from './routes/cityRoute.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

dotenv.config();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Routes
app.use('/api/v1/cities', cityRouter);
app.use(notFound);
app.use(errorHandler);

const DB = process.env.MONGO_DB_URL.replace(
  '<db_password>',
  process.env.MONGO_DB_PASSWORD
);

const port = process.env.PORT;

const start = async () => {
  try {
    await connectDB(DB);
    app.listen(port, () => {
      console.log(`App is running on port ${port}...`);
    });
  } catch (error) {
    console.log("Server Couldn't Start", error);
    process.exit(1);
  }
};
start();
