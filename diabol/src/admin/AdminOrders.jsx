// frontend/src/components/admin/AdminOrders.jsx
import { useState, useEffect } from 'react';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
  fetch('http://localhost:3001/api/admin/orders') // ✅ Correct admin route
    .then(res => res.json())
    .then(data => setOrders(data))
    .catch(err => console.error('Error fetching orders:', err));
}, []);

  return (
    <div className="admin-orders">
      <h2>All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet 🚫🛒</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-card">
            <p><strong>Name:</strong> {order.firstName} {order.lastName}</p>
            <p><strong>Total:</strong> ₹{order.total}</p>
            <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
}
