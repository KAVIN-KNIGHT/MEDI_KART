// frontend/src/components/admin/AdminEditProduct.jsx
import { useState, useEffect } from 'react';

export default function AdminEditProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/admin/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const res = await fetch(`http://localhost:3001/api/admin/products/${id}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          setProducts(prev => prev.filter(p => p._id !== id));
          alert('Product deleted');
        } else {
          alert('Failed to delete');
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="admin-edit-product">
      <h2>Edit / Delete Products</h2>
      <ul>
        {products.map((p) => (
          <li key={p._id}>
            <strong>{p.name}</strong> - ₹{p.price}
            <button onClick={() => handleDelete(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
