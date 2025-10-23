import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/styles/Dashboard.css';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    // Fetch user orders
    fetchOrders(parsedUser.id);
  }, [navigate]);

  const fetchOrders = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/orders/user/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Welcome, {user?.firstName || user?.email}!</h1>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-sidebar">
            <div className="user-info-card">
              <h3>Profile Information</h3>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
              <p><strong>Phone:</strong> {user?.phone || 'Not provided'}</p>
              <p><strong>Address:</strong> {user?.address || 'Not provided'}</p>
              <button onClick={() => navigate('/cart')} className="dashboard-link-btn">
                View Cart
              </button>
              <button onClick={() => navigate('/products')} className="dashboard-link-btn">
                Browse Products
              </button>
            </div>
          </div>

          <div className="dashboard-main">
            <div className="orders-section">
              <h2>My Orders</h2>
              {orders.length === 0 ? (
                <div className="empty-orders">
                  <p>You haven't placed any orders yet.</p>
                  <button onClick={() => navigate('/products')} className="shop-now-btn">
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="orders-grid">
                  {orders.map(order => (
                    <div key={order.id} className="order-card">
                      <div className="order-header">
                        <h3>Order #{order.id}</h3>
                        <span className={`status-badge status-${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="order-details">
                        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p><strong>Total:</strong> Rs. {order.totalAmount.toFixed(2)}</p>
                        <p><strong>Items:</strong> {order.orderItems?.length || 0}</p>
                        <p><strong>Payment:</strong> {order.paymentStatus}</p>
                        <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
                      </div>
                      <div className="order-items">
                        <h4>Items:</h4>
                        {order.orderItems?.map(item => (
                          <div key={item.id} className="order-item">
                            <span>{item.product?.name || 'Product'}</span>
                            <span>x{item.quantity}</span>
                            <span>Rs. {item.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="actions-grid">
                <div className="action-card" onClick={() => navigate('/products')}>
                  <i className="icon">🛍️</i>
                  <h4>Shop Now</h4>
                  <p>Browse our products</p>
                </div>
                <div className="action-card" onClick={() => navigate('/cart')}>
                  <i className="icon">🛒</i>
                  <h4>My Cart</h4>
                  <p>View your cart</p>
                </div>
                <div className="action-card" onClick={() => navigate('/roofing-products')}>
                  <i className="icon">🏠</i>
                  <h4>Roofing</h4>
                  <p>Roofing materials</p>
                </div>
                <div className="action-card" onClick={() => navigate('/accessories-products')}>
                  <i className="icon">🔧</i>
                  <h4>Accessories</h4>
                  <p>Roofing accessories</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
