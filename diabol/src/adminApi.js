const API = 'http://localhost:3001/api';

export const fetchUsers = () => fetch(`${API}/admin/users`).then(r => r.json());
export const fetchProducts = () => fetch(`${API}/admin/products`).then(r => r.json());
export const fetchOrders = () => fetch(`${API}/admin/orders`).then(r => r.json());
export const addProduct = data => fetch(`${API}/admin/products/add`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
