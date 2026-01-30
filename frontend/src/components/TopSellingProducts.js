import React, { useEffect, useState } from "react";
import "../assets/styles/TopSellingProducts.css";
import { useNavigate } from "react-router-dom";

const TopSellingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data) => {
        const topProducts = data.filter((p) => p.featured || p.bestSeller);
        setProducts(topProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = async (product) => {
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
          quantity: 1,
        }),
      });

      if (response.ok) {
        alert(`${product.name} added to cart!`);
      } else {
        alert("Failed to add to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart");
    }
  };

  return (
    <section className="top-selling-section">
      <div className="section-heading">
        <h2>Top Selling Products</h2>
        <div className="underline"></div>
      </div>
      {loading ? (
        <p style={{ textAlign: "center", padding: "40px" }}>
          Loading products...
        </p>
      ) : products.length > 0 ? (
        <div className="top-selling-grid">
          {products.map((product) => (
            <div className="top-product-card" key={product.id}>
              {product.bestSeller && (
                <span className="best-seller-badge">Best Seller</span>
              )}
              <div
                onClick={() => navigate(`/products/${product.id}`)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="product-image"
                />
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">Rs. {product.price.toFixed(2)}</p>
              </div>
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", padding: "40px" }}>
          No featured products available
        </p>
      )}
    </section>
  );
};

export default TopSellingProducts;
