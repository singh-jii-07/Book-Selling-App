import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    book: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
      }
    ],
    status: {
      type: String,
      enum: ['order placed', 'shipped', 'delivered', 'cancelled', 'pending'],
      default: 'order placed'
    }
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model('Order', OrderSchema);
export default Order;
