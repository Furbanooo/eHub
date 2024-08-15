import models from "../models/models.js";
import asyncHandler from "express-async-handler";

const addToWishlist = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
        const { products } = req.body;

        // Find or create the user's wishlist
        let wishlist = await models.Wishlist.findOne({ user: userId });
        if (!wishlist) {
            wishlist = new models.Wishlist({
                user: userId,
                products: []
            });
        }

        // Merge new products into the wishlist
        products.forEach(item => {
            const existingItem = wishlist.products.find(wishlistItem => wishlistItem.productId.toString() === item.productId);
            if (!existingItem) {
                wishlist.products.push({ productId: item.productId, quantity: 1 }); // Add quantity if not present
            }
        });

        await wishlist.save();

        res.status(200).json({ message: 'Wishlist merged successfully', wishlist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const deleteFromWishlist = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        const wishlist = await models.Wishlist.findOne({ user: userId });
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        // Remove the product from the wishlist
        wishlist.products = wishlist.products.filter(item => item.productId.toString() !== productId);

        await wishlist.save();
        res.status(200).json({ message: 'Product removed from wishlist' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const getWishlist = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
        const wishlist = await models.Wishlist.findOne({ user: userId }).populate('products');
        if (wishlist) {
            res.status(200).json(wishlist);
        } else {
            res.status(404).json({ message: 'Wishlist not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export default (
    wishlistControllers = {
        addToWishlist,
        deleteFromWishlist,
        getWishlist
    }
);
