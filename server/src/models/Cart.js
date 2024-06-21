import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: false // Allow guest checkout
  },
  items: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, min: 1, default: 1 }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
