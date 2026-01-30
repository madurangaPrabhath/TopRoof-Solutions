import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { API_ENDPOINTS } from "../config/api";
import "../assets/styles/Wishlist.css";

const FALLBACK_IMAGE =
  "https://via.placeholder.com/400x300/0f3c78/ffffff?text=TopRoof+Product";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }
    fetchWishlist();
  }, [navigate]);

  const fetchWishlist = async () => {
    const userData = localStorage.getItem("user");
    if (!userData) return;

    const user = JSON.parse(userData);
    try {
      const response = await fetch(`${API_ENDPOINTS.WISHLIST_GET}/${user.id}`);
      if (!response.ok) throw new Error("Failed to fetch wishlist");
      const data = await response.json();
      setWishlistItems(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    const userData = localStorage.getItem("user");
    if (!userData) return;

    const user = JSON.parse(userData);
    try {
      const response = await fetch(
        `${API_ENDPOINTS.WISHLIST_REMOVE}?userId=${user.id}&productId=${productId}`,
        { method: "DELETE" },
      );

      if (response.ok) {
        setWishlistItems((prev) =>
          prev.filter((item) => item.product.id !== productId),
        );
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to remove item");
      }
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      alert("Failed to remove item from wishlist");
    }
  };

  const addToCart = async (product) => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      alert("Please login to add items to cart");
      navigate("/login");
      return;
    }

    const user = JSON.parse(userData);

    try {
      const response = await fetch(API_ENDPOINTS.CART_ADD, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          productId: product.id,
          quantity: 1,
        }),
      });

      if (response.ok) {
        alert(`${product.name} added to cart!`);
      } else {
        const errorText = await response.text();
        alert("Failed to add to cart: " + errorText);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart: " + error.message);
    }
  };

  const moveToCart = async (item) => {
    await addToCart(item.product);
    await removeFromWishlist(item.product.id);
  };

  const clearWishlist = async () => {
    const userData = localStorage.getItem("user");
    if (!userData) return;

    const user = JSON.parse(userData);

    if (!window.confirm("Are you sure you want to clear your wishlist?")) {
      return;
    }

    try {
      const response = await fetch(
        `${API_ENDPOINTS.WISHLIST_CLEAR}/${user.id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        setWishlistItems([]);
      } else {
        alert("Failed to clear wishlist");
      }
    } catch (err) {
      console.error("Error clearing wishlist:", err);
      alert("Failed to clear wishlist");
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="wishlist-loading">
          <div className="loading-spinner"></div>
          <p>Loading your wishlist...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className="wishlist-error">
          <h2>❌ Error</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="wishlist-container">
        <div className="wishlist-header">
          <h1>❤️ My Wishlist</h1>
          <p className="wishlist-count">
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1 ? "item" : "items"}
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="wishlist-empty">
            <div className="empty-icon">💔</div>
            <h2>Your wishlist is empty</h2>
            <p>Start adding products you love!</p>
            <button
              className="browse-products-btn"
              onClick={() => navigate("/products")}
            >
              Browse Products
            </button>
          </div>
        ) : (
          <>
            <div className="wishlist-actions">
              <button className="clear-wishlist-btn" onClick={clearWishlist}>
                🗑️ Clear Wishlist
              </button>
            </div>

            <div className="wishlist-grid">
              {wishlistItems.map((item) => (
                <div className="wishlist-card" key={item.id}>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromWishlist(item.product.id)}
                    title="Remove from wishlist"
                  >
                    ✕
                  </button>

                  <div
                    className="wishlist-card-image"
                    onClick={() => navigate(`/products/${item.product.id}`)}
                  >
                    <img
                      src={item.product.imageUrl || FALLBACK_IMAGE}
                      alt={item.product.name}
                      onError={(e) => {
                        e.target.src = FALLBACK_IMAGE;
                      }}
                    />
                  </div>

                  <div className="wishlist-card-content">
                    <h3
                      onClick={() => navigate(`/products/${item.product.id}`)}
                      className="product-name"
                    >
                      {item.product.name}
                    </h3>
                    <p className="product-brand">{item.product.brand}</p>
                    <p className="product-category">{item.product.category}</p>
                    <p className="product-price">
                      Rs. {item.product.price.toFixed(2)}
                    </p>
                    <p className="added-date">
                      Added: {new Date(item.addedAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="wishlist-card-actions">
                    <button
                      className="add-to-cart-btn"
                      onClick={() => addToCart(item.product)}
                    >
                      🛒 Add to Cart
                    </button>
                    <button
                      className="move-to-cart-btn"
                      onClick={() => moveToCart(item)}
                    >
                      Move to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
