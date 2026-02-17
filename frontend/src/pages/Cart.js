import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import NewsletterSection from "../components/NewsletterSection";
import Footer from "../components/Footer";
import {
  FaShoppingCart,
  FaTrash,
  FaMoneyBillWave,
  FaUniversity,
  FaCreditCard,
  FaGlobe,
  FaTruck,
} from "react-icons/fa";
import "../assets/styles/Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    shippingAddress: "",
    paymentMethod: "Cash on Delivery",
  });

  const [shippingRegions, setShippingRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShippingOption, setSelectedShippingOption] = useState(null);
  const [shippingCost, setShippingCost] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    fetchCartItems(parsedUser.id);
    fetchShippingRegions();
  }, [navigate]);

  const fetchCartItems = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/cart/user/${userId}`,
      );
      if (response.ok) {
        const data = await response.json();
        setCartItems(data);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/cart/${cartItemId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: newQuantity }),
        },
      );

      if (response.ok) {
        const updatedItem = await response.json();
        setCartItems(
          cartItems.map((item) =>
            item.id === cartItemId ? updatedItem : item,
          ),
        );
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Failed to update quantity");
    }
  };

  const removeItem = async (cartItemId) => {
    if (!window.confirm("Remove this item from cart?")) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/cart/${cartItemId}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        setCartItems(cartItems.filter((item) => item.id !== cartItemId));
        alert("Item removed from cart");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item");
    }
  };

  const clearCart = async () => {
    if (!window.confirm("Clear all items from cart?")) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/cart/user/${user.id}/clear`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        setCartItems([]);
        alert("Cart cleared");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      alert("Failed to clear cart");
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

  const fetchShippingRegions = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/shipping/regions");
      if (response.ok) {
        const data = await response.json();
        setShippingRegions(data);
      }
    } catch (error) {
      console.error("Error fetching shipping regions:", error);
    }
  };

  const fetchShippingOptionsByRegion = async (region) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/shipping/region/${encodeURIComponent(region)}`,
      );
      if (response.ok) {
        const data = await response.json();
        setShippingOptions(data);
        setSelectedShippingOption(null);
        setShippingCost(0);
      }
    } catch (error) {
      console.error("Error fetching shipping options:", error);
    }
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    if (region) {
      fetchShippingOptionsByRegion(region);
    } else {
      setShippingOptions([]);
      setSelectedShippingOption(null);
      setShippingCost(0);
    }
  };

  const handleShippingOptionSelect = async (option) => {
    setSelectedShippingOption(option);
    try {
      const response = await fetch("http://localhost:8080/api/shipping/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shippingOptionId: option.id,
          orderSubtotal: calculateTotal(),
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setShippingCost(data.shippingCost);
      }
    } catch (error) {
      console.error("Error calculating shipping:", error);
      setShippingCost(option.cost);
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setShowCheckoutModal(true);
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();

    if (!checkoutForm.shippingAddress.trim()) {
      alert("Please enter your shipping address");
      return;
    }

    if (!selectedRegion) {
      alert("Please select a shipping region");
      return;
    }

    if (!selectedShippingOption) {
      alert("Please select a shipping method");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          shippingAddress: checkoutForm.shippingAddress,
          paymentMethod: checkoutForm.paymentMethod,
          shippingOptionId: selectedShippingOption.id,
        }),
      });

      if (response.ok) {
        const orderData = await response.json();
        alert(
          `Order #${orderData.id} placed successfully!\nPayment Method: ${checkoutForm.paymentMethod}\nShipping: ${orderData.shippingMethod} (${orderData.shippingRegion})\nShipping Cost: Rs. ${orderData.shippingCost?.toFixed(2)}\nTotal: Rs. ${orderData.totalAmount?.toFixed(2)}`,
        );
        setCartItems([]);
        setShowCheckoutModal(false);
        setCheckoutForm({
          shippingAddress: "",
          paymentMethod: "Cash on Delivery",
        });
        setSelectedRegion("");
        setShippingOptions([]);
        setSelectedShippingOption(null);
        setShippingCost(0);
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert(
        "Failed to place order. Please check your connection and try again.",
      );
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="cart-page">
          <p style={{ textAlign: "center", padding: "100px 20px" }}>
            Loading cart...
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="cart-page">
        <h2 className="cart-title">Your Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <div className="empty-cart-container">
            <FaShoppingCart className="empty-cart-icon" />
            <p className="empty-cart-text">Your cart is currently empty.</p>
            <a href="/products" className="shop-now-button">
              Browse Products
            </a>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h3>{item.product.name}</h3>
                    <p className="cart-item-price">
                      Rs. {item.product.price.toFixed(2)}
                    </p>
                    <p className="cart-item-description">
                      {item.product.description}
                    </p>
                  </div>
                  <div className="cart-item-quantity">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-total">
                    <p>Rs. {(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal ({cartItems.length} items):</span>
                <span>Rs. {calculateTotal().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>
                  {shippingCost > 0
                    ? `Rs. ${shippingCost.toFixed(2)}`
                    : selectedShippingOption
                      ? "Free"
                      : "Select at checkout"}
                </span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>Rs. {(calculateTotal() + shippingCost).toFixed(2)}</span>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
              <button className="clear-cart-btn" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>

      {showCheckoutModal && (
        <div
          className="checkout-modal-overlay"
          onClick={() => setShowCheckoutModal(false)}
        >
          <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Checkout</h2>
            <form onSubmit={handleCheckoutSubmit}>
              <div className="form-group">
                <label>Shipping Address *</label>
                <textarea
                  value={checkoutForm.shippingAddress}
                  onChange={(e) =>
                    setCheckoutForm({
                      ...checkoutForm,
                      shippingAddress: e.target.value,
                    })
                  }
                  placeholder="Enter your full delivery address"
                  rows="3"
                  required
                />
              </div>

              <div className="form-group">
                <label>Shipping Region *</label>
                <select
                  className="shipping-region-select"
                  value={selectedRegion}
                  onChange={(e) => handleRegionChange(e.target.value)}
                  required
                >
                  <option value="">-- Select your region --</option>
                  {shippingRegions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              {selectedRegion && shippingOptions.length > 0 && (
                <div className="form-group">
                  <label>Shipping Method *</label>
                  <div className="shipping-options">
                    {shippingOptions.map((option) => (
                      <label
                        key={option.id}
                        className={`shipping-option ${selectedShippingOption?.id === option.id ? "selected" : ""}`}
                      >
                        <input
                          type="radio"
                          name="shippingOption"
                          value={option.id}
                          checked={selectedShippingOption?.id === option.id}
                          onChange={() => handleShippingOptionSelect(option)}
                        />
                        <FaTruck className="shipping-icon" />
                        <div className="shipping-info">
                          <span className="shipping-title">
                            {option.methodName}
                          </span>
                          <span className="shipping-desc">
                            {option.description}
                          </span>
                          <span className="shipping-details">
                            <span className="shipping-days">
                              Est. {option.estimatedDays === 0
                                ? "Same day"
                                : `${option.estimatedDays} day${option.estimatedDays > 1 ? "s" : ""}`}
                            </span>
                            <span className="shipping-cost">
                              Rs. {option.cost.toFixed(2)}
                              {option.freeShippingAbove && (
                                <span className="free-shipping-note">
                                  {" "}(Free above Rs. {option.freeShippingThreshold.toFixed(0)})
                                </span>
                              )}
                            </span>
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {selectedRegion && shippingOptions.length === 0 && (
                <div className="no-shipping-message">
                  <p>No shipping options available for this region. Please try "Island-wide" option.</p>
                </div>
              )}

              <div className="form-group">
                <label>Payment Method *</label>
                <div className="payment-options">
                  <label
                    className={`payment-option ${checkoutForm.paymentMethod === "Cash on Delivery" ? "selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Cash on Delivery"
                      checked={
                        checkoutForm.paymentMethod === "Cash on Delivery"
                      }
                      onChange={(e) =>
                        setCheckoutForm({
                          ...checkoutForm,
                          paymentMethod: e.target.value,
                        })
                      }
                    />
                    <FaMoneyBillWave className="payment-icon" />
                    <div className="payment-info">
                      <span className="payment-title">Cash on Delivery</span>
                      <span className="payment-desc">Pay when you receive</span>
                    </div>
                  </label>

                  <label
                    className={`payment-option ${checkoutForm.paymentMethod === "Bank Transfer" ? "selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Bank Transfer"
                      checked={checkoutForm.paymentMethod === "Bank Transfer"}
                      onChange={(e) =>
                        setCheckoutForm({
                          ...checkoutForm,
                          paymentMethod: e.target.value,
                        })
                      }
                    />
                    <FaUniversity className="payment-icon" />
                    <div className="payment-info">
                      <span className="payment-title">Bank Transfer</span>
                      <span className="payment-desc">Direct bank payment</span>
                    </div>
                  </label>

                  <label
                    className={`payment-option ${checkoutForm.paymentMethod === "Credit/Debit Card" ? "selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Credit/Debit Card"
                      checked={
                        checkoutForm.paymentMethod === "Credit/Debit Card"
                      }
                      onChange={(e) =>
                        setCheckoutForm({
                          ...checkoutForm,
                          paymentMethod: e.target.value,
                        })
                      }
                    />
                    <FaCreditCard className="payment-icon" />
                    <div className="payment-info">
                      <span className="payment-title">Credit/Debit Card</span>
                      <span className="payment-desc">
                        Visa, MasterCard, Amex
                      </span>
                    </div>
                  </label>

                  <label
                    className={`payment-option ${checkoutForm.paymentMethod === "Online Payment" ? "selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Online Payment"
                      checked={checkoutForm.paymentMethod === "Online Payment"}
                      onChange={(e) =>
                        setCheckoutForm({
                          ...checkoutForm,
                          paymentMethod: e.target.value,
                        })
                      }
                    />
                    <FaGlobe className="payment-icon" />
                    <div className="payment-info">
                      <span className="payment-title">Online Payment</span>
                      <span className="payment-desc">
                        PayPal, PayHere, etc.
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="order-summary-modal">
                <h3>Order Summary</h3>
                <div className="summary-row">
                  <span>Subtotal ({cartItems.length} items):</span>
                  <span>Rs. {calculateTotal().toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping ({selectedShippingOption?.methodName || "Not selected"}):</span>
                  <span>
                    {shippingCost > 0
                      ? `Rs. ${shippingCost.toFixed(2)}`
                      : selectedShippingOption
                        ? "Free"
                        : "--"}
                  </span>
                </div>
                {selectedShippingOption && (
                  <div className="summary-row shipping-info-row">
                    <span>Estimated Delivery:</span>
                    <span>
                      {selectedShippingOption.estimatedDays === 0
                        ? "Same day"
                        : `${selectedShippingOption.estimatedDays} business day${selectedShippingOption.estimatedDays > 1 ? "s" : ""}`}
                    </span>
                  </div>
                )}
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>Rs. {(calculateTotal() + shippingCost).toFixed(2)}</span>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowCheckoutModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="confirm-btn">
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <NewsletterSection />
      <section id="contact">
        <Footer />
      </section>
    </div>
  );
};

export default Cart;
