import models from "../models/models.js";
import Category from "../models/category.js";
import asyncHandler from 'express-async-handler';

const createProduct = asyncHandler(async (req, res) => {
    const { name, description, category: categoryName, imageUrl, price, stock, condition } = req.body;//extract all informations needed from the request 

    if (!name || !description || !categoryName || !imageUrl || !price || !stock || !condition) {
        res.status(400).json({ message: 'Please fill in all required fields' });
        return;
    }//verifies if all requires informations required exist 

    const allowedConditions = ['Perfect', 'Good', 'Fair', 'Acceptable'];
    if (!allowedConditions.includes(condition)) {
        res.status(400).json({ message: 'Invalid condition. Please choose from: ' + allowedConditions.join(', ') });
        return;
    }

    // Check if the category exists
    let category = await Category.findOne({ name: categoryName });

    // If category doesn't exist, create it
    if (!category) {
        category = new Category({ name: categoryName });
        await category.save();
    }

    try {
        const newProduct = new models.Product({
            name,
            description,
            category: category._id, // Use the category's ID
            imageUrl,
            price,
            stock,
            condition,
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }//create the product and saves it
});

const getAllProducts = asyncHandler(async (req, res) => {
    try {
        const products = await models.Product.find().populate('category').populate('ranking');// fetch all the products with ther respectif with all the differents data (categories, ranking ...)
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const getProductById = asyncHandler(async (req, res) => {
    try {
        const product = await models.Product.findById(req.params.id).populate('category').populate('ranking');
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const updateProduct = asyncHandler(async (req, res) => {
    const { name, description, category: categoryName, imageUrl, price, stock, condition } = req.body;
    const productId = req.params.id;

    try {
        // Check if the category exists
        let category = await Category.findOne({ name: categoryName });

        // If category doesn't exist, create it
        if (!category) {
            category = new Category({ name: categoryName });
            await category.save();
        }

        const updatedProduct = await models.Product.findByIdAndUpdate(
            productId,
            {
                name: name || undefined,
                description: description || undefined,
                category: category._id || undefined, // Use the category's ID
                imageUrl: imageUrl || undefined,
                price: price || undefined,
                stock: stock || undefined,
                condition: condition || undefined,
            },
            { new: true } // Return the updated document
        ).populate('category').populate('ranking');

        if (updatedProduct) {
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const deleteProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id;

    try {
        const deletedProduct = await models.Product.findByIdAndDelete(productId);
        if (deletedProduct) {
            res.status(204).send(); // No content (successful deletion)
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const searchProducts = asyncHandler(async (req, res) => {
    const { q, page = 1, limit = 10 } = req.query;

    try {
        // Build the search query
        const searchQuery = {
            $or: [
                { name: { $regex: q } },
                { category: { $regex: q } },
                { description: { $regex: q } },
                { brand: { $regex: q } }
            ],
        };

        // Fetch products with pagination and sorting
        const products = await models.Product.find(searchQuery)
            .populate("category")
            .populate("ranking")
            .skip((page - 1) * limit)
            .limit(limit);

        // Get total count of matching products for pagination
        const totalProducts = await models.Product.countDocuments(searchQuery);

        res.status(200).json({
            products,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: page
        });
    } catch (error) {
        console.error("Error searching products:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

const filterProducts = asyncHandler(async (req, res) => {
    const { category, minPrice, maxPrice, condition, bestSellers, mostPopular, page = 1, limit = 10 } = req.query;

    const query = {};// initiation of an empty objext that will contains all the filtering option

    if (category) {
        query.category = category;
    }

    if (minPrice) {
        query.price = { $gte: minPrice };
    }

    if (maxPrice) {
        if (query.price) {
            query.price.$lte = maxPrice;
        } else {
            query.price = { $lte: maxPrice };
        }
    }

    if (condition) {
        query.condition = condition;
    }

    if (bestSellers) {
        query.bestSellers = bestSellers;
    }

    if (mostPopular) {
        query.mostPopular = mostPopular;
    }

    try {
        const products = await models.Product.find(query)
            .populate('category')
            .populate('ranking')
            .skip((page - 1) * limit)
            .limit(limit);
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


const productControllers = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProducts,
    filterProducts
};

export default productControllers;
