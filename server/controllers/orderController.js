import models from "../models/models";
import asyncHandler from "express-async-handler";

const makeOder = asyncHandler(async (res, req) => {
    const { userId, products, totalAmount, paymentId, address } = req.body;

    try {

        if (!userId || !products || !totalAmount || !paymentId || !orderType || !address) {
            return res.status(400).json({ message: 'Please fill in all required fields' });
        }

        //check if the payment is valid 
        const payment = await models.Payment.findById(paymentId);
        if (!payment || payment.paymentStatus !== 'completed') {
            return res.status(400).json({ message: 'Invalid payment' });
        }

        // Check if the products are available in stock
        for (const product of products) {
            const productInDb = await models.Product.findById(product.productId);
            if (!productInDb || productInDb.stock < product.quantity) {
                return res.status(400).json({ message: `Product ${productInDb.name} is out of stock` });
            }
        }

        // Create the order
        const newOrder = new models.Order({
            userId,
            products,
            totalAmount,
            paymentId,
            orderType,
            address,
            status: 'pending' // Set initial status to 'pending'
        });
        await newOrder.save();

        // Update product stock
        for (const product of products) {
            const productInDb = await models.Product.findById(product.productId);
            productInDb.stock -= product.quantity;
            await productInDb.save();
        }

        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const updateOrder = asyncHandler(async (req, res) => {
    const orderId = req.params.id;
    const updateData = req.body;

    try {
        // Find the order by ID
        const order = await models.Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if the status is allowed to be updated
        const nonUpdatableStatuses = ['on the way', 'delivered', 'cancelled'];
        if (nonUpdatableStatuses.includes(order.status)) {
            return res.status(400).json({ message: `You can no longer update an order that is ${order.status}` });
        }

        // Update the order with the provided data
        Object.keys(updateData).forEach(key => {
            order[key] = updateData[key];
        });
        await order.save();

        res.status(200).json({ message: 'Order updated successfully', order });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const cancelOrder = asyncHandler(async (req, res) => {
    const orderId = req.params.id;

    try {
        const order = await models.Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if the status allows for cancellation
        const cancellableStatuses = ['pending', 'completed'];
        if (!cancellableStatuses.includes(order.status)) {
            return res.status(400).json({ message: `You cannot cancel an order that is ${order.status}` });
        }

        order.status = 'cancelled';
        await order.save();

        res.status(200).json({ message: 'Order cancelled successfully', order });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const trackOder = asyncHandler(async (req, res) => {
    const orderId = req.params.id;

}); //coming SOOONNNNNNNN


const getOrderById = asyncHandler(async (req, res) => {
    const orderId = req.params.id;
    try {
        const order = await models.Order.findById(orderId).populate('userId').populate('products').populate('paymentId');
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const getUserOrders = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    try {
        const userOrders = await models.Order.find({ userId }); // Find orders by userId
        res.status(200).json(userOrders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const trackProductInOrders = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    try {
        // Find all orders that contain the specified product
        const orders = await models.Order.find({ "products.productId": productId })
            .populate('userId')
            .populate('products')
            .populate('paymentId');

        // Format the response data for the frontend
        if (orders.length > 0) {
            const productTrackingData = orders.map(order => ({
                orderId: order._id,
                orderStatus: order.status,
            }));

            res.status(200).json(productTrackingData);
        } else {
            res.status(404).json({ message: 'Product not found in any orders' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});//implimented in case there is an issue with a product


const orderControllers = {
    makeOder,
    getOrderById,
    updateOrder,
    cancelOrder,
    trackOder,
    getUserOrders,
    trackProductInOrders
};

export default orderControllers;