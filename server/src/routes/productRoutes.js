import express from 'express';
import productController from '../controllers/productControllers.js';
import asyncHandler from 'express-async-handler';
import { body } from 'express-validator';

const productRoutes = () => {
    const router = express.Router();

    // GET all products
    router.get('/', 
        asyncHandler(productController.displayAllProduct)
    );

    // GET a single product by ID
    router.get(
        '/:id',
        asyncHandler(productController.findProductById)
    );

    //create a new product (protected route for admins only)
    router.post(
        '/',
        body('name').notEmpty().withMessage('Name is required'),
        body('description').notEmpty().withMessage('Description is required'),
        body('price').isNumeric().withMessage('Price must be a number'),
        body('images').isArray().withMessage('Images must be an array'),
        body('refurbisher').notEmpty().withMessage('Refurbisher is required'),
        body('conditionGrade').notEmpty().withMessage('Condition Grade is required'),
        body('warranty').isNumeric().withMessage('Warranty must be a number'),
        body('category').notEmpty().withMessage('Category is required'),
        body('subcategory').notEmpty().withMessage('Subcategory is required'),
        body('sku').notEmpty().withMessage('SKU is required'),
        body('stock').isNumeric().withMessage('Stock must be a number'),

        asyncHandler(productController.createProduct)
    );

    //update a product by ID (protected route for admins only)
    router.put(
        '/:id',
        body('name').notEmpty().withMessage('Name is required'),
        body('description').notEmpty().withMessage('Description is required'),
        body('price').isNumeric().withMessage('Price must be a number'),
        body('images').isArray().withMessage('Images must be an array'),
        body('refurbisher').notEmpty().withMessage('Refurbisher is required'),
        body('conditionGrade').notEmpty().withMessage('Condition Grade is required'),
        body('warranty').isNumeric().withMessage('Warranty must be a number'),
        body('category').notEmpty().withMessage('Category is required'),
        body('subcategory').notEmpty().withMessage('Subcategory is required'),
        body('sku').notEmpty().withMessage('SKU is required'),
        body('stock').isNumeric().withMessage('Stock must be a number'),
        asyncHandler(productController.updateProduct)
    );

    // DELETE a product by ID (protected route for admins only)
    router.delete('/:id',
        asyncHandler(productController.deleteProduct)
    );

    return router;
}

export default productRoutes;