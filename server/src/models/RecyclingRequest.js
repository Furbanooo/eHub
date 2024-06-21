import mongoose from "mongoose";

const Schema = mongoose.Schema;
const recyclingRequestSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false // Allow anonymous submissions
    },
    productDetails: {
        name: { type: String, required: true },
        brand: { type: String, required: true },
        model: String,
        condition: {
            type: String,
            enum: ['working', 'not working'], // Simplify condition for recycling
            required: true
        }
    },
    images: [{
        type: String,
        required: true
    }],
    pickupAddress: {
        type: String // Or use a subdocument structure if you need more address details
    },
    sourceRequest: {
        type: Schema.Types.ObjectId,
        refPath: 'sourceRequestModel'
    }, // Dynamic reference
    sourceRequestModel: {
        type: String,
        enum: ['SellRequest', 'SwapOffer']
    },
    rewardPreference: {
        type: String,
        enum: ['promo code', 'ehub credit', 'other', 'valueFromSellRequest'],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'scheduled', 'completed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const RecyclingRequest = mongoose.model('RecyclingRequest', recyclingRequestSchema);

export default RecyclingRequest;
