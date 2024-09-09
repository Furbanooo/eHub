import models from "../models/models.js";
import asyncHandler from "express-async-handler";


const makeOrder = asyncHandler(async (res, req) => {
    const { userId, products, totalAmount, paymentIntentId, address, orderType } = req.body;

    try {
        // Check if the products are available in stock
        for (const product of products) {
            const productInDb = await models.Product.findById(product.productId);
            if (!productInDb || productInDb.stock < product.quantity) {
                return res.status(400).json({ message: `Product ${productInDb.name} is out of stock` });
            }
        }

        const newOrder = new models.Order({
            userId,
            products,
            orderType,
            totalAmount,
            paymentId: null, // No payment yet
            address,
            status: 'pending', // Set as pending
        });

        await newOrder.save();


        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const stripeWebhook = asyncHandler(async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        const order = await models.Order.findOne({ paymentId: session.id });

        if (order) {
            // Update stock for each product
            for (const item of order.products) {
                const product = await models.Product.findById(item.productId);
                if (product) {
                    product.stock -= item.quantity; // Reduce stock
                    await product.save();
                }
            }

            // Notify the user (e.g., via email or in-app notification)
            notifyUser(order.userId, 'Your order is complete! Thank you for shopping with us.');

            // Mark the order as completed
            order.status = 'completed';
            await order.save();
        }
    }
    res.status(200).json({ received: true });
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
    stripeWebhook,
    makeOrder,
    getOrderById,
    updateOrder,
    cancelOrder,
    trackOder,
    getUserOrders,
    trackProductInOrders
};

export default orderControllers;  