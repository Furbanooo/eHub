import express from "express";
import wishlistControllers from "../controllers/wishListController.js";

const wishlistRoutes = express.Router();

wishlistRoutes.post('/wishlist', wishlistControllers.addToWishlist);
wishlistRoutes.delete('/wishlist', wishlistControllers.deleteFromWishlist);
wishlistRoutes.get('/wishlist', wishlistControllers.getWishlist);

export default wishlistRoutes;