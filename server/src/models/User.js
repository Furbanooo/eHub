import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    repuired: true,
  },
  password: {
    type: String,
    required: function () {
      return this.email !== null;
    },
  },
  addresses: [{
    type: {
      type: String,
      enum: ["shipping", "billing"],
      required: false,
    },
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  }],
  orders: [{
    type: Schema.Types.ObjectId,
    ref: "Order"
  }],
  sellRequests: [{
    type: Schema.Types.ObjectId,
    ref: "SellRequest"
  }],
  recyclingRequests: [{
    type: Schema.Types.ObjectId,
    ref: "RecyclingRequest"
  }],
  swapOffers: [{
    type: Schema.Types.ObjectId,
    ref: "SwapOffer"
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
export default User;