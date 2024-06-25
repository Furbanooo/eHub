import {Product} from "../models/allModels.js";

const displayAllProduct = async (req, res) => {
    try {
        const {
            category,
            subcategory,
            brand,
            minPrice,
            maxPrice,
            condition,
            sort,
            page = 1,
            limit = 10,
        } = req.query;

        //--Input Validation and Sanitization:
        //Check if page and limit are positive integers
        if (page && (!/^\d+$/.test(page) || parseInt(page) < 1)) {
            return res.status(400).json({ message: "Invalid page number" });
        }

        if (limit && (!/^\d+$/.test(limit) || parseInt(limit) < 1)) {
            return res.status(400).json({ message: "Invalid limit" });
        }

        // Check if sort option is valid
        const validSortOptions = ["priceAsc", "priceDesc", "newest", "rating"];
        if (sort && !validSortOptions.includes(sort)) {
            return res.status(400).json({ message: "Invalid sort option" });
        }

        // Sanitize input (example for category) to prevent security vulnerabilities
        const sanitizedCategory = category ? category.replace(/[^\w\s-]/g, "") : undefined;
        const sanitizedSubcategory = subcategory ? subcategory.replace(/[^\w\s-]/g, "") : undefined;
        const sanitizedBrand = brand ? brand.replace(/[^\w\s-]/g, "") : undefined;
        const sanitizedCondition = condition ? condition.replace(/[^\w\s-]/g, "") : undefined;

        //Building the Filter Object
        const filter = {};
        if (sanitizedCategory) filter.category = { $in: sanitizedCategory.split(',') };
        if (sanitizedSubcategory) filter.subcategory = { $in: sanitizedSubcategory.split(',') };
        if (sanitizedBrand) filter.brand = { $in: sanitizedBrand.split(',') };
        if (sanitizedCondition) filter.conditionGrade = sanitizedCondition;
        if (minPrice && maxPrice) {
            filter.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
        }


        // Dynamic Facet Generation
        const facets = await Product.aggregate([
            {
                $facet: {
                    categories: [{ $group: { _id: "$category", count: { $sum: 1 } } }],
                    brands: [{ $group: { _id: "$brand", count: { $sum: 1 } } }],
                    conditions: [
                        { $group: { _id: "$conditionGrade", count: { $sum: 1 } } },
                    ],
                    // ... i will add one for the best seller
                },
            },
        ]);

        //Product Retrieval:
        // Build sort object based on query parameter
        const sortOptions = {
            priceAsc: { price: 1 },
            priceDesc: { price: -1 },
            newest: { createdAt: -1 },
            rating: { "reviews.rating": -1 },
        };

        const selectedSort = sortOptions[sort] || {};

        // Fetch filtered, sorted, and paginated products
        const products = await Product.find(filter)
            .sort(selectedSort)
            .skip((page - 1) * limit)
            .limit(limit);

        // Get total count of matching products
        const totalProducts = await Product.countDocuments(filter);

        res.status(200).json({
            products,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: page,
            facets, // Include facets in response for dynamic filtering
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; //fetch all product from the db 

const findProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}; //find a product by id

const createProduct = async (req, res) => {
    const { name, description, price, image, category } = req.body;
    try {
        const newProduct = new Product({
            name,
            description,
            price,
            image,
            category,
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}; //create a new product

const updateProduct = async (req, res) => {
    const { name, description, price, image, category } = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, price, image, category },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}; //update a product by id

const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}; //delete a product by id

const productController = {
    displayAllProduct,
    findProductById,
    createProduct,
    updateProduct,
    deleteProduct
};

export default productController;