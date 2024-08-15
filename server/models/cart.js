import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cartSchema = new Schema({
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
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
