import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductReviews from "../components/ProductReviews";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import "../assets/styles/ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    fetchProduct();
    checkWishlist();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/products/${id}`);
      if (!response.ok) throw new Error("Product not found");
      const data = await response.json();
      setProduct(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const checkWishlist = async () => {
    const userData = localStorage.getItem("user");
    if (!userData) return;

    const user = JSON.parse(userData);
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.WISHLIST_GET}/${user.id}`
      );
      const isInList = response.data.some(
        (item) => item.product.id === parseInt(id)
      );
      setIsInWishlist(isInList);
    } catch (err) {
      console.error("Error checking wishlist:", err);
    }
  };

  const handleAddToCart = async () => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      alert("Please login to add items to cart");
      navigate("/login");
      return;
    }

    const user = JSON.parse(userData);

    try {
      const response = await fetch("http://localhost:8080/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          productId: product.id,
          quantity: quantity,
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

  const toggleWishlist = async () => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      alert("Please login to add items to wishlist");
      navigate("/login");
      return;
    }

    const user = JSON.parse(userData);

    try {
      if (isInWishlist) {
        await axios.delete(API_ENDPOINTS.WISHLIST_REMOVE, {
          params: { userId: user.id, productId: product.id },
        });
        setIsInWishlist(false);
      } else {
        await axios.post(API_ENDPOINTS.WISHLIST_ADD, null, {
          params: { userId: user.id, productId: product.id },
        });
        setIsInWishlist(true);
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);
      alert(err.response?.data?.error || "Failed to update wishlist");
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div style={{ textAlign: "center", padding: "100px 20px" }}>
          <h2>Loading product...</h2>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div>
        <Header />
        <div
          style={{ textAlign: "center", padding: "100px 20px", color: "red" }}
        >
          <h2>Error: {error || "Product not found"}</h2>
          <button
            onClick={() => navigate("/products")}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#c8102e",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Back to Products
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />

      <div className="product-detail-container">
        <div className="breadcrumb">
          <span onClick={() => navigate("/")}>Home</span> /{" "}
          <span onClick={() => navigate("/products")}>Products</span> /{" "}
          <span>{product.name}</span>
        </div>

        <div className="product-detail-main">
          <div className="product-image-section">
            <img
              src={product.imageUrl || "/placeholder-product.png"}
              alt={product.name}
              className="product-detail-image"
            />
          </div>

          <div className="product-info-section">
            <h1 className="product-title">{product.name}</h1>

            <div className="product-brand-category">
              <span className="brand-badge">{product.brand}</span>
              <span className="category-badge">{product.category}</span>
            </div>

            <div className="product-price">
              Rs. {product.price?.toLocaleString()}
            </div>

            <div className="product-stock">
              {product.stock > 0 ? (
                <span className="in-stock">
                  ✓ In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="out-of-stock">✗ Out of Stock</span>
              )}
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description || "No description available."}</p>
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <label>Quantity:</label>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  min="1"
                  max={product.stock}
                />
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>

              <div className="action-buttons">
                <button
                  className="add-to-cart-btn"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  Add to Cart
                </button>
                <button
                  className={`wishlist-btn ${isInWishlist ? "active" : ""}`}
                  onClick={toggleWishlist}
                  title={
                    isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"
                  }
                >
                  {isInWishlist ? "❤️" : "🤍"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="reviews-section">
          <ProductReviews productId={parseInt(id)} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
