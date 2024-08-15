import mongoose from "mongoose";
const Schema = mongoose.Schema;
const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: [{
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    }],
    imageUrl: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    reviewCount: {
        type: Number,
        default: 0,
    },
    condition: {
        type: String,
        enum: ['Perfect', 'Good', 'Fair', 'Acceptable'], // Use enum for better validation
        required: true,
    },
    ranking: {
        type: Schema.Types.ObjectId,
        ref: "ProductRanking",
        default: null,
    },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
