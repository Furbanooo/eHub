import mongoose from "mongoose";
//import dynamicProduct from "../middleWares/dynamicProduct.js";

const Schema = mongoose.Schema;
const swapOfferSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productDetails: {
    name: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true
    },
    model: String,
    condition: {
      type: String,
      enum: ['like new', 'good', 'fair', 'acceptable'],
      required: true
    },
    images: [{ type: String }],
    additionalDetails: String
  },
  productDesired: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    name: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true
    },
    model: String,
    category: {
      type: String,
      required: true
    },
    subcategory: String, // Optional if the user is flexible
    condition: { // Minimum acceptable condition
      type: String,
      enum: ['like new', 'good', 'acceptable'],
      required: true
    },
  },
  additionalDetails: String, // For any other information the user wants to add
  status: {
    type: String,
    enum: ['active', 'pending', 'completed', 'expired', 'rejectedWithRecyclingProposal'],
    default: 'active'
  },
  recyclingRequest: {
    type: Schema.Types.ObjectId,
    ref: 'RecyclingRequest'
  },
  matchedSwap: {
    type: Schema.Types.ObjectId,
    ref: 'SwapOffer'
  }, // Reference to the matched swap offer (if any)
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: { // To track when the offer was last updated or matched
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // This automatically manages createdAt and updatedAt fields
});

//swapOfferSchema.plugin(dynamicProduct); // Apply the middleware

const SwapOffer = mongoose.model('SwapOffer', swapOfferSchema);

export default SwapOffer;