import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/styles/Dashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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

    setUser(parsedUser);
    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      // Fetch all users
      const usersResponse = await fetch('http://localhost:8080/api/users');
      const users = usersResponse.ok ? await usersResponse.json() : [];

      // Fetch all products
      const productsResponse = await fetch('http://localhost:8080/api/products');
      const products = productsResponse.ok ? await productsResponse.json() : [];

      // Fetch all orders
      const ordersResponse = await fetch('http://localhost:8080/api/orders');
      const orders = ordersResponse.ok ? await ordersResponse.json() : [];

      // Calculate stats
      setStats({
        totalUsers: users.length,
        totalProducts: products.length,
        totalOrders: orders.length,
        pendingOrders: orders.filter(o => o.status === 'PENDING').length
      });

      // Get recent orders (last 5)
      setRecentOrders(orders.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
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
        fetchDashboardData(); // Refresh data
      }
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order status');
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

        <div className="dashboard-content">
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
              <div className="action-card" onClick={() => navigate('/admin')}>
                <i className="icon">📦</i>
                <h4>Manage Products</h4>
                <p>Add, edit, delete products</p>
              </div>
              <div className="action-card" onClick={() => navigate('/admin')}>
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
