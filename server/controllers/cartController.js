import models from "../models/models";
import asyncHandler from "express-async-handler";

const addToCart = asyncHandler(async (req, res) => {

    try {
        const userId = req.user.id;
        const { products } = req.body;

        // Find or create the user's cart
        let cart = await models.Cart.findOne({ User: userId });
        if (!cart) {
            cart = new models.Cart({
                User: userId,
                products: []
            });
        }

        // Merge new products into the cart
        products.forEach(item => {
            const existingItem = cart.products.find(cartItem => cartItem.productId.toString() === item.productId);
            if (existingItem) {
                existingItem.quantity += item.quantity; // Increment quantity if product exists
            } else {
                cart.products.push({ productId: item.productId, quantity: item.quantity });
            }
        });

        await cart.save();
        res.status(200).json({ message: 'Cart merged successfully', cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const deleteFromCart = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        const cart = await models.Cart.findOne({ User: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Remove the product from the cart
        cart.products = cart.products.filter(item => item.productId.toString() !== productId);

        await cart.save();
        res.status(200).json({ message: 'Product removed from cart' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const getCart = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await models.Cart.findOne({ User: userId }).populate('products');
        if (cart) {
            res.status(200).json(cart);
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default (
    cartControllers = {
        addToCart,
        deleteFromCart,
        getCart
    });