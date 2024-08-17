import models from "../models/models.js";
import asyncHandler from "express-async-handler";

const addReview = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const productId = req.product.id;
    const { rating, content: { post, photos, videos }, } = req.body;

    try {
        // Create a new rating
        const newRating = new models.Rating({
            userID: userId,
            productId: productId,
            stars: rating,
        });
        await newRating.save();

        // Create a new review
        const newReview = new models.Review({
            productId: productId,
            userId: userId,
            rating: newRating._id,
            content: {
                post,
                photos,
                videos
            }
        });

        await newReview.save();

        // Update product's rating and review count
        const product = await models.Product.findById(productId);
        if (product) {
            product.rating = (product.rating * product.reviewCount + rating) / (product.reviewCount + 1);
            product.reviewCount += 1;
            await product.save();
        }
        //still got something in mind for this part (identification of a bad or good review) that will have effect on the rating system 
        res.status(201).json({ message: 'Review created successfully', review: newReview });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const getProductReviews = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    try {
        const reviews = await models.Review.find({ productId: productId })
            .populate('userId')
            .populate('rating');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


const deleteReview = asyncHandler(async (req, res) => {
    const reviewId = req.params.id;
    const userId = req.user.id;

    try {
        const review = await models.Review.findById(reviewId);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        if (review.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You are not authorized to delete this review' });
        }

        await models.Review.findByIdAndDelete(reviewId);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const reviewControllers = {
    addReview,
    getProductReviews,
    deleteReview
};

export default reviewControllers;