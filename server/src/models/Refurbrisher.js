import mongoose from "mongoose";

const Schema = mongoose.Schema;
const refurbisherSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    certifications: [String],
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

const Refurbisher = mongoose.model('Refurbisher', refurbisherSchema);

export default Refurbisher;