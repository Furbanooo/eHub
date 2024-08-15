import express from "express";
import { authenticate, authorizeAdmin } from "../middleware/auth.js";
import categoryControllers from "../controllers/categoryController.js";

const productRoutes = express.Router();

//admin routes
productRoutes.post('/admin/addCategory',
    authenticate, authorizeAdmin, categoryControllers.createCategory);
productRoutes.get('/admin/getAllCategories',
    authenticate, authorizeAdmin, categoryControllers.getAllCategories);
productRoutes.put('/admin/categories/:id',
    authenticate, authorizeAdmin, categoryControllers.updateCategory);
productRoutes.delete('/admin/categories/:id', authenticate, authorizeAdmin, categoryControllers.deleteCategory);

//custumer routes
productRoutes.get('/categories/:id', categoryControllers.getCategoryById);
productRoutes.get('/categories', categoryControllers.getAllCategories);

export default productRoutes;