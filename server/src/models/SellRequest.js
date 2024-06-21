import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const sellRequestSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    productDetails: {
        name: { type: String, required: true },
        brand: { type: String, required: true },
        model: String,
        condition: {
            type: String,
            enum: ['like new', 'good', 'fair', 'acceptable'],
            required: true
        }
    },
    images: [{
        type: String,
        required: true
    }],
    offerPrice: {
        type: Number,
        min: 0
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'rejectedWithRecyclingProposal'],
        default: 'pending'
    },
    paymentToken: {
        type: String,
        required: function () {
            return this.status === 'accepted';
        }
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'processed', 'failed'],
        default: 'pending'
    },
    sellerAcceptedAt: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const SellRequest = mongoose.model('SellRequest', sellRequestSchema);
export default SellRequest;