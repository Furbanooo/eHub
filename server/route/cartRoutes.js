import express from "express";
import cartControllers from "../controllers/cartController.js"

const cartRoutes = express.Router();

cartRoutes.post('/cart', cartControllers.addToCart);
cartRoutes.delete('/cart', cartControllers.deleteFromCart);
cartRoutes.get('/cart', cartControllers.getCart);


export default cartRoutes;