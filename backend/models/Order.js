import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  address: String,
  city: String,
  state: String,
  zipCode: String,
  country: String,
  paymentMethod: String,
  cardNumber: String,
  cardExpiry: String,
  cardCvc: String,
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ],
  total: String,
  orderDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'Pending'
  }
});

// ✅ Prevent re-declaring the model
const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
