import express from 'express';
import productController from '../controllers/productControllers.js';
import asyncHandler from 'express-async-handler';
import { body } from 'express-validator';

const productRoutes = express.Router();

// GET all products
productRoutes.get('/', asyncHandler(productController.displayAllProduct));

// GET a single product by ID
productRoutes.get('/:id', asyncHandler(productController.findProductById));

//create a new product (protected route for admins only)
productRoutes.post('/',
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
productRoutes.put('/:id',
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
productRoutes.delete('/:id', asyncHandler(productController.deleteProduct));

export default productRoutes;