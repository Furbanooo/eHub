import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from '../server/config/db.js';
import routes from './route/routes.js';

//settings and connection to the database
dotenv.config();
const port = process.env.PORT || 3000;
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use('/api/user', routes.userRoutes);
app.use('/api/product', routes.productRoutes);
app.use('/api/category', routes.categoryRoutes);
app.use('/api/cart', routes.cartRoutes);
app.use('/api/wishlist', routes.wishlistRoutes);
app.use('/api/review', routes.reviewRoutes);
app.use('/api/rating', routes.ratingRoutes);
app.use('/api/order', routes.orderRoutes);

app.get('/test', (req, res) => {
    res.send(['test', 'test2', 'test3', 'test4']);
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})