import mongoose from "mongoose";
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    parentCategory: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        default: null
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Product",
    }]
}, { timestamps: true });

const Category = mongoose.model("Category", categorySchema);
export default Category;