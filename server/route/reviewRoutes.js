import express from "express";
import { authenticate } from "../middleware/auth.js";
import reviewControllers from "../controllers/reviewContrller.js";
const reviewRoutes = express.Router();

reviewRoutes.post('/review', authenticate, reviewControllers.addReview);
reviewRoutes.delete('/review/:id', authenticate, reviewControllers.deleteReview);
reviewRoutes.get('/review/:id', reviewControllers.getProductReviews);

export default reviewRoutes