import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from '../server/config/db.js';
import userRoutes from './route/userRoutes.js';


dotenv.config();
const port = process.env.PORT || 3000;

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use('/api/user', userRoutes)

app.get('/test', (req, res) => {
    res.send(['test', 'test2', 'test3', 'test4']);
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})