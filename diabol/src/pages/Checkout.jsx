import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/checkout.css';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(items);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    return (subtotal + tax).toFixed(2);
  };

 // In Checkout.jsx, update the handleSubmit function:
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  const orderNumber = `#${Math.floor(Math.random() * 1000000)}`;
  
 const user = JSON.parse(localStorage.getItem('medikartUser'));
if (!user || !user._id) {
  alert("You must be logged in to place an order.");
  setIsLoading(false);
  return;
}

const orderDetails = {
  ...formData,
  items: cartItems,
  total: calculateTotal(),
  orderDate: new Date().toISOString(),
  userId: user._id   // ✅ include userId for linking
};


  try {
    // Simulate API call (remove this in production)
    const response = await fetch('http://localhost:3001/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderDetails)
    });

    if (response.ok) {
      // Save to localStorage as backup
      localStorage.setItem('lastOrder', JSON.stringify(orderDetails));
      
      // Clear the cart
      localStorage.removeItem('cartItems');
      
      // Show success popup
      setShowSuccessPopup(true);
      setIsLoading(false);
      
      // Redirect after 3 seconds
      setTimeout(() => {
        setShowSuccessPopup(false);
        navigate('/order-confirmation', { 
          state: orderDetails // Pass data via navigation state
        });
      }, 3000);
    } else {
      throw new Error('Order submission failed');
    }
  } catch (error) {
    console.error('Order error:', error);
    setIsLoading(false);
    alert('Order submission failed. Please try again.');
  }
};
  return (
    <>
      <Header />
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-icon">✅</div>
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your purchase. Redirecting to confirmation page...</p>
          </div>
        </div>
      )}
      
      <div className="checkout-container">
        <h1>Checkout</h1>
        <div className="checkout-content">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h2>Shipping Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input 
                  type="text" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                  required 
                  disabled={isLoading}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input 
                  type="text" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  required 
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                disabled={isLoading}
              />
            </div>
            
            <div className="form-group">
              <label>Address</label>
              <input 
                type="text" 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                required 
                disabled={isLoading}
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input 
                  type="text" 
                  name="city" 
                  value={formData.city} 
                  onChange={handleChange} 
                  required 
                  disabled={isLoading}
                />
              </div>
              <div className="form-group">
                <label>State/Province</label>
                <input 
                  type="text" 
                  name="state" 
                  value={formData.state} 
                  onChange={handleChange} 
                  required 
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Zip/Postal Code</label>
                <input 
                  type="text" 
                  name="zipCode" 
                  value={formData.zipCode} 
                  onChange={handleChange} 
                  required 
                  disabled={isLoading}
                />
              </div>
              <div className="form-group">
                <label>Country</label>
                <input 
                  type="text" 
                  name="country" 
                  value={formData.country} 
                  onChange={handleChange} 
                  required 
                  disabled={isLoading}
                />
              </div>
            </div>

            <h2>Payment Method</h2>
            <div className="payment-methods">
              <label className="payment-option">
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="credit-card" 
                  checked={formData.paymentMethod === 'credit-card'} 
                  onChange={handleChange}
                  disabled={isLoading}
                />
                Credit Card
              </label>
              
              {formData.paymentMethod === 'credit-card' && (
                <div className="credit-card-details">
                  <div className="form-group">
                    <label>Card Number</label>
                    <input 
                      type="text" 
                      name="cardNumber" 
                      value={formData.cardNumber} 
                      onChange={handleChange} 
                      placeholder="1234 5678 9012 3456" 
                      required 
                      disabled={isLoading}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input 
                        type="text" 
                        name="cardExpiry" 
                        value={formData.cardExpiry} 
                        onChange={handleChange} 
                        placeholder="MM/YY" 
                        required 
                        disabled={isLoading}
                      />
                    </div>
                    <div className="form-group">
                      <label>CVC</label>
                      <input 
                        type="text" 
                        name="cardCvc" 
                        value={formData.cardCvc} 
                        onChange={handleChange} 
                        placeholder="123" 
                        required 
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              <label className="payment-option">
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="paypal" 
                  checked={formData.paymentMethod === 'paypal'} 
                  onChange={handleChange}
                  disabled={isLoading}
                />
                PayPal
              </label>
              
              <label className="payment-option">
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="bank-transfer" 
                  checked={formData.paymentMethod === 'bank-transfer'} 
                  onChange={handleChange}
                  disabled={isLoading}
                />
                Bank Transfer
              </label>
            </div>

            <button type="submit" className="place-order-btn" disabled={isLoading}>
              {isLoading ? 'Processing Order...' : 'Place Order'}
            </button>
          </form>

          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="order-items">
              {cartItems.map((item, index) => (
                <div key={index} className="order-item">
                  <span>{item.name} x {item.quantity}</span>
                  <span>Rs {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="order-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>Rs {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax (10%)</span>
                <span>Rs {(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.1).toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>Rs {calculateTotal()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;