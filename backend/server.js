import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import routes
import orderRoutes from './routes/order.js';
import userRoutes from './routes/users.js';
import adminRoutes from './routes/adminRoutes.js';
import productRoutes from './routes/productRoutes.js';
// Import User model
import User from './models/User.js';

// Initialize app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('✅ MongoDB connected');

  // 💥 Optional: Make admin user here
  async function makeAdmin() {
    try {
      const user = await User.findOne({ email: 'admin@medikart.com' });
      if (user) {
        user.role = 'admin';
        await user.save();
        console.log('🛠️ Admin role updated!');
      } else {
        console.log('❌ Admin user not found');
      }
    } catch (err) {
      console.error('⚠️ Error in makeAdmin:', err.message);
    }
  }

  await makeAdmin(); // 🔧 Run the function once after DB connection

  // Mount routes
  app.use('/api', orderRoutes);
  app.use('/api', userRoutes);
  app.use('/api', adminRoutes);
  app.use('/api', productRoutes);
  // Default test route
  app.get('/', (req, res) => {
    res.send('Welcome to MediKart API 🚀');
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch(err => console.error('❌ MongoDB connection error:', err));
