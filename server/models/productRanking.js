import mongoose from "mongoose";
const Schema = mongoose.Schema;
const productRankingSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    rankingScore: {
        type: Number,
        required: true,
    },
    rankingCategory: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    }
}, { timestamps: true });

const ProductRanking = mongoose.model("ProductRanking", productRankingSchema);
export default ProductRanking;
