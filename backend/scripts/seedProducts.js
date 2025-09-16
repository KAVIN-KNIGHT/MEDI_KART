import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

dotenv.config();

const defaultProducts = [
  // same 8 product objects from earlier (DON’T delete them!)
];

async function seedDefaultProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🌱 Connected to MongoDB');

    for (const product of defaultProducts) {
      const exists = await Product.findOne({ name: product.name });
      if (!exists) {
        await Product.create(product);
        console.log(`✅ Added default product: ${product.name}`);
      } else {
        console.log(`⚠️ Already exists: ${product.name}`);
      }
    }

    console.log('🌟 Default products seeding complete');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding products:', err.message);
    process.exit(1);
  }
}

seedDefaultProducts();
