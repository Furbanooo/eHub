import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const categorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    parentCategory: { type: Schema.Types.ObjectId, ref: 'Category' }, // For subcategories
    subcategories: [{ type: Schema.Types.ObjectId, ref: 'Category' }] // For parent categories
});

const Category = mongoose.model('Category', categorySchema);
export default Category;
