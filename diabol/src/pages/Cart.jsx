import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem('cartItems')) || []);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const calculateTotals = () => {
      const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const tax = subtotal * 0.1;
      const total = subtotal + tax;
      setSubtotal(subtotal);
      setTax(tax);
      setTotal(total);
    };
    calculateTotals();
  }, [cartItems]);

  useEffect(() => {
    const user = localStorage.getItem('medikartUser');
    setIsLoggedIn(!!user);
  }, []);

  const updateQuantity = (index, change) => {
    const newQuantity = cartItems[index].quantity + change;
    if (newQuantity < 1) {
      removeItem(index);
      return;
    }
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    if (isLoggedIn) {
      navigate('/checkout');
    } else {
      alert('Please log in to proceed to checkout.');
    }
  };

  return (
    <>
      <Header />
      <div className="cart-container">
        <div className="cart-items">
          <div className="cart-header">
            <h2>Your Cart ({cartItems.length} items)</h2>
          </div>
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <i className="fas fa-shopping-cart"></i>
              <h3>Your cart is empty</h3>
              <p>Looks like you haven't added anything to your cart yet</p>
              <Link to="/products" className="continue-shopping">Continue Shopping</Link>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <div className="cart-item-price">Rs {item.price.toFixed(2)}</div>
                  <div className="quantity-control">
                    <button className="quantity-btn minus" onClick={() => updateQuantity(index, -1)}>-</button>
                    <input
                      type="number"
                      className="quantity-input"
                      value={item.quantity}
                      readOnly
                    />
                    <button className="quantity-btn plus" onClick={() => updateQuantity(index, 1)}>+</button>
                  </div>
                  <button className="remove-item" onClick={() => removeItem(index)}>
                    <i className="fas fa-trash"></i> Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>Rs {subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Tax</span>
            <span>Rs {tax.toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>Rs {total.toFixed(2)}</span>
          </div>

          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>

          {!isLoggedIn && (
            <p className="checkout-warning">⚠️ You must be logged in to proceed to checkout.</p>
          )}
        </div>
      </div>
     
    </>
  );
};

export default Cart;
