import express from "express";
import productControllers from "../controllers/productController.js"
import { authenticate, authorizeAdmin } from "../middleware/auth.js";

const productRoutes = express.Router();

//admin routes
productRoutes.post('/admin/addProducts',
    authenticate, authorizeAdmin, productControllers.createProduct);
productRoutes.get('/admin/getAllProducts',
    authenticate, authorizeAdmin, productControllers.getAllProducts);
productRoutes.put('/admin/products/:id',
    authenticate, authorizeAdmin, productControllers.updateProduct);
productRoutes.delete('/admin/products/:id', authenticate, authorizeAdmin, productControllers.deleteProduct);

//custumer routes
productRoutes.get('/:id', productControllers.getProductById);
productRoutes.get('/', productControllers.getAllProducts);

export default productRoutes;