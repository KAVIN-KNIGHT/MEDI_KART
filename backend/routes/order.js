import express from 'express';
import { getUserOrders, cancelOrder } from '../controllers/adminController.js';
import Order from '../models/Order.js'; // ✅ Import the model, don't declare it here

const router = express.Router();

// POST route for saving order
router.post('/checkout', async (req, res) => {
  try {
    const { userId, ...orderData } = req.body;

    if (!userId) return res.status(400).json({ message: 'User ID is required' });

    const newOrder = new Order({
      ...orderData,
      userId
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong while saving the order.' });
  }
});

router.get('/orders/user/:userId', getUserOrders);
router.patch('/orders/:id/cancel', cancelOrder);

export default router;