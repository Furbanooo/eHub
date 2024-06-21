import mongoose from "mongoose";

const Schema = mongoose.Schema;
const brandSchema = new Schema({
    name: { type: String, required: true, unique: true },
    logo: String, // URL of the brand logo
    description: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }] // References to products of this brand
});

const Brand = mongoose.model('Brand', brandSchema);
export default Brand;
