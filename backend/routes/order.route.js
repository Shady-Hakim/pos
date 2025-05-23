import express from 'express';
import {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  updateOrder,
} from '../controllers/order.controller.js';

const router = express.Router();

router.get('/', getOrders);

router.post('/', createOrder);

router.put('/:id', updateOrder);

router.delete('/:id', deleteOrder);

router.get('/:id', getOrderById);

export default router;
