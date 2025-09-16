import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../styles/profile.css';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
  const storedUser = localStorage.getItem('medikartUser');
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    fetch(`http://localhost:3001/api/orders/user/${parsedUser._id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch orders');
        return res.json();
      })
      .then((data) => setOrders(data))
      .catch((err) => {
        console.error('Fetch error:', err);
      });
  }
}, []);

  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-login-prompt">
          <h2>Please login to view your profile</h2>
          <Link to="/login" className="login-link">Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <Avatar 
          sx={{ 
            width: 80, 
            height: 80,
            bgcolor: 'primary.main',
            color: 'white',
            fontSize: '2.5rem'
          }}
        >
          {user?.fullname ? 
            user.fullname.charAt(0).toUpperCase() :
            <AccountCircleIcon sx={{ fontSize: 60 }} />
          }
        </Avatar>
      </div>

      <div className="profile-content">
        <div className="profile-info">
          <h2>Personal Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Full Name:</span>
              <span className="info-value">{user.fullname || user.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{user.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Phone:</span>
              <span className="info-value">{user.phone || 'Not provided'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Member Since:</span>
              <span className="info-value">{new Date(user.createdAt || Date.now()).toLocaleDateString()}</span>
            </div>
          </div>
          <Link to="/profile/edit" className="edit-btn">Edit Profile</Link>
        </div>

        <div className="profile-orders">
          <h2>Recent Orders</h2>
          {loading ? (
            <p>Loading orders...</p>
          ) : error ? (
            <p className="error-msg">{error}</p>
          ) : orders.length > 0 ? (
            <div className="orders-list">
              {orders.map(order => (
                <div key={order._id} className="order-card">
                  <div className="order-header">
                    <span className="order-id">Order #{order._id.slice(-6).toUpperCase()}</span>
                    <span className={`order-status ${order.status.toLowerCase()}`}>{order.status}</span>
                  </div>
                  <div className="order-details">
                    <span className="order-date">Date: {new Date(order.createdAt).toLocaleDateString()}</span>
                    <span className="order-total">Total: ₹{order.total.toFixed(2)}</span>
                  </div>
                  <Link to={`/orders/${order._id}`} className="order-link">View Details</Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-orders">You haven't placed any orders yet.</p>
          )}
          <Link to="/orders" className="view-all">View All Orders</Link>
        </div>
      </div>
    </div>
  );
}
