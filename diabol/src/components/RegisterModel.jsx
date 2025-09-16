// src/components/RegisterModal.jsx
import React from 'react';

export default function RegisterModal({ onClose, onSwitchToLogin, onRegister }) {
  return (
    <div className="modal active">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Register</h2>
        <form onSubmit={onRegister}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name:</label>
            <input type="text" name="name" id="fullName" required />
          </div>
          <div className="form-group">
            <label htmlFor="registerEmail">Email:</label>
            <input type="email" name="email" id="registerEmail" required />
          </div>
          <div className="form-group">
            <label htmlFor="registerPhone">Phone:</label>
            <input type="tel" name="phone" id="registerPhone" required />
          </div>
          <div className="form-group">
            <label htmlFor="registerPassword">Password:</label>
            <input type="password" name="password" id="registerPassword" required />
          </div>
          <button type="submit">Register</button>
          <p className="text">
            Already have an account?{' '}
            <button type="button" className="link-btn" onClick={onSwitchToLogin}>
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
