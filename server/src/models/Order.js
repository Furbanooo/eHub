import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    email: {
        type: String,
        required: true
    },
    products: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product' }, // Made optional for swaps
        quantity: { type: Number, min: 1 }
    }],
    totalPrice: {
        type: Number,
        min: 0
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String
    },
    paymentDetails: {
        paymentMethod: {
            type: String,
            enum: ['creditCard', 'paypal'],
            required: function () {
                return this.orderType === 'BUY';
            }
        },
        token: {
            type: String,
            required: function () {
                return this.orderType === 'BUY';
            }
        },
        amount: {
            type: Number,
            min: 0,
            required: function () {
                return this.orderType === 'BUY';
            }
        },
        currency: {
            type: String,
            default: 'USD'
        },
        transactionStatus: {
            type: String,
            enum: ['pending', 'processing', 'success', 'failed'],
            default: 'pending'
        },
        transactionId: String
    },
    shippingDetails: {
        carrier: String,
        trackingNumber: String,
        estimatedDeliveryDate: Date
    },
    orderNotes: String,
    orderType: {
        type: String,
        enum: ['BUY', 'SWAP'],
        required: true
    },
    swapDetails: {
        offeredProductId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: function () {
                return this.orderType === 'SWAP';
            }
        },
        desiredProductId: { // Reference to the desired product
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: function () {
                return this.orderType === 'SWAP';
            }
        },
        swapStatus: {
            type: String,
            enum: ['pending', 'processing', 'shipped', 'completed', 'cancelled'],
            default: 'pending'
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;