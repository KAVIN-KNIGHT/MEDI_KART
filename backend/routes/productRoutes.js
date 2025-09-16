// routes/productRoutes.js
import express from 'express';
import { getAllProducts } from '../controllers/adminController.js'; // or make a new controller file if needed

const router = express.Router();

router.get('/products', getAllProducts); // 👈 Public product fetch

export default router;
