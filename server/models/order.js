import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    }],
    totalAmount: {
        type: Number,
        required: true,
    },
    paymentId: {
        type: Schema.Types.ObjectId,
        ref: "Payment",
        required: true,
    },
    orderType: {
        type: String,
        enum: [
            'Purchase',
            'Sell-TradeIn',
            'Exchange-TradeIn',
            'Recycling'
        ],
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'on the way', 'delivered', 'cancelled'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;