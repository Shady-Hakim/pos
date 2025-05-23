import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    items: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
