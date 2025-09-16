import { useState } from 'react';


export default function AdminAddProduct() {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    originalPrice: '',
    image: '',
    badge: '',
    rating: '',
    reviews: '',
    description: '',
    stock: '',
    dosage: '',
    ingredients: '',
    tags: ''
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formattedProduct = {
      ...product,
      price: parseFloat(product.price),
      originalPrice: parseFloat(product.originalPrice),
      rating: parseFloat(product.rating),
      reviews: parseInt(product.reviews),
      stock: parseInt(product.stock),
      ingredients: product.ingredients.split(',').map(item => item.trim()),
      tags: product.tags.split(',').map(item => item.trim())
    };

    try {
      const res = await fetch('http://localhost:3001/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedProduct)
      });

      const data = await res.json();
      if (res.ok) {
        alert('✅ Product added!');
        setProduct({
          name: '',
          category: '',
          price: '',
          originalPrice: '',
          image: '',
          badge: '',
          rating: '',
          reviews: '',
          description: '',
          stock: '',
          dosage: '',
          ingredients: '',
          tags: ''
        });
      } else {
        alert('❌ Failed to add product: ' + data.message);
      }
    } catch (error) {
      console.error(error);
      alert('⚠️ Server error while adding product');
    }
  };

  return (
    <form className="add-product-form" onSubmit={handleSubmit}>
      <h2>Add New Product</h2>

      <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required />
      <input type="text" name="category" placeholder="Category" value={product.category} onChange={handleChange} />
      <input type="text" name="price" placeholder="Price" value={product.price} onChange={handleChange} />
      <input type="text" name="originalPrice" placeholder="Original Price" value={product.originalPrice} onChange={handleChange} />
      <input type="text" name="badge" placeholder="Badge (e.g. -15%)" value={product.badge} onChange={handleChange} />
      <input type="text" name="rating" placeholder="Rating (e.g. 4.5)" value={product.rating} onChange={handleChange} />
      <input type="text" name="reviews" placeholder="Reviews count" value={product.reviews} onChange={handleChange} />
      <input type="text" name="image" placeholder="Image URL" value={product.image} onChange={handleChange} />
      <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange}></textarea>
      <input type="text" name="stock" placeholder="Stock" value={product.stock} onChange={handleChange} />
      <input type="text" name="dosage" placeholder="Dosage info" value={product.dosage} onChange={handleChange} />
      <input type="text" name="ingredients" placeholder="Ingredients (comma-separated)" value={product.ingredients} onChange={handleChange} />
      <input type="text" name="tags" placeholder="Tags (comma-separated)" value={product.tags} onChange={handleChange} />

      <button type="submit">Add Product</button>
    </form>
  );
}
