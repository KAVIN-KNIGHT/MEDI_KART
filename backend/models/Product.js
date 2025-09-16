import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  originalPrice: Number,
  image: String,
  badge: String,
  rating: Number,
  reviews: Number,
  description: String,
  stock: Number,
  dosage: String,
  ingredients: [String],
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});


const Product = mongoose.model('Product', productSchema);

export default Product; // ✅ Make sure it's a default export
