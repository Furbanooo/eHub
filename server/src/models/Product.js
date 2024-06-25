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
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    images: {
        type: [String],
        required: true,
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: "At least one image is required",
        },
    },
    originalPrice: {
        type: Number,
        min: 0,
    },
    refurbisher: {
        type: Schema.Types.ObjectId,
        ref: "Refurbisher",
        required: true,
    },
    conditionGrade: {
        type: String,
        enum: ["like new", "good", "acceptable"],
        required: true,
    },
    warranty: {
        type: Number,
        min: 0,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    subcategory: {
        type: String,
        required: true,
    },
    sku: {
        type: String,
        required: true,
        unique: true,
    },
    stock: {
        type: Number,
        min: 0,
        required: true,
    },
    specifications: {
        type: Object,
    },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    Brand: {
        type: Schema.Types.ObjectId,
        ref: "Brand",
        required: true,
    },
    Category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Product = mongoose.model("Product", productSchema);

export default Product;