import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { connectDB } from './db/connect.js';
import cityRouter from './routes/cityRoute.js';
import userRouter from './routes/userRoute.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';
import { authentication } from './middleware/Authentication.js';

const app = express();

dotenv.config();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = /^http:\/\/localhost:\d+$/;
      if (!origin || allowed.test(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS not allowed'));
      }
    },
    credentials: true, // only needed if you're sending cookies
  })
);

// Routes

app.use('/api/v1/auth', userRouter);
app.use('/api/v1/cities', authentication, cityRouter);
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
