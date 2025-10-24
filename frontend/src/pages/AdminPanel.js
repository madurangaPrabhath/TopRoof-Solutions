import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const PRODUCT_API = 'http://localhost:8080/api/admin/products';
  const USER_API = 'http://localhost:8080/api/admin/users';

  useEffect(() => {
    // Check if user is logged in and is admin
    const userData = localStorage.getItem('user');
    if (!userData) {
      setError("Unauthorized: Please log in.");
      navigate('/login');
      return;
    }

    const user = JSON.parse(userData);
    if (user.role !== 'ADMIN') {
      setError("Access denied: Admin only.");
      navigate('/dashboard');
      return;
    }

    // Fetch products
    fetch(PRODUCT_API)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch products.");
        return res.json();
      })
      .then(setProducts)
      .catch(err => setError(err.message));

    // Fetch users
    fetch(USER_API)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch users.");
        return res.json();
      })
      .then(setUsers)
      .catch(err => setError(err.message));
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${PRODUCT_API}/${editingId}` : PRODUCT_API;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const errorText = await res.text();
        alert("Failed to save product: " + errorText);
        return;
      }

      const result = await res.json();

      if (editingId) {
        setProducts(products.map(p => (p.id === editingId ? result : p)));
        alert('Product updated successfully!');
      } else {
        setProducts([...products, result]);
        alert('Product added successfully!');
      }

      setFormData({ name: '', price: '', imageUrl: '', category: '' });
      setEditingId(null);
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product. Please try again.');
    }
  };

  const handleEditProduct = (product) => {
    setFormData(product);
    setEditingId(product.id);
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const res = await fetch(`${PRODUCT_API}/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setProducts(products.filter(p => p.id !== id));
        alert('Product deleted successfully!');
      } else {
        alert("Failed to delete product.");
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  const handleDeleteUser = async (email) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const res = await fetch(`${USER_API}/${email}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setUsers(users.filter(u => u.email !== email));
        alert('User deleted successfully!');
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user. Please try again.');
    }
  };

  return (
    <div>
      <Header />
      <div className="admin-container">
        <h2>Admin Panel - Manage Products & Users</h2>
        {error && <p className="error-text">{error}</p>}

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
