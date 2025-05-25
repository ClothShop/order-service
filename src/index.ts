import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import orderRoutes from './routes/order.routes';
import cookieParser from 'cookie-parser';

dotenv.config();

const PORT = process.env.PORT || 8082;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use('/api/v1/orders', orderRoutes);

connectDB();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
