import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
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

  const fetchProduct = useCallback(async () => {
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
  }, [id]);

  const checkWishlist = useCallback(async () => {
    const userData = localStorage.getItem("user");
    if (!userData) return;

    const user = JSON.parse(userData);
    try {
      const response = await fetch(
        `${API_ENDPOINTS.WISHLIST_CHECK}?userId=${user.id}&productId=${id}`,
      );
      if (response.ok) {
        const data = await response.json();
        setIsInWishlist(data.inWishlist);
      }
    } catch (err) {
      console.error("Error checking wishlist:", err);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
    checkWishlist();
  }, [fetchProduct, checkWishlist]);

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
        const response = await fetch(
          `${API_ENDPOINTS.WISHLIST_REMOVE}?userId=${user.id}&productId=${product.id}`,
          { method: "DELETE" },
        );
        if (response.ok) {
          setIsInWishlist(false);
        }
      } else {
        const response = await fetch(
          `${API_ENDPOINTS.WISHLIST_ADD}?userId=${user.id}&productId=${product.id}`,
          { method: "POST" },
        );
        if (response.ok) {
          setIsInWishlist(true);
        }
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);
      alert("Failed to update wishlist");
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
              {product.stockQuantity > 0 ? (
                <span className="in-stock">
                  ✓ In Stock ({product.stockQuantity} available)
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
                  onClick={() => setQuantity(Math.max(1, Number(quantity) - 1))}
                  disabled={Number(quantity) <= 1}
                  type="button"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    const inputValue = e.target.value;

                    if (inputValue === "") {
                      setQuantity(1);
                      return;
                    }

                    const value = parseInt(inputValue, 10);
                    if (!isNaN(value)) {
                      if (value >= 1 && value <= product.stockQuantity) {
                        setQuantity(value);
                      } else if (value > product.stockQuantity) {
                        setQuantity(product.stockQuantity);
                      } else if (value < 1) {
                        setQuantity(1);
                      }
                    }
                  }}
                  onBlur={(e) => {
                    if (
                      e.target.value === "" ||
                      parseInt(e.target.value, 10) < 1 ||
                      isNaN(parseInt(e.target.value, 10))
                    ) {
                      setQuantity(1);
                    }
                  }}
                  min="1"
                  max={product.stockQuantity}
                />
                <button
                  onClick={() =>
                    setQuantity(
                      Math.min(product.stockQuantity, Number(quantity) + 1),
                    )
                  }
                  disabled={Number(quantity) >= product.stockQuantity}
                  type="button"
                >
                  +
                </button>
              </div>

              <div className="action-buttons">
                <button
                  className="add-to-cart-btn"
                  onClick={handleAddToCart}
                  disabled={product.stockQuantity === 0}
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
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
