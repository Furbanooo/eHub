import models from "../models/models.js";
import asyncHandler from "express-async-handler";

const rateProduct = asyncHandler(async (res, req) => {
    const userId = req.user.id;
    const productId = req.product.id;
    const { rating } = req.body;

    //a user would be able to rate a product only if he/she had bougth at least once(have to implement that ;) )
    try {
        // Check if the user has already rated the product
        const existingRating = await models.Rating.findOne({ userID: userId, productId: productId });
        if (existingRating) {
            return res.status(400).json({ message: 'You have already rated this product' });
        }

        // Create a new rating
        const newRating = new models.Rating({
            userID: userId,
            productId: productId,
            stars: rating,
        });

        await newRating.save();

        // Update product's rating and review count
        const product = await models.Product.findById(productId);
        if (product) {
            product.rating = (product.rating * product.reviewCount + rating) / (product.reviewCount + 1);
            product.reviewCount += 1;
            await product.save();
        }

        res.status(201).json({ message: 'Thanks for your time :), you are helping to improve eHub ..!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const getRatingByProductId = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    try {
        const ratings = await models.Rating.find({ productId: productId }).populate('userID');
        res.status(200).json(ratings);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const ratingControllers = {
    rateProduct,
    getRatingByProductId
};

export default ratingControllers;
