import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    stars: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        default: 0,
    }
})

const Rating = mongoose.model("Rating", ratingSchema);
export default Rating;