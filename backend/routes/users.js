import express from 'express';
import { signupUser, loginUser } from '../controllers/userController.js';
import { getAllProducts } from '../controllers/adminController.js'; // ✅ import this to reuse


const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);

// ✅ Public route to fetch all products
router.get('/products', getAllProducts);

export default router;
