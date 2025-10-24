import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/styles/Dashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'products', 'users'
  
  // Product management state
  const [products, setProducts] = useState([]);
  const [productFormData, setProductFormData] = useState({
    name: '', price: '', imageUrl: '', category: '', description: '', brand: '', stockQuantity: 0, featured: false, bestSeller: false
  });
  const [editingProductId, setEditingProductId] = useState(null);
  
  // User management state
  const [users, setUsers] = useState([]);
  const [userFormData, setUserFormData] = useState({
    email: '', password: '', fullName: '', phone: '', address: '', role: 'USER'
  });
  const [editingUserId, setEditingUserId] = useState(null);

  const PRODUCT_API = 'http://localhost:8080/api/admin/products';
  const USER_API = 'http://localhost:8080/api/admin/users';
  const AUTH_API = 'http://localhost:8080/api/auth';

  useEffect(() => {
    // Check if user is logged in and is admin
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'ADMIN') {
      alert('Access denied! Admin only.');
      navigate('/dashboard');
      return;
    }

    fetchDashboardData();
    fetchProducts();
    fetchUsers();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      const usersResponse = await fetch('http://localhost:8080/api/users');
      const users = usersResponse.ok ? await usersResponse.json() : [];

      const productsResponse = await fetch('http://localhost:8080/api/products');
      const products = productsResponse.ok ? await productsResponse.json() : [];

      const ordersResponse = await fetch('http://localhost:8080/api/orders');
      const orders = ordersResponse.ok ? await ordersResponse.json() : [];

      setStats({
        totalUsers: users.length,
        totalProducts: products.length,
        totalOrders: orders.length,
        pendingOrders: orders.filter(o => o.status === 'PENDING').length
      });

      setRecentOrders(orders.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(PRODUCT_API);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch(USER_API);
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8080/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        alert('Order status updated!');
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order status');
    }
  };

  // Product Management Functions
  const handleProductChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductFormData({ 
      ...productFormData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const method = editingProductId ? 'PUT' : 'POST';
    const url = editingProductId ? `${PRODUCT_API}/${editingProductId}` : PRODUCT_API;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productFormData)
      });

      if (!res.ok) {
        const errorText = await res.text();
        alert("Failed to save product: " + errorText);
        return;
      }

      const result = await res.json();
      alert(editingProductId ? 'Product updated successfully!' : 'Product added successfully!');
      
      setProductFormData({
        name: '', price: '', imageUrl: '', category: '', description: '', brand: '', stockQuantity: 0, featured: false, bestSeller: false
      });
      setEditingProductId(null);
      fetchProducts();
      fetchDashboardData();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product. Please try again.');
    }
  };

  const handleEditProduct = (product) => {
    setProductFormData(product);
    setEditingProductId(product.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        alert('Product deleted successfully!');
        fetchProducts();
        fetchDashboardData();
      } else {
        alert("Failed to delete product.");
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  // User Management Functions
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({ 
      ...userFormData, 
      [name]: value 
    });
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    
    // Validate password length
    if (!editingUserId && userFormData.password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    try {
      // Use register endpoint for creating new users
      const url = editingUserId 
        ? `${USER_API}/${editingUserId}` 
        : `${AUTH_API}/register`;
      
      const method = editingUserId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userFormData)
      });

      if (!res.ok) {
        const errorText = await res.text();
        alert("Failed to save user: " + errorText);
        return;
      }

      alert(editingUserId ? 'User updated successfully!' : 'User created successfully!');
      
      setUserFormData({
        email: '', password: '', fullName: '', phone: '', address: '', role: 'USER'
      });
      setEditingUserId(null);
      fetchUsers();
      fetchDashboardData();
    } catch (error) {
      console.error('Error saving user:', error);
      alert('Failed to save user. Please try again.');
    }
  };

  const handleEditUser = (user) => {
    setUserFormData({
      email: user.email,
      password: '', // Don't populate password for security
      fullName: user.fullName || '',
      phone: user.phone || '',
      address: user.address || '',
      role: user.role
    });
    setEditingUserId(user.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        alert('User deleted successfully!');
        fetchUsers();
        fetchDashboardData();
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user. Please try again.');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="dashboard-container admin-dashboard">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <div className="header-actions">
            <span className="admin-badge">Administrator</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button 
            className={activeTab === 'dashboard' ? 'tab-btn active' : 'tab-btn'}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button 
            className={activeTab === 'products' ? 'tab-btn active' : 'tab-btn'}
            onClick={() => setActiveTab('products')}
          >
            📦 Manage Products
          </button>
          <button 
            className={activeTab === 'users' ? 'tab-btn active' : 'tab-btn'}
            onClick={() => setActiveTab('users')}
          >
            👥 Manage Users
          </button>
        </div>

        <div className="dashboard-content">
          {/* Dashboard View */}
          {activeTab === 'dashboard' && (
            <>
              {/* Statistics Cards */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">👥</div>
                  <div className="stat-info">
                    <h3>{stats.totalUsers}</h3>
                    <p>Total Users</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📦</div>
                  <div className="stat-info">
                    <h3>{stats.totalProducts}</h3>
                    <p>Total Products</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🛒</div>
                  <div className="stat-info">
                    <h3>{stats.totalOrders}</h3>
                    <p>Total Orders</p>
                  </div>
                </div>
                <div className="stat-card pending">
                  <div className="stat-icon">⏳</div>
                  <div className="stat-info">
                    <h3>{stats.pendingOrders}</h3>
                    <p>Pending Orders</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="admin-actions">
                <h2>Quick Actions</h2>
                <div className="actions-grid">
                  <div className="action-card" onClick={() => setActiveTab('products')}>
                    <i className="icon">📦</i>
                    <h4>Manage Products</h4>
                    <p>Add, edit, delete products</p>
                  </div>
                  <div className="action-card" onClick={() => setActiveTab('users')}>
                    <i className="icon">👥</i>
                    <h4>Manage Users</h4>
                    <p>View all users</p>
                  </div>
                  <div className="action-card">
                    <i className="icon">📊</i>
                    <h4>View Reports</h4>
                    <p>Sales and analytics</p>
                  </div>
                  <div className="action-card">
                    <i className="icon">⚙️</i>
                    <h4>Settings</h4>
                    <p>System configuration</p>
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="recent-orders">
                <h2>Recent Orders</h2>
                {recentOrders.length === 0 ? (
                  <p className="empty-state">No orders yet</p>
                ) : (
                  <div className="orders-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Customer</th>
                          <th>Date</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map(order => (
                          <tr key={order.id}>
                            <td>#{order.id}</td>
                            <td>{order.user?.email || 'N/A'}</td>
                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td>Rs. {order.totalAmount.toFixed(2)}</td>
                            <td>
                              <span className={`status-badge status-${order.status.toLowerCase()}`}>
                                {order.status}
                              </span>
                            </td>
                            <td>
                              <select 
                                value={order.status} 
                                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                className="status-select"
                              >
                                <option value="PENDING">Pending</option>
                                <option value="CONFIRMED">Confirmed</option>
                                <option value="SHIPPED">Shipped</option>
                                <option value="DELIVERED">Delivered</option>
                                <option value="CANCELLED">Cancelled</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Manage Products View */}
          {activeTab === 'products' && (
            <div className="manage-section">
              <h2>{editingProductId ? 'Edit Product' : 'Add New Product'}</h2>
              <form onSubmit={handleProductSubmit} className="product-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Product Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={productFormData.name}
                      onChange={handleProductChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Price (Rs.):</label>
                    <input
                      type="number"
                      name="price"
                      value={productFormData.price}
                      onChange={handleProductChange}
                      step="0.01"
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Image URL:</label>
                    <input
                      type="text"
                      name="imageUrl"
                      value={productFormData.imageUrl}
                      onChange={handleProductChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Category:</label>
                    <select
                      name="category"
                      value={productFormData.category}
                      onChange={handleProductChange}
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="ROOFING">Roofing</option>
                      <option value="ACCESSORIES">Accessories</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Brand:</label>
                    <input
                      type="text"
                      name="brand"
                      value={productFormData.brand}
                      onChange={handleProductChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Stock Quantity:</label>
                    <input
                      type="number"
                      name="stockQuantity"
                      value={productFormData.stockQuantity}
                      onChange={handleProductChange}
                      min="0"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Description:</label>
                  <textarea
                    name="description"
                    value={productFormData.description}
                    onChange={handleProductChange}
                    rows="3"
                  ></textarea>
                </div>
                <div className="form-row checkbox-row">
                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        name="featured"
                        checked={productFormData.featured}
                        onChange={handleProductChange}
                      />
                      Featured Product
                    </label>
                  </div>
                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        name="bestSeller"
                        checked={productFormData.bestSeller}
                        onChange={handleProductChange}
                      />
                      Best Seller
                    </label>
                  </div>
                </div>
                <div className="form-actions">
                  <button type="submit" className="submit-btn">
                    {editingProductId ? '✓ Update Product' : '+ Add Product'}
                  </button>
                  {editingProductId && (
                    <button 
                      type="button" 
                      onClick={() => {
                        setEditingProductId(null);
                        setProductFormData({
                          name: '', price: '', imageUrl: '', category: '', description: '', brand: '', stockQuantity: 0, featured: false, bestSeller: false
                        });
                      }}
                      className="cancel-btn"
                    >
                      ✗ Cancel
                    </button>
                  )}
                </div>
              </form>

              <h2 style={{marginTop: '40px'}}>All Products ({products.length})</h2>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Brand</th>
                      <th>Stock</th>
                      <th>Featured</th>
                      <th>Best Seller</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>Rs. {product.price}</td>
                        <td><span className="category-badge">{product.category}</span></td>
                        <td>{product.brand || 'N/A'}</td>
                        <td>{product.stockQuantity}</td>
                        <td>{product.featured ? '✓' : '✗'}</td>
                        <td>{product.bestSeller ? '✓' : '✗'}</td>
                        <td>
                          <button onClick={() => handleEditProduct(product)} className="edit-btn">✎ Edit</button>
                          <button onClick={() => handleDeleteProduct(product.id)} className="delete-btn">🗑 Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Manage Users View */}
          {activeTab === 'users' && (
            <div className="manage-section">
              <h2>{editingUserId ? 'Edit User' : 'Add New User'}</h2>
              <form onSubmit={handleUserSubmit} className="product-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={userFormData.email}
                      onChange={handleUserChange}
                      required
                      disabled={editingUserId} // Email cannot be changed when editing
                    />
                  </div>
                  <div className="form-group">
                    <label>Password:</label>
                    <input
                      type="password"
                      name="password"
                      value={userFormData.password}
                      onChange={handleUserChange}
                      required={!editingUserId}
                      placeholder={editingUserId ? "Leave blank to keep current" : "Minimum 6 characters"}
                      minLength="6"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name:</label>
                    <input
                      type="text"
                      name="fullName"
                      value={userFormData.fullName}
                      onChange={handleUserChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone:</label>
                    <input
                      type="tel"
                      name="phone"
                      value={userFormData.phone}
                      onChange={handleUserChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Address:</label>
                    <input
                      type="text"
                      name="address"
                      value={userFormData.address}
                      onChange={handleUserChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Role:</label>
                    <select
                      name="role"
                      value={userFormData.role}
                      onChange={handleUserChange}
                      required
                    >
                      <option value="USER">User</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </div>
                </div>
                <div className="form-actions">
                  <button type="submit" className="submit-btn">
                    {editingUserId ? '✓ Update User' : '+ Add User'}
                  </button>
                  {editingUserId && (
                    <button 
                      type="button" 
                      onClick={() => {
                        setEditingUserId(null);
                        setUserFormData({
                          email: '', password: '', fullName: '', phone: '', address: '', role: 'USER'
                        });
                      }}
                      className="cancel-btn"
                    >
                      ✗ Cancel
                    </button>
                  )}
                </div>
              </form>

              <h2 style={{marginTop: '40px'}}>All Users ({users.length})</h2>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Email</th>
                      <th>Full Name</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                        <td>{user.fullName || 'N/A'}</td>
                        <td>{user.phone || 'N/A'}</td>
                        <td>{user.address || 'N/A'}</td>
                        <td>
                          <span className={`role-badge role-${user.role?.toLowerCase()}`}>
                            {user.role}
                          </span>
                        </td>
                        <td>
                          <button onClick={() => handleEditUser(user)} className="edit-btn">✎ Edit</button>
                          <button 
                            onClick={() => handleDeleteUser(user.email)} 
                            className="delete-btn"
                            disabled={user.role === 'ADMIN'}
                          >
                            {user.role === 'ADMIN' ? '🔒 Protected' : '🗑 Delete'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
