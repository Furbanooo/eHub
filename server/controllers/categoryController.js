import models from '../models/models';
import asyncHandler from 'express-async-handler';

const createCategory = asyncHandler(async (req, res) => {
    const { name, description, imageUrl, parentCategory } = req.body;

    if (!name || !description || !imageUrl) {
        res.status(400).json({ message: 'Please fill in all required fields' });
        return;
    }

    const newCategory = new models.Category({
        name,
        description,
        imageUrl,
        parentCategory,
    });

    try {
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

const deleteCategory = asyncHandler(async (req, res) => {
    const categoryID = req.params.id;

    try {
        const deleteCategory = await models.Category.findByIdAndDelete(categoryID);
        if (deleteCategory) {
            res.status(204).send(); // No content (successful deletion)
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

const addProductToCategory = asyncHandler(async (req, res) => {
    //get the category and product id from the request 
    const { productId } = req.body;
    const categoryID = req.params.id;

    try {
        //check if the category exist
        const category = await models.Category.findById(categoryID);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const product = await models.Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Add the product ID to the category's 'products' array
        category.products.push(productId);

        await category.save();
        res.status(200).json({ message: 'Product added to category successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const removeProductFromCategory = asyncHandler(async (req, res) => {
    const { productId } = req.body;
    const categoryID = req.params.id;
    try {
        const category = await models.Category.findById(categoryID);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const product = await models.Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        category.products.filter(id => id.toString() !== productId.toString());
        await category.save();
        res.status(200).json({ message: 'Product removed from category successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const getAllCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await models.Category.find().populate('products').populate('parentCategory');
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const getCategoryById = asyncHandler(async (req, res) => {
    try {
        const category = await models.Category.findById(req.params.id).populate('products').populate('parentCategory');
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const updateCategory = asyncHandler(async (req, res) => {
    const { name, description, imageUrl, parentCategory } = req.body;
    const categoryID = req.params.id;

    try {
        const updatedCategory = await models.Category.findByIdAndUpdate(
            categoryID,
            {
                name: name || undefined,
                description: description || undefined,
                imageUrl: imageUrl || undefined,
                parentCategory: parentCategory || undefined,
            },
            { new: true } // Return the updated document
        ).populate('products').populate('parentCategory');

        if (updatedCategory) {
            res.status(200).json(updatedCategory);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const categoryControllers = {
    createCategory,
    deleteCategory,
    addProductToCategory,
    removeProductFromCategory,
    getAllCategories,
    getCategoryById,
    updateCategory
};
export default categoryControllers;