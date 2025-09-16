// routes/adminRoutes.js
import express from 'express';
import { addProduct, getAllProducts, deleteProduct, getAllUsers } from '../controllers/adminController.js';
import { getAllOrders } from '../controllers/adminController.js';

const router = express.Router();

router.post('/admin/products', addProduct);
router.get('/admin/products', getAllProducts);
router.delete('/admin/products/:id', deleteProduct);
router.get('/admin/users', getAllUsers);
router.get('/admin/orders', getAllOrders);
export default router;
