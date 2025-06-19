import React, { useEffect, useState } from 'react';
import '../assets/styles/AdminPanel.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NewsletterSection from '../components/NewsletterSection';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '', price: '', imageUrl: '', category: ''
  });
  const [editingId, setEditingId] = useState(null);

  const PRODUCT_API = 'http://localhost:8080/api/products';
  const USER_API = 'http://localhost:8080/api/users';

  useEffect(() => {
    fetch(PRODUCT_API).then(res => res.json()).then(setProducts);
    fetch(USER_API).then(res => res.json()).then(setUsers);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${PRODUCT_API}/${editingId}` : PRODUCT_API;

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const result = await res.json();

    if (editingId) {
      setProducts(products.map(p => (p.id === editingId ? result : p)));
    } else {
      setProducts([...products, result]);
    }

    setFormData({ name: '', price: '', imageUrl: '', category: '' });
    setEditingId(null);
  };

  const handleEditProduct = (product) => {
    setFormData(product);
    setEditingId(product.id);
  };

  const handleDeleteProduct = async (id) => {
    await fetch(`${PRODUCT_API}/${id}`, { method: 'DELETE' });
    setProducts(products.filter(p => p.id !== id));
  };

  const handleDeleteUser = async (email) => {
    await fetch(`${USER_API}/${email}`, { method: 'DELETE' });
    setUsers(users.filter(u => u.email !== email));
  };

  return (
    <div>
      <Header />
      <div className="admin-container">
        <h2>Admin Panel - Manage Products & Users</h2>

        <form onSubmit={handleSubmit} className="product-form">
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" required />
          <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
          <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" required />
          <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" required />
          <button type="submit">{editingId ? 'Update' : 'Add'} Product</button>
        </form>

        <h3>Product List</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th><th>Price</th><th>Image</th><th>Category</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>Rs. {p.price}</td>
                <td><img src={p.imageUrl} alt={p.name} className="admin-img" /></td>
                <td>{p.category}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEditProduct(p)}>Edit</button>{' '}
                  <button className="delete-btn" onClick={() => handleDeleteProduct(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>User List</h3>
        <table className="admin-table">
          <thead>
            <tr><th>Email</th><th>Role</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.email}>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDeleteUser(user.email)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <NewsletterSection />
      <section id="contact">
        <Footer />
      </section>
    </div>
  );
};

export default AdminPanel;
