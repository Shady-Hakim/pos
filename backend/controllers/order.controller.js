import mongoose from 'mongoose';
import Order from '../models/order.model.js';

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createOrder = async (req, res) => {
  const { orderId, items, totalPrice } = req.body;

  if (!orderId || !items || !totalPrice) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }

  try {
    const newOrder = new Order({ orderId, items, totalPrice });
    await newOrder.save();
    res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { orderId, items, totalPrice } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid order ID' });
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { orderId, items, totalPrice },
      { new: true }
    );

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid order ID' });
  }

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res
        .status(404)
        .json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, data: deletedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getOrderById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid order ID' });
  }

  try {
    const order = await Order.findById(id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
