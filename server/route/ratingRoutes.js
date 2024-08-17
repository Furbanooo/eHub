import express from "express";
import { authenticate } from "../middleware/auth.js";
import ratingController from "../controllers/ratingController.js";

const ratingRoutes = express.Router();

ratingRoutes.post('/rating', authenticate, ratingController.rateProduct);
ratingRoutes.get('/rating/:id', ratingController.getRatingByProductId);

export default ratingRoutes