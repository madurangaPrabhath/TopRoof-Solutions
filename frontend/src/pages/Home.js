import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AboutUs from "../components/AboutUs";
import Showrooms from "../components/Showrooms";
import Testimonials from "../components/Testimonials";
import Supporters from "../components/Supporters";
import NewsletterSection from "../components/NewsletterSection";
import Footer from "../components/Footer";
import "../assets/styles/RoofingProducts.css";
import "../assets/styles/TopSellingProducts.css";
import "../assets/styles/AccessoriesProducts.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from backend
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
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

  const roofingProducts = products
    .filter((p) => p.category?.toLowerCase() === "roofing")
    .slice(0, 4);
  const topSellingProducts = products
    .filter((p) => p.featured || p.bestSeller)
    .slice(0, 4);
  const accessoriesProducts = products
    .filter((p) => p.category?.toLowerCase() === "accessories")
    .slice(0, 4);

  return (
    <div>
      <Header />
      <HeroSection />

      {/* Roofing Products Section */}
      <section id="roofing-products" className="roofing-products">
        <div className="section-heading">
          <h2>Roofing Products</h2>
          <div className="underline"></div>
        </div>
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading products...</p>
        ) : roofingProducts.length > 0 ? (
          <>
            <div className="roofing-grid">
              {roofingProducts.map((product) => (
                <div className="roofing-card" key={product.id}>
                  <div
                    onClick={() => navigate(`/products/${product.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={product.imageUrl} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>Rs. {product.price.toFixed(2)}</p>
                  </div>
                  <button onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <button
                onClick={() => navigate("/products")}
                style={{
                  padding: "12px 30px",
                  fontSize: "16px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#0056b3")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
              >
                See More Roofing Products
              </button>
            </div>
          </>
        ) : (
          <p style={{ textAlign: "center" }}>No roofing products available</p>
        )}
      </section>

      {/* Top Selling Products Section */}
      <section id="top-selling-products" className="roofing-products">
        <div className="section-heading">
          <h2>Top Selling Products</h2>
          <div className="underline"></div>
        </div>
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading products...</p>
        ) : topSellingProducts.length > 0 ? (
          <>
            <div className="roofing-grid">
              {topSellingProducts.map((product) => (
                <div className="roofing-card" key={product.id}>
                  {product.bestSeller && (
                    <span className="best-seller-badge">Best Seller</span>
                  )}
                  <div
                    onClick={() => navigate(`/products/${product.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={product.imageUrl} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>Rs. {product.price.toFixed(2)}</p>
                  </div>
                  <button onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <button
                onClick={() => navigate("/products")}
                style={{
                  padding: "12px 30px",
                  fontSize: "16px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#0056b3")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
              >
                See More Products
              </button>
            </div>
          </>
        ) : (
          <p style={{ textAlign: "center" }}>No featured products available</p>
        )}
      </section>

      <section id="about">
        <AboutUs />
      </section>

      {/* Accessories Products Section */}
      <section id="accessories-products" className="roofing-products">
        <div className="section-heading">
          <h2>Accessories Products</h2>
          <div className="underline"></div>
        </div>
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading products...</p>
        ) : accessoriesProducts.length > 0 ? (
          <>
            <div className="roofing-grid">
              {accessoriesProducts.map((product) => (
                <div className="roofing-card" key={product.id}>
                  <div
                    onClick={() => navigate(`/products/${product.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={product.imageUrl} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>Rs. {product.price.toFixed(2)}</p>
                  </div>
                  <button onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <button
                onClick={() => navigate("/products")}
                style={{
                  padding: "12px 30px",
                  fontSize: "16px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#0056b3")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
              >
                See More Accessories
              </button>
            </div>
          </>
        ) : (
          <p style={{ textAlign: "center" }}>
            No accessories products available
          </p>
        )}
      </section>

      <section id="showrooms">
        <Showrooms />
      </section>
      <Testimonials />
      <Supporters />
      <NewsletterSection />
      <section id="contact">
        <Footer />
      </section>
    </div>
  );
};

export default Home;
