import mongoose from "mongoose";
const Schema = mongoose.Schema;
const reviewSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    rating: {
        type: Schema.Types.ObjectId,
        ref: "Rating"
    },
    content: {
        post: {
            type: String,
            required: true
        },
        photos: [{
            type: String,
        }],
        videos: [{
            type: String,
        }],
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: [{
        type: String
    }],
    reposts: {
        type: Number,
        default: 0,
    },
    replies: [{
        type: Schema.Types.ObjectId,
        ref: "Review",
    }]
}, { timestamps: true });

const Review = mongoose.model("Review", reviewSchema);
export default Review;