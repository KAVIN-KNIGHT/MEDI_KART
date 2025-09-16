import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/confirmation.css';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // First try to get from navigation state
    if (location.state) {
      setOrderDetails(location.state);
      // Still save to localStorage as backup
      localStorage.setItem('lastOrder', JSON.stringify(location.state));
    } else {
      // Fallback to localStorage if page is refreshed
      const savedOrder = JSON.parse(localStorage.getItem('lastOrder'));
      if (savedOrder) {
        setOrderDetails(savedOrder);
      } else {
        // No order found, redirect to home
        navigate('/');
      }
    }
  }, [location.state, navigate]);

  if (!orderDetails) {
    return <div>Loading...</div>; // Or a proper loading component
  }
  return (
    <>
      <Header />
      <div className="confirmation-container">
        <div className="confirmation-card">
          <div className="confirmation-icon">✅</div>
          <h1>Order Confirmed!</h1>
          <p className="confirmation-message">
            Thank you for your purchase. Your order has been placed successfully.
          </p>
          
          {orderDetails && (
            <div className="order-details">
              <h2>Order Summary</h2>
              <div className="detail-row">
                <span>Order Number:</span>
                <span>{orderDetails.orderNumber || `#${Math.floor(Math.random() * 1000000)}`}</span>
              </div>
              <div className="detail-row">
                <span>Date:</span>
                <span>{new Date(orderDetails.orderDate).toLocaleDateString()}</span>
              </div>
              <div className="detail-row">
                <span>Total:</span>
                <span>Rs{orderDetails.total}</span>
              </div>
              
              <h3>Shipping Information</h3>
              <p>
                {orderDetails.firstName} {orderDetails.lastName}<br />
                {orderDetails.address}<br />
                {orderDetails.city}, {orderDetails.state} {orderDetails.zipCode}<br />
                {orderDetails.country}
              </p>
              
              <h3>Items Ordered</h3>
             <div className="ordered-items">
  <div className="ordered-item-header">
    <span>Product</span>
    <span>Total</span>
  </div>
  {orderDetails.items.map((item, index) => (
    <div key={index} className="ordered-item-row">
      <span>{item.name} × {item.quantity}</span>
      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
    </div>
  ))}
</div>

            </div>
          )}
          
          <button 
            className="continue-shopping-btn" 
            onClick={() => navigate('/products')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderConfirmation;