import mongoose from "mongoose";

const Schema = mongoose.Schema;

const swapOfferSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productOffered: { // Updated productOffered field
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
      }
    },
    images: [{ type: String }],
    additionalDetails: String,
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

//midleware should be in another file => will come back
swapOfferSchema.pre('save', async function (next) {
  const existingProduct = await Product.findOne({
    name: this.productOffered.productDetails.name,
    brand: this.productOffered.productDetails.brand,
    model: this.productOffered.productDetails.model
  });

  if (existingProduct) {
    // Product already exists in inventory
    this.productOffered.productId = existingProduct._id;
  } else {
    // Create a new product
    const newProduct = new Product({
      name: this.productOffered.productDetails.name,
      brand: this.productOffered.productDetails.brand,
      model: this.productOffered.productDetails.model
    });

    await newProduct.save();
    this.productOffered.productId = newProduct._id;
  }

  next();
});

swapOfferSchema.plugin(swapOfferMiddleware); // Apply the middleware

const SwapOffer = mongoose.model('SwapOffer', swapOfferSchema);

export default SwapOffer;