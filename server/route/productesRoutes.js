import express from "express";
import productControllers from "../controllers/productController.js"
import { authenticate, authorizeAdmin } from "../middleware/auth.js";

const productRoutes = express.Router();

productRoutes.post('/admin/add', authenticate, authorizeAdmin, productControllers.createProduct);
productRoutes.get('/admin/products', authenticate, authorizeAdmin, productControllers.getAllProducts);
export default productRoutes;