import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { API_ENDPOINTS } from "../config/api";
import "../assets/styles/Dashboard.css";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("orders");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fullName: "",
    phone: "",
    address: "",
    password: "",
    currentPassword: "",
  });
  const [deletePassword, setDeletePassword] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    document.body.classList.add("user-dashboard-page");

    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    setFormData({
      firstName: parsedUser.firstName || "",
      lastName: parsedUser.lastName || "",
      fullName: parsedUser.fullName || "",
      phone: parsedUser.phone || "",
      address: parsedUser.address || "",
      password: "",
      currentPassword: "",
    });

    fetchOrders(parsedUser.id);

    return () => {
      document.body.classList.remove("user-dashboard-page");
    };
  }, [navigate]);

  const fetchOrders = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/orders/user/${userId}`,
      );
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    try {
      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
      };

      if (formData.password) {
        if (!formData.currentPassword) {
          setMessage({
            type: "error",
            text: "Please enter your current password to change password",
          });
          return;
        }
        updateData.password = formData.password;
        updateData.currentPassword = formData.currentPassword;
      }

      const response = await fetch(
        `${API_ENDPOINTS.USER_PROFILE}?email=${user.email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        },
      );

      if (response.ok) {
        const updatedUser = await response.json();

        const storedUser = { ...user, ...updatedUser };
        localStorage.setItem("user", JSON.stringify(storedUser));
        setUser(storedUser);

        setFormData((prev) => ({ ...prev, password: "", currentPassword: "" }));
        setEditMode(false);
        setMessage({ type: "success", text: "Profile updated successfully!" });
      } else {
        const error = await response.json();
        setMessage({
          type: "error",
          text: error.error || "Failed to update profile",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({
        type: "error",
        text: "Failed to update profile. Please try again.",
      });
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      setMessage({
        type: "error",
        text: "Please enter your password to delete account",
      });
      return;
    }

    try {
      const response = await fetch(
        `${API_ENDPOINTS.USER_DELETE_ACCOUNT}?email=${user.email}&password=${encodeURIComponent(deletePassword)}`,
        { method: "DELETE" },
      );

      if (response.ok) {
        localStorage.removeItem("user");
        localStorage.removeItem("userEmail");
        alert("Your account has been deleted successfully.");
        navigate("/");
      } else {
        const error = await response.json();
        setMessage({
          type: "error",
          text: error.error || "Failed to delete account",
        });
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      setMessage({
        type: "error",
        text: "Failed to delete account. Please try again.",
      });
    } finally {
      setShowDeleteConfirm(false);
      setDeletePassword("");
    }
  };
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="user-dashboard">
      <Header />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Welcome, {user?.firstName || user?.email}!</h1>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>

        <div className="dashboard-tabs">
          <button
            className={activeTab === "orders" ? "tab-btn active" : "tab-btn"}
            onClick={() => setActiveTab("orders")}
          >
            My Orders
          </button>
          <button
            className={activeTab === "profile" ? "tab-btn active" : "tab-btn"}
            onClick={() => setActiveTab("profile")}
          >
            Edit Profile
          </button>
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}

        <div className="dashboard-content user-dashboard-content">
          {activeTab === "orders" && (
            <>
              <div className="dashboard-sidebar">
                <div className="user-info-card">
                  <h3>Profile Information</h3>
                  <p>
                    <strong>Email:</strong> {user?.email}
                  </p>
                  <p>
                    <strong>Name:</strong> {user?.firstName} {user?.lastName}
                  </p>
                  <p>
                    <strong>Phone:</strong> {user?.phone || "Not provided"}
                  </p>
                  <p>
                    <strong>Address:</strong> {user?.address || "Not provided"}
                  </p>
                  <button
                    onClick={() => navigate("/cart")}
                    className="dashboard-link-btn"
                  >
                    View Cart
                  </button>
                  <button
                    onClick={() => navigate("/products")}
                    className="dashboard-link-btn"
                  >
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
                      <button
                        onClick={() => navigate("/products")}
                        className="shop-now-btn"
                      >
                        Start Shopping
                      </button>
                    </div>
                  ) : (
                    <div className="orders-grid">
                      {orders.map((order) => (
                        <div key={order.id} className="order-card">
                          <div className="order-header">
                            <h3>Order #{order.id}</h3>
                            <span
                              className={`status-badge status-${(order.status || "pending").toLowerCase()}`}
                            >
                              {order.status || "PENDING"}
                            </span>
                          </div>
                          <div className="order-details">
                            <p>
                              <strong>Date:</strong>{" "}
                              {order.createdAt
                                ? new Date(order.createdAt).toLocaleDateString()
                                : "N/A"}
                            </p>
                            <p>
                              <strong>Total:</strong> Rs.{" "}
                              {order.totalAmount?.toFixed(2) || "0.00"}
                            </p>
                            <p>
                              <strong>Items:</strong>{" "}
                              {order.orderItems?.length || 0}
                            </p>
                            <p>
                              <strong>Payment Method:</strong>{" "}
                              {order.paymentMethod || "Not specified"}
                            </p>
                            <p>
                              <strong>Payment Status:</strong>{" "}
                              <span
                                className={`payment-status-badge payment-${(order.paymentStatus || "pending").toLowerCase()}`}
                              >
                                {order.paymentStatus || "PENDING"}
                              </span>
                            </p>
                            <p>
                              <strong>Shipping Address:</strong>{" "}
                              {order.shippingAddress || "Not specified"}
                            </p>
                          </div>
                          <div className="order-items">
                            <h4>Items:</h4>
                            {order.orderItems?.map((item) => (
                              <div key={item.id} className="order-item">
                                <span>{item.product?.name || "Product"}</span>
                                <span>x{item.quantity}</span>
                                <span>
                                  Rs. {item.price?.toFixed(2) || "0.00"}
                                </span>
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
                    <div
                      className="action-card"
                      onClick={() => navigate("/products")}
                    >
                      <i className="icon">🛍️</i>
                      <h4>Shop Now</h4>
                      <p>Browse our products</p>
                    </div>
                    <div
                      className="action-card"
                      onClick={() => navigate("/cart")}
                    >
                      <i className="icon">🛒</i>
                      <h4>My Cart</h4>
                      <p>View your cart</p>
                    </div>
                    <div
                      className="action-card"
                      onClick={() => navigate("/roofing-products")}
                    >
                      <i className="icon">🏠</i>
                      <h4>Roofing</h4>
                      <p>Roofing materials</p>
                    </div>
                    <div
                      className="action-card"
                      onClick={() => navigate("/accessories-products")}
                    >
                      <i className="icon">🔧</i>
                      <h4>Accessories</h4>
                      <p>Roofing accessories</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "profile" && (
            <div className="profile-section">
              <h2>Edit Profile</h2>
              <form onSubmit={handleUpdateProfile} className="profile-form">
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={user?.email} disabled />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      disabled={!editMode}
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      disabled={!editMode}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    disabled={!editMode}
                  />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!editMode}
                  />
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    rows="3"
                  />
                </div>

                {editMode && (
                  <>
                    <div className="password-section">
                      <h3>Change Password (Optional)</h3>
                      <div className="form-group">
                        <label>Current Password</label>
                        <input
                          type="password"
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          placeholder="Enter current password to change"
                        />
                      </div>
                      <div className="form-group">
                        <label>New Password</label>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Enter new password (min 6 characters)"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="form-actions">
                  {!editMode ? (
                    <button
                      type="button"
                      onClick={() => setEditMode(true)}
                      className="edit-btn"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <>
                      <button type="submit" className="save-btn">
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditMode(false);
                          setFormData({
                            firstName: user?.firstName || "",
                            lastName: user?.lastName || "",
                            fullName: user?.fullName || "",
                            phone: user?.phone || "",
                            address: user?.address || "",
                            password: "",
                            currentPassword: "",
                          });
                          setMessage({ type: "", text: "" });
                        }}
                        className="cancel-btn"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </form>

              <div className="danger-zone">
                <h3>Danger Zone</h3>
                <p>
                  Once you delete your account, there is no going back. Please
                  be certain.
                </p>
                {!showDeleteConfirm ? (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="delete-account-btn"
                  >
                    Delete Account
                  </button>
                ) : (
                  <div className="delete-confirm">
                    <p>
                      <strong>Are you sure?</strong> This action cannot be
                      undone.
                    </p>
                    <input
                      type="password"
                      placeholder="Enter your password to confirm"
                      value={deletePassword}
                      onChange={(e) => setDeletePassword(e.target.value)}
                    />
                    <div className="delete-actions">
                      <button
                        onClick={handleDeleteAccount}
                        className="confirm-delete-btn"
                      >
                        Yes, Delete My Account
                      </button>
                      <button
                        onClick={() => {
                          setShowDeleteConfirm(false);
                          setDeletePassword("");
                        }}
                        className="cancel-delete-btn"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
