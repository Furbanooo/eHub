import mongoose from "mongoose";
const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
    User: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                default: 1, // Default quantity to 1
                required: true,
            }
        }
    ],
}, { timestamps: true });

wishlistSchema.index({ User: 1, "products.productId": 1 }, { unique: true });

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
export default Wishlist;
