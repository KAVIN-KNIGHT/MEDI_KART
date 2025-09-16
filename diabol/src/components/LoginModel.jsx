// src/components/LoginModal.jsx
import React from 'react';

export default function LoginModal({ onClose, onSwitchToRegister, onLogin }) {
  return (
    <div className="modal active">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Login</h2>
        <form onSubmit={onLogin}>
          <div className="form-group">
            <label htmlFor="loginEmail">Email:</label>
            <input type="email" name="email" id="loginEmail" required />
          </div>
          <div className="form-group">
            <label htmlFor="loginPassword">Password:</label>
            <input type="password" name="password" id="loginPassword" required />
          </div>
          <button type="submit">Login</button>
          <p className="text">
            Don't have an account?{' '}
            <button type="button" className="link-btn" onClick={onSwitchToRegister}>
              Register
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
