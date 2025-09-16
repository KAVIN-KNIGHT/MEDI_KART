import React, { useEffect, useState } from 'react';

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem('medikartUser'));

  useEffect(() => {
    if (user && user._id) {
      fetch(`http://localhost:3001/api/orders/user/${user._id}`)
        .then(res => res.json())
        .then(data => setOrders(data));
    }
  }, [user]);

  const handleCancel = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    const res = await fetch(`http://localhost:3001/api/orders/${orderId}/cancel`, {
      method: 'PATCH',
    });
    const data = await res.json();
    if (res.ok) {
      alert('Order cancelled!');
      setOrders(orders => orders.map(o => o._id === orderId ? { ...o, status: 'Cancelled' } : o));
    } else {
      alert(data.message || 'Failed to cancel order');
    }
  };

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map(order => {
          const orderTime = new Date(order.orderDate);
          const now = new Date();
          const diffHours = (now - orderTime) / (1000 * 60 * 60);
          const canCancel = order.status !== 'Cancelled' && diffHours <= 12;
          return (
            <div key={order._id} className="order-card">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Date:</strong> {orderTime.toLocaleString()}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total:</strong> ₹{order.total}</p>
              {canCancel && (
                <button onClick={() => handleCancel(order._id)}>
                  Cancel Order
                </button>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}