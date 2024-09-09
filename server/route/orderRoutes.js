import express from "express";
import orderControllers from "../controllers/orderController.js";
import checkOut from "../controllers/thirdParties.js/stripeCheckout.js";
import { authenticate, authorizeAdmin } from "../middleware/auth.js";
const orderRoutes = express.Router();

orderRoutes.post('/makeorder', orderControllers.makeOrder);
orderRoutes.post('/checkout', checkOut);
orderRoutes.post('/webhook', express.raw({ type: 'application/json' }), orderControllers.stripeWebhook);
orderRoutes.get('/user/:userId/orders', authenticate, orderControllers.getUserOrders);// Get all orders for a specific user
orderRoutes.put('/:id', orderControllers.updateOrder);// Update orders
orderRoutes.delete('/:id', orderControllers.cancelOrder); // Cancel orders

//admin side 
orderRoutes.get('/:prductId', authenticate, authorizeAdmin, orderControllers.trackProductInOrders); //Track product in orders by product ID
orderRoutes.get('/:id', orderControllers.getOrderById);

export default orderRoutes;
