import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { API_ENDPOINTS } from "../config/api";
import "../assets/styles/Wishlist.css";

// Fallback image for broken product images
const FALLBACK_IMAGE =
  "https://via.placeholder.com/400x300/0f3c78/ffffff?text=TopRoof+Product";

function Wishlist() {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchWishlist();
  }, [user, navigate]);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_ENDPOINTS.WISHLIST_GET}/${user.id}`,
      );
      setWishlistItems(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      setError("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(API_ENDPOINTS.WISHLIST_REMOVE, {
        params: {
          userId: user.id,
          productId: productId,
        },
      });
      setWishlistItems(
        wishlistItems.filter((item) => item.product.id !== productId),
      );
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      alert("Failed to remove item from wishlist");
    }
  };

  const addToCart = async (productId) => {
    try {
      await axios.post(API_ENDPOINTS.CART_ADD, {
        userId: user.id,
        productId: productId,
        quantity: 1,
      });
      alert("Product added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add to cart");
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="wishlist-loading">Loading your wishlist...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="wishlist-container">
        <div className="wishlist-header">
          <h1>My Wishlist</h1>
          <p>
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1 ? "item" : "items"}
          </p>
        </div>

        {error && <div className="wishlist-error">{error}</div>}

        {wishlistItems.length === 0 ? (
          <div className="wishlist-empty">
            <h2>Your wishlist is empty</h2>
            <p>Start adding products you love!</p>
            <button
              onClick={() => navigate("/products")}
              className="browse-btn"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlistItems.map((item) => (
              <div key={item.id} className="wishlist-item">
                <div className="wishlist-item-image">
                  <img
                    src={item.product.imageUrl || FALLBACK_IMAGE}
                    alt={item.product.name}
                    onError={(e) => {
                      e.target.src = FALLBACK_IMAGE;
                    }}
                  />
                </div>
                <div className="wishlist-item-details">
                  <h3>{item.product.name}</h3>
                  <p className="wishlist-item-price">
                    ${item.product.price.toFixed(2)}
                  </p>
                  <p className="wishlist-item-category">
                    {item.product.category}
                  </p>
                  {item.product.stockQuantity > 0 ? (
                    <p className="wishlist-item-stock in-stock">In Stock</p>
                  ) : (
                    <p className="wishlist-item-stock out-of-stock">
                      Out of Stock
                    </p>
                  )}
                  <div className="wishlist-item-actions">
                    <button
                      className="add-to-cart-btn"
                      onClick={() => addToCart(item.product.id)}
                      disabled={item.product.stockQuantity === 0}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromWishlist(item.product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Wishlist;
