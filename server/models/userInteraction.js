import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userInteractionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    reviewId: { // Reference to the review being interacted with
        type: Schema.Types.ObjectId,
        ref: "Review",
        required: true,
    },
    interactionType: {
        type: String,
        enum: ['like', 'comment'], // Define allowed interaction types
        required: true,
    },
    comment: { // Store the comment text if interactionType is 'comment'
        type: String,
    },
}, { timestamps: true });

const UserInteraction = mongoose.model("UserInteraction", userInteractionSchema);
export default UserInteraction;
