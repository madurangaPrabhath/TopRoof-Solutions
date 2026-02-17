import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/styles/Dashboard.css";
import { API_ENDPOINTS } from "../config/api";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [orderFilter, setOrderFilter] = useState("ALL");
  const [reportData, setReportData] = useState(null);
  const [reportLoading, setReportLoading] = useState(false);

  const [products, setProducts] = useState([]);
  const [productFormData, setProductFormData] = useState({
    name: "",
    price: "",
    imageUrl: "",
    category: "",
    description: "",
    brand: "",
    stockQuantity: 0,
    featured: false,
    bestSeller: false,
  });
  const [editingProductId, setEditingProductId] = useState(null);

  const [users, setUsers] = useState([]);
  const [userFormData, setUserFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    role: "USER",
  });
  const [editingUserId, setEditingUserId] = useState(null);

  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingFormData, setShippingFormData] = useState({
    region: "",
    methodName: "",
    cost: "",
    description: "",
    estimatedDays: 3,
    active: true,
    freeShippingAbove: false,
    freeShippingThreshold: 0,
  });
  const [editingShippingId, setEditingShippingId] = useState(null);

  const PRODUCT_API = API_ENDPOINTS.ADMIN_PRODUCTS;
  const USER_API = API_ENDPOINTS.ADMIN_USERS;
  const AUTH_API = API_ENDPOINTS.REGISTER.replace("/register", "");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== "ADMIN") {
      alert("Access denied! Admin only.");
      navigate("/dashboard");
      return;
    }

    fetchDashboardData();
    fetchProducts();
    fetchUsers();
    fetchShippingOptions();
    fetchReportData();
  }, [navigate]);

  const fetchReportData = async () => {
    setReportLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/reports/dashboard",
      );
      if (response.ok) {
        const data = await response.json();
        setReportData(data);
      }
    } catch (error) {
      console.error("Error fetching report data:", error);
    } finally {
      setReportLoading(false);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const usersResponse = await fetch("http://localhost:8080/api/users");
      const users = usersResponse.ok ? await usersResponse.json() : [];

      const productsResponse = await fetch(
        "http://localhost:8080/api/products",
      );
      const products = productsResponse.ok ? await productsResponse.json() : [];

      const ordersResponse = await fetch("http://localhost:8080/api/orders");
      const orders = ordersResponse.ok ? await ordersResponse.json() : [];

      setStats({
        totalUsers: users.length,
        totalProducts: products.length,
        totalOrders: orders.length,
        pendingOrders: orders.filter((o) => o.status === "PENDING").length,
      });

      setAllOrders(orders);
      setRecentOrders(orders.slice(0, 5));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
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
      console.error("Error fetching products:", error);
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
      console.error("Error fetching users:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      if (response.ok) {
        const updatedOrder = await response.json();
        console.log("Order status updated:", updatedOrder);

        setAllOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order,
          ),
        );
        setRecentOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order,
          ),
        );

        await fetchDashboardData();
        alert("Order status updated successfully!");
      } else {
        const errorData = await response.text();
        console.error("Failed to update order status:", errorData);
        alert("Failed to update order status: " + errorData);
      }
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update order status: " + error.message);
    }
  };

  const updatePaymentStatus = async (orderId, newPaymentStatus) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/orders/${orderId}/payment-status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentStatus: newPaymentStatus }),
        },
      );

      if (response.ok) {
        const updatedOrder = await response.json();
        console.log("Payment status updated:", updatedOrder);

        setAllOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId
              ? { ...order, paymentStatus: newPaymentStatus }
              : order,
          ),
        );
        setRecentOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId
              ? { ...order, paymentStatus: newPaymentStatus }
              : order,
          ),
        );

        await fetchDashboardData();
        alert("Payment status updated successfully!");
      } else {
        const errorData = await response.text();
        console.error("Failed to update payment status:", errorData);
        alert("Failed to update payment status: " + errorData);
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
      alert("Failed to update payment status: " + error.message);
    }
  };

  const getFilteredOrders = () => {
    if (orderFilter === "ALL") return allOrders;
    return allOrders.filter((order) => order.status === orderFilter);
  };

  const handleProductChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductFormData({
      ...productFormData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const method = editingProductId ? "PUT" : "POST";
    const url = editingProductId
      ? `${PRODUCT_API}/${editingProductId}`
      : PRODUCT_API;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productFormData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        alert("Failed to save product: " + errorText);
        return;
      }

      await res.json();
      alert(
        editingProductId
          ? "Product updated successfully!"
          : "Product added successfully!",
      );

      setProductFormData({
        name: "",
        price: "",
        imageUrl: "",
        category: "",
        description: "",
        brand: "",
        stockQuantity: 0,
        featured: false,
        bestSeller: false,
      });
      setEditingProductId(null);
      fetchProducts();
      fetchDashboardData();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product. Please try again.");
    }
  };

  const handleEditProduct = (product) => {
    setProductFormData(product);
    setEditingProductId(product.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const res = await fetch(`${PRODUCT_API}/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Product deleted successfully!");
        fetchProducts();
        fetchDashboardData();
      } else {
        alert("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({
      ...userFormData,
      [name]: value,
    });
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();

    if (!editingUserId && userFormData.password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    try {
      const url = editingUserId
        ? `${USER_API}/${editingUserId}`
        : `${AUTH_API}/register`;

      const method = editingUserId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userFormData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        alert("Failed to save user: " + errorText);
        return;
      }

      alert(
        editingUserId
          ? "User updated successfully!"
          : "User created successfully!",
      );

      setUserFormData({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        role: "USER",
      });
      setEditingUserId(null);
      fetchUsers();
      fetchDashboardData();
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Failed to save user. Please try again.");
    }
  };

  const handleEditUser = (user) => {
    setUserFormData({
      email: user.email,
      password: "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phone: user.phone || "",
      address: user.address || "",
      role: user.role,
    });
    setEditingUserId(user.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteUser = async (email) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      const res = await fetch(`${USER_API}/${email}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("User deleted successfully!");
        fetchUsers();
        fetchDashboardData();
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  const fetchShippingOptions = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/shipping/admin/all");
      if (res.ok) {
        const data = await res.json();
        setShippingOptions(data);
      }
    } catch (error) {
      console.error("Error fetching shipping options:", error);
    }
  };

  const handleShippingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setShippingFormData({
      ...shippingFormData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleShippingSubmit = async (e) => {
    e.preventDefault();
    const method = editingShippingId ? "PUT" : "POST";
    const url = editingShippingId
      ? `http://localhost:8080/api/shipping/${editingShippingId}`
      : "http://localhost:8080/api/shipping";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shippingFormData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        alert("Failed to save shipping option: " + errorText);
        return;
      }

      alert(
        editingShippingId
          ? "Shipping option updated successfully!"
          : "Shipping option added successfully!",
      );

      setShippingFormData({
        region: "",
        methodName: "",
        cost: "",
        description: "",
        estimatedDays: 3,
        active: true,
        freeShippingAbove: false,
        freeShippingThreshold: 0,
      });
      setEditingShippingId(null);
      fetchShippingOptions();
    } catch (error) {
      console.error("Error saving shipping option:", error);
      alert("Failed to save shipping option. Please try again.");
    }
  };

  const handleEditShipping = (option) => {
    setShippingFormData({
      region: option.region,
      methodName: option.methodName,
      cost: option.cost,
      description: option.description || "",
      estimatedDays: option.estimatedDays,
      active: option.active,
      freeShippingAbove: option.freeShippingAbove,
      freeShippingThreshold: option.freeShippingThreshold,
    });
    setEditingShippingId(option.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteShipping = async (id) => {
    if (!window.confirm("Are you sure you want to delete this shipping option?")) {
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/shipping/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Shipping option deleted successfully!");
        fetchShippingOptions();
      } else {
        alert("Failed to delete shipping option.");
      }
    } catch (error) {
      console.error("Error deleting shipping option:", error);
      alert("Failed to delete shipping option. Please try again.");
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
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>

        <div className="tab-navigation">
          <button
            className={activeTab === "dashboard" ? "tab-btn active" : "tab-btn"}
            onClick={() => setActiveTab("dashboard")}
          >
            📊 Dashboard
          </button>
          <button
            className={activeTab === "products" ? "tab-btn active" : "tab-btn"}
            onClick={() => setActiveTab("products")}
          >
            📦 Manage Products
          </button>
          <button
            className={activeTab === "orders" ? "tab-btn active" : "tab-btn"}
            onClick={() => setActiveTab("orders")}
          >
            🛒 Manage Orders
          </button>
          <button
            className={activeTab === "users" ? "tab-btn active" : "tab-btn"}
            onClick={() => setActiveTab("users")}
          >
            👥 Manage Users
          </button>
          <button
            className={activeTab === "reports" ? "tab-btn active" : "tab-btn"}
            onClick={() => {
              setActiveTab("reports");
              fetchReportData();
            }}
          >
            📈 Reports & Analytics
          </button>
          <button
            className={activeTab === "shipping" ? "tab-btn active" : "tab-btn"}
            onClick={() => {
              setActiveTab("shipping");
              fetchShippingOptions();
            }}
          >
            🚚 Shipping
          </button>
        </div>

        <div className="dashboard-content">
          {activeTab === "dashboard" && (
            <>
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

              <div className="admin-actions">
                <h2>Quick Actions</h2>
                <div className="actions-grid">
                  <div
                    className="action-card"
                    onClick={() => setActiveTab("products")}
                  >
                    <i className="icon">📦</i>
                    <h4>Manage Products</h4>
                    <p>Add, edit, delete products</p>
                  </div>
                  <div
                    className="action-card"
                    onClick={() => setActiveTab("orders")}
                  >
                    <i className="icon">🛒</i>
                    <h4>Manage Orders</h4>
                    <p>View and update orders</p>
                  </div>
                  <div
                    className="action-card"
                    onClick={() => setActiveTab("users")}
                  >
                    <i className="icon">👥</i>
                    <h4>Manage Users</h4>
                    <p>View all users</p>
                  </div>
                  <div
                    className="action-card"
                    onClick={() => {
                      setActiveTab("reports");
                      fetchReportData();
                    }}
                  >
                    <i className="icon">📊</i>
                    <h4>View Reports</h4>
                    <p>Sales and analytics</p>
                  </div>
                </div>
              </div>

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
                        {recentOrders.map((order) => (
                          <tr key={order.id}>
                            <td>#{order.id}</td>
                            <td>{order.user?.email || "N/A"}</td>
                            <td>
                              {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                            <td>Rs. {order.totalAmount.toFixed(2)}</td>
                            <td>
                              <span
                                className={`status-badge status-${order.status.toLowerCase()}`}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td>
                              <select
                                value={order.status}
                                onChange={(e) =>
                                  updateOrderStatus(order.id, e.target.value)
                                }
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

          {activeTab === "orders" && (
            <div className="manage-section orders-management">
              <h2>📋 All Orders</h2>

              <div className="orders-filter">
                <label>Filter by Status: </label>
                <select
                  value={orderFilter}
                  onChange={(e) => setOrderFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="ALL">All Orders</option>
                  <option value="PENDING">Pending</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
                <span className="orders-count">
                  Showing {getFilteredOrders().length} order(s)
                </span>
              </div>

              {getFilteredOrders().length === 0 ? (
                <div className="empty-orders">
                  <p>No orders found</p>
                </div>
              ) : (
                <div className="orders-table full-orders">
                  <table>
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Payment Method</th>
                        <th>Payment Status</th>
                        <th>Order Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getFilteredOrders().map((order) => (
                        <tr
                          key={order.id}
                          className={`order-row status-${order.status?.toLowerCase()}`}
                        >
                          <td>
                            <strong>#{order.id}</strong>
                          </td>
                          <td>
                            <div className="customer-info">
                              <span>
                                {order.user?.firstName} {order.user?.lastName}
                              </span>
                              <small>{order.user?.email || "N/A"}</small>
                            </div>
                          </td>
                          <td>
                            {new Date(order.createdAt).toLocaleDateString()}
                            <br />
                            <small>
                              {new Date(order.createdAt).toLocaleTimeString()}
                            </small>
                          </td>
                          <td>
                            <span className="items-count">
                              {order.orderItems?.length || 0} item(s)
                            </span>
                            <div className="items-preview">
                              {order.orderItems
                                ?.slice(0, 2)
                                .map((item, idx) => (
                                  <small key={idx}>
                                    {item.product?.name || "Product"} x
                                    {item.quantity}
                                  </small>
                                ))}
                              {order.orderItems?.length > 2 && (
                                <small>
                                  +{order.orderItems.length - 2} more
                                </small>
                              )}
                            </div>
                          </td>
                          <td>
                            <strong>
                              Rs. {order.totalAmount?.toFixed(2) || "0.00"}
                            </strong>
                          </td>
                          <td>
                            <span
                              className={`payment-method ${order.paymentMethod?.toLowerCase().replace(/\s+/g, "-")}`}
                            >
                              {order.paymentMethod || "N/A"}
                            </span>
                          </td>
                          <td>
                            <select
                              value={order.paymentStatus || "PENDING"}
                              onChange={(e) =>
                                updatePaymentStatus(order.id, e.target.value)
                              }
                              className={`payment-status-select status-${order.paymentStatus?.toLowerCase()}`}
                            >
                              <option value="PENDING">Pending</option>
                              <option value="PAID">Paid</option>
                              <option value="FAILED">Failed</option>
                            </select>
                          </td>
                          <td>
                            <select
                              value={order.status}
                              onChange={(e) =>
                                updateOrderStatus(order.id, e.target.value)
                              }
                              className={`status-select status-${order.status?.toLowerCase()}`}
                            >
                              <option value="PENDING">Pending</option>
                              <option value="CONFIRMED">Confirmed</option>
                              <option value="SHIPPED">Shipped</option>
                              <option value="DELIVERED">Delivered</option>
                              <option value="CANCELLED">Cancelled</option>
                            </select>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="btn-view"
                                onClick={() => {
                                  const details = `
Order #${order.id}
Customer: ${order.user?.firstName || ""} ${order.user?.lastName || ""} (${order.user?.email || "N/A"})
Phone: ${order.user?.phone || "N/A"}
Address: ${order.shippingAddress || order.user?.address || "N/A"}
Date: ${new Date(order.createdAt).toLocaleString()}
Payment: ${order.paymentMethod || "N/A"} - ${order.paymentStatus || "N/A"}
Shipping: ${order.shippingMethod || "N/A"} (${order.shippingRegion || "N/A"})
Shipping Cost: Rs. ${order.shippingCost?.toFixed(2) || "0.00"}
Est. Delivery: ${order.estimatedDeliveryDays ? order.estimatedDeliveryDays + " days" : "N/A"}
Status: ${order.status}
Total: Rs. ${order.totalAmount?.toFixed(2) || "0.00"}

Items:
${order.orderItems?.map((item) => `- ${item.product?.name || "Product"} x${item.quantity} @ Rs. ${item.price?.toFixed(2)}`).join("\n") || "No items"}
                                  `;
                                  alert(details);
                                }}
                                title="View Details"
                              >
                                👁️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === "products" && (
            <div className="manage-section">
              <h2>{editingProductId ? "Edit Product" : "Add New Product"}</h2>
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
                    {editingProductId ? "✓ Update Product" : "+ Add Product"}
                  </button>
                  {editingProductId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProductId(null);
                        setProductFormData({
                          name: "",
                          price: "",
                          imageUrl: "",
                          category: "",
                          description: "",
                          brand: "",
                          stockQuantity: 0,
                          featured: false,
                          bestSeller: false,
                        });
                      }}
                      className="cancel-btn"
                    >
                      ✗ Cancel
                    </button>
                  )}
                </div>
              </form>

              <h2 style={{ marginTop: "40px" }}>
                All Products ({products.length})
              </h2>
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
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>Rs. {product.price}</td>
                        <td>
                          <span className="category-badge">
                            {product.category}
                          </span>
                        </td>
                        <td>{product.brand || "N/A"}</td>
                        <td>{product.stockQuantity}</td>
                        <td>{product.featured ? "✓" : "✗"}</td>
                        <td>{product.bestSeller ? "✓" : "✗"}</td>
                        <td>
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="edit-btn"
                          >
                            ✎ Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="delete-btn"
                          >
                            🗑 Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="manage-section">
              <h2>{editingUserId ? "Edit User" : "Add New User"}</h2>
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
                      disabled={editingUserId}
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
                      placeholder={
                        editingUserId
                          ? "Leave blank to keep current"
                          : "Minimum 6 characters"
                      }
                      minLength="6"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name:</label>
                    <input
                      type="text"
                      name="firstName"
                      value={userFormData.firstName}
                      onChange={handleUserChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name:</label>
                    <input
                      type="text"
                      name="lastName"
                      value={userFormData.lastName}
                      onChange={handleUserChange}
                    />
                  </div>
                </div>
                <div className="form-row">
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
                    {editingUserId ? "✓ Update User" : "+ Add User"}
                  </button>
                  {editingUserId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingUserId(null);
                        setUserFormData({
                          email: "",
                          password: "",
                          firstName: "",
                          lastName: "",
                          phone: "",
                          address: "",
                          role: "USER",
                        });
                      }}
                      className="cancel-btn"
                    >
                      ✗ Cancel
                    </button>
                  )}
                </div>
              </form>

              <h2 style={{ marginTop: "40px" }}>All Users ({users.length})</h2>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Email</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                        <td>
                          {user.firstName} {user.lastName}
                        </td>
                        <td>{user.phone || "N/A"}</td>
                        <td>{user.address || "N/A"}</td>
                        <td>
                          <span
                            className={`role-badge role-${user.role?.toLowerCase()}`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => handleEditUser(user)}
                            className="edit-btn"
                          >
                            ✎ Edit
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.email)}
                            className="delete-btn"
                            disabled={user.role === "ADMIN"}
                          >
                            {user.role === "ADMIN"
                              ? "🔒 Protected"
                              : "🗑 Delete"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="manage-section reports-section">
              <h2>📈 Sales & Analytics Report</h2>

              {reportLoading ? (
                <div className="loading-spinner">Loading report data...</div>
              ) : reportData ? (
                <>
                  <div className="report-section">
                    <h3>💰 Revenue Overview</h3>
                    <div className="stats-grid revenue-stats">
                      <div className="stat-card revenue-card">
                        <div className="stat-icon">💵</div>
                        <div className="stat-info">
                          <h3>
                            Rs.{" "}
                            {reportData.totalRevenue?.toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              },
                            )}
                          </h3>
                          <p>Total Revenue</p>
                        </div>
                      </div>
                      <div className="stat-card revenue-card monthly">
                        <div className="stat-icon">📅</div>
                        <div className="stat-info">
                          <h3>
                            Rs.{" "}
                            {reportData.monthlyRevenue?.toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              },
                            )}
                          </h3>
                          <p>This Month</p>
                        </div>
                      </div>
                      <div className="stat-card revenue-card weekly">
                        <div className="stat-icon">📆</div>
                        <div className="stat-info">
                          <h3>
                            Rs.{" "}
                            {reportData.weeklyRevenue?.toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              },
                            )}
                          </h3>
                          <p>This Week</p>
                        </div>
                      </div>
                      <div className="stat-card revenue-card today">
                        <div className="stat-icon">🕐</div>
                        <div className="stat-info">
                          <h3>
                            Rs.{" "}
                            {reportData.todayRevenue?.toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              },
                            )}
                          </h3>
                          <p>Today</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="report-section">
                    <h3>📦 Order Statistics</h3>
                    <div className="stats-grid order-stats">
                      <div className="stat-card">
                        <div className="stat-icon">📋</div>
                        <div className="stat-info">
                          <h3>{reportData.totalOrders}</h3>
                          <p>Total Orders</p>
                        </div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-icon">📅</div>
                        <div className="stat-info">
                          <h3>{reportData.monthlyOrders}</h3>
                          <p>This Month</p>
                        </div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-icon">📆</div>
                        <div className="stat-info">
                          <h3>{reportData.weeklyOrders}</h3>
                          <p>This Week</p>
                        </div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-icon">🕐</div>
                        <div className="stat-info">
                          <h3>{reportData.todayOrders}</h3>
                          <p>Today</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="report-section">
                    <h3>📊 Order Status Breakdown</h3>
                    <div className="status-breakdown">
                      <div className="status-item pending">
                        <span className="status-label">⏳ Pending</span>
                        <span className="status-count">
                          {reportData.pendingOrders}
                        </span>
                        <div
                          className="status-bar"
                          style={{
                            width: `${reportData.totalOrders > 0 ? (reportData.pendingOrders / reportData.totalOrders) * 100 : 0}%`,
                          }}
                        ></div>
                      </div>
                      <div className="status-item confirmed">
                        <span className="status-label">✅ Confirmed</span>
                        <span className="status-count">
                          {reportData.confirmedOrders}
                        </span>
                        <div
                          className="status-bar"
                          style={{
                            width: `${reportData.totalOrders > 0 ? (reportData.confirmedOrders / reportData.totalOrders) * 100 : 0}%`,
                          }}
                        ></div>
                      </div>
                      <div className="status-item shipped">
                        <span className="status-label">🚚 Shipped</span>
                        <span className="status-count">
                          {reportData.shippedOrders}
                        </span>
                        <div
                          className="status-bar"
                          style={{
                            width: `${reportData.totalOrders > 0 ? (reportData.shippedOrders / reportData.totalOrders) * 100 : 0}%`,
                          }}
                        ></div>
                      </div>
                      <div className="status-item delivered">
                        <span className="status-label">📦 Delivered</span>
                        <span className="status-count">
                          {reportData.deliveredOrders}
                        </span>
                        <div
                          className="status-bar"
                          style={{
                            width: `${reportData.totalOrders > 0 ? (reportData.deliveredOrders / reportData.totalOrders) * 100 : 0}%`,
                          }}
                        ></div>
                      </div>
                      <div className="status-item cancelled">
                        <span className="status-label">❌ Cancelled</span>
                        <span className="status-count">
                          {reportData.cancelledOrders}
                        </span>
                        <div
                          className="status-bar"
                          style={{
                            width: `${reportData.totalOrders > 0 ? (reportData.cancelledOrders / reportData.totalOrders) * 100 : 0}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="report-section">
                    <h3>📈 Key Metrics</h3>
                    <div className="stats-grid metrics-grid">
                      <div className="stat-card metric-card">
                        <div className="stat-icon">💳</div>
                        <div className="stat-info">
                          <h3>
                            Rs.{" "}
                            {reportData.averageOrderValue?.toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              },
                            )}
                          </h3>
                          <p>Average Order Value</p>
                        </div>
                      </div>
                      <div className="stat-card metric-card">
                        <div className="stat-icon">✔️</div>
                        <div className="stat-info">
                          <h3>{reportData.orderCompletionRate?.toFixed(1)}%</h3>
                          <p>Order Completion Rate</p>
                        </div>
                      </div>
                      <div className="stat-card metric-card">
                        <div className="stat-icon">👥</div>
                        <div className="stat-info">
                          <h3>{reportData.newUsersThisMonth}</h3>
                          <p>New Users This Month</p>
                        </div>
                      </div>
                      <div className="stat-card metric-card">
                        <div className="stat-icon">📦</div>
                        <div className="stat-info">
                          <h3>{reportData.totalProducts}</h3>
                          <p>Total Products</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="report-section">
                    <h3>📦 Product Inventory Status</h3>
                    <div className="stats-grid inventory-stats">
                      <div className="stat-card inventory-card">
                        <div className="stat-icon">📦</div>
                        <div className="stat-info">
                          <h3>{reportData.totalProducts}</h3>
                          <p>Total Products</p>
                        </div>
                      </div>
                      <div className="stat-card inventory-card warning">
                        <div className="stat-icon">⚠️</div>
                        <div className="stat-info">
                          <h3>{reportData.lowStockProducts}</h3>
                          <p>Low Stock (≤10)</p>
                        </div>
                      </div>
                      <div className="stat-card inventory-card danger">
                        <div className="stat-icon">🚫</div>
                        <div className="stat-info">
                          <h3>{reportData.outOfStockProducts}</h3>
                          <p>Out of Stock</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="report-section">
                    <h3>📉 Revenue Trend (Last 6 Months)</h3>
                    <div className="chart-container">
                      <div className="bar-chart">
                        {reportData.revenueByMonth?.map((month, index) => (
                          <div key={index} className="bar-item">
                            <div
                              className="bar"
                              style={{
                                height: `${Math.max(5, (month.revenue / Math.max(...reportData.revenueByMonth.map((m) => m.revenue || 1))) * 100)}%`,
                              }}
                            >
                              <span className="bar-value">
                                Rs. {(month.revenue / 1000).toFixed(1)}K
                              </span>
                            </div>
                            <span className="bar-label">{month.month}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="report-section">
                    <h3>📊 Orders Trend (Last 6 Months)</h3>
                    <div className="chart-container">
                      <div className="bar-chart orders-chart">
                        {reportData.ordersByMonth?.map((month, index) => (
                          <div key={index} className="bar-item">
                            <div
                              className="bar orders-bar"
                              style={{
                                height: `${Math.max(5, (month.orders / Math.max(...reportData.ordersByMonth.map((m) => m.orders || 1))) * 100)}%`,
                              }}
                            >
                              <span className="bar-value">{month.orders}</span>
                            </div>
                            <span className="bar-label">{month.month}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="report-section">
                    <h3>🏆 Top Selling Products</h3>
                    <div className="table-container">
                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Quantity Sold</th>
                            <th>Revenue</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reportData.topSellingProducts?.map(
                            (product, index) => (
                              <tr key={product.id}>
                                <td>{index + 1}</td>
                                <td>{product.name}</td>
                                <td>{product.quantity}</td>
                                <td>
                                  Rs.{" "}
                                  {product.revenue?.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                                </td>
                              </tr>
                            ),
                          )}
                          {(!reportData.topSellingProducts ||
                            reportData.topSellingProducts.length === 0) && (
                            <tr>
                              <td colSpan="4" style={{ textAlign: "center" }}>
                                No sales data available
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="report-section">
                    <h3>📁 Sales by Category</h3>
                    <div className="category-sales">
                      {reportData.salesByCategory?.map((cat, index) => (
                        <div key={index} className="category-item">
                          <div className="category-header">
                            <span className="category-name">
                              {cat.category}
                            </span>
                            <span className="category-revenue">
                              Rs.{" "}
                              {cat.revenue?.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          </div>
                          <div className="category-bar-container">
                            <div
                              className="category-bar"
                              style={{
                                width: `${(cat.revenue / Math.max(...reportData.salesByCategory.map((c) => c.revenue || 1))) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                      {(!reportData.salesByCategory ||
                        reportData.salesByCategory.length === 0) && (
                        <p className="no-data">
                          No category sales data available
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="report-section">
                    <h3>💳 Payment Method Statistics</h3>
                    <div className="payment-stats">
                      {reportData.paymentMethodStats?.map((method, index) => (
                        <div key={index} className="payment-method-card">
                          <div className="payment-method-icon">
                            {method.method === "Credit Card"
                              ? "💳"
                              : method.method === "Cash on Delivery"
                                ? "💵"
                                : method.method === "Bank Transfer"
                                  ? "🏦"
                                  : "💰"}
                          </div>
                          <div className="payment-method-info">
                            <h4>{method.method}</h4>
                            <p>{method.count} orders</p>
                            <p className="payment-revenue">
                              Rs.{" "}
                              {method.revenue?.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </p>
                          </div>
                        </div>
                      ))}
                      {(!reportData.paymentMethodStats ||
                        reportData.paymentMethodStats.length === 0) && (
                        <p className="no-data">No payment data available</p>
                      )}
                    </div>
                  </div>

                  <div className="report-section">
                    <h3>🕐 Recent Orders</h3>
                    <div className="table-container">
                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Payment</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reportData.recentOrders?.map((order) => (
                            <tr key={order.id}>
                              <td>#{order.id}</td>
                              <td>{order.customerName}</td>
                              <td>{order.itemCount}</td>
                              <td>
                                Rs.{" "}
                                {order.total?.toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                              </td>
                              <td>
                                <span
                                  className={`status-badge status-${order.status?.toLowerCase()}`}
                                >
                                  {order.status}
                                </span>
                              </td>
                              <td>
                                <span
                                  className={`payment-status-badge payment-${order.paymentStatus?.toLowerCase()}`}
                                >
                                  {order.paymentStatus}
                                </span>
                              </td>
                              <td>
                                {order.date
                                  ? new Date(order.date).toLocaleDateString()
                                  : "N/A"}
                              </td>
                            </tr>
                          ))}
                          {(!reportData.recentOrders ||
                            reportData.recentOrders.length === 0) && (
                            <tr>
                              <td colSpan="7" style={{ textAlign: "center" }}>
                                No recent orders
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="report-actions">
                    <button onClick={fetchReportData} className="refresh-btn">
                      🔄 Refresh Report Data
                    </button>
                  </div>
                </>
              ) : (
                <div className="no-data-message">
                  <p>Unable to load report data. Please try again.</p>
                  <button onClick={fetchReportData} className="refresh-btn">
                    🔄 Try Again
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="manage-section">
              <h2>{editingShippingId ? "Edit Shipping Option" : "Add Shipping Option"}</h2>
              <form onSubmit={handleShippingSubmit} className="product-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Region *</label>
                    <input
                      type="text"
                      name="region"
                      value={shippingFormData.region}
                      onChange={handleShippingChange}
                      placeholder="e.g., Colombo, Kandy, Island-wide"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Shipping Method Name *</label>
                    <input
                      type="text"
                      name="methodName"
                      value={shippingFormData.methodName}
                      onChange={handleShippingChange}
                      placeholder="e.g., Standard Delivery, Express Delivery"
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Cost (Rs.) *</label>
                    <input
                      type="number"
                      name="cost"
                      value={shippingFormData.cost}
                      onChange={handleShippingChange}
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Estimated Delivery Days *</label>
                    <input
                      type="number"
                      name="estimatedDays"
                      value={shippingFormData.estimatedDays}
                      onChange={handleShippingChange}
                      min="0"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={shippingFormData.description}
                    onChange={handleShippingChange}
                    rows="2"
                    placeholder="Describe this shipping option"
                  ></textarea>
                </div>
                <div className="form-row checkbox-row">
                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        name="active"
                        checked={shippingFormData.active}
                        onChange={handleShippingChange}
                      />
                      Active (visible to customers)
                    </label>
                  </div>
                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        name="freeShippingAbove"
                        checked={shippingFormData.freeShippingAbove}
                        onChange={handleShippingChange}
                      />
                      Enable Free Shipping Above Threshold
                    </label>
                  </div>
                </div>
                {shippingFormData.freeShippingAbove && (
                  <div className="form-row">
                    <div className="form-group">
                      <label>Free Shipping Threshold (Rs.)</label>
                      <input
                        type="number"
                        name="freeShippingThreshold"
                        value={shippingFormData.freeShippingThreshold}
                        onChange={handleShippingChange}
                        step="0.01"
                        min="0"
                        placeholder="Min order amount for free shipping"
                      />
                    </div>
                  </div>
                )}
                <div className="form-actions">
                  <button type="submit" className="submit-btn">
                    {editingShippingId ? "✓ Update Shipping Option" : "+ Add Shipping Option"}
                  </button>
                  {editingShippingId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingShippingId(null);
                        setShippingFormData({
                          region: "",
                          methodName: "",
                          cost: "",
                          description: "",
                          estimatedDays: 3,
                          active: true,
                          freeShippingAbove: false,
                          freeShippingThreshold: 0,
                        });
                      }}
                      className="cancel-btn"
                    >
                      ✗ Cancel
                    </button>
                  )}
                </div>
              </form>

              <h2 style={{ marginTop: "40px" }}>
                All Shipping Options ({shippingOptions.length})
              </h2>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Region</th>
                      <th>Method</th>
                      <th>Cost (Rs.)</th>
                      <th>Est. Days</th>
                      <th>Free Above</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shippingOptions.map((option) => (
                      <tr key={option.id}>
                        <td>{option.id}</td>
                        <td>{option.region}</td>
                        <td>{option.methodName}</td>
                        <td>Rs. {option.cost?.toFixed(2)}</td>
                        <td>
                          {option.estimatedDays === 0
                            ? "Same day"
                            : `${option.estimatedDays} day${option.estimatedDays > 1 ? "s" : ""}`}
                        </td>
                        <td>
                          {option.freeShippingAbove
                            ? `Rs. ${option.freeShippingThreshold?.toFixed(0)}`
                            : "N/A"}
                        </td>
                        <td>
                          <span
                            className={`status-badge ${
                              option.active ? "status-confirmed" : "status-cancelled"
                            }`}
                          >
                            {option.active ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => handleEditShipping(option)}
                            className="edit-btn"
                          >
                            ✎ Edit
                          </button>
                          <button
                            onClick={() => handleDeleteShipping(option.id)}
                            className="delete-btn"
                          >
                            🗑 Delete
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
