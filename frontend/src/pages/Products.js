import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';
import '../assets/styles/Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from backend
    fetch('http://localhost:8080/api/products')
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch products.");
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = async (product) => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      alert('Please login to add items to cart');
      navigate('/login');
      return;
    }

    const user = JSON.parse(userData);
    
    try {
      const response = await fetch('http://localhost:8080/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          productId: product.id,
          quantity: 1
        })
      });

      if (response.ok) {
        alert(`${product.name} added to cart!`);
      } else {
        alert('Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart');
    }
  };

  const getProductsByCategory = (category) => {
    return products.filter(p => p.category?.toLowerCase() === category.toLowerCase());
  };

  const roofingProducts = getProductsByCategory('roofing');
  const accessoriesProducts = getProductsByCategory('accessories');
  const featuredProducts = products.filter(p => p.featured || p.bestSeller);

  if (loading) {
    return (
      <div>
        <Header />
        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
          <h2>Loading products...</h2>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <div style={{ textAlign: 'center', padding: '100px 20px', color: 'red' }}>
          <h2>Error: {error}</h2>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <section className="products-hero">
        <div className="hero-content">
          <h1>Explore Our Roofing & Gutter Products</h1>
          <p>High-quality roofing sheets, gutters, ridges and accessories crafted for durability and performance in Sri Lankan conditions.</p>
        </div>
      </section>

      {/* Roofing Products Section */}
      {roofingProducts.length > 0 && (
        <section id="roofing-products" className="product-section">
          <div className="section-heading">
            <h2>Roofing Products</h2>
            <div className="underline"></div>
          </div>
          <div className="products-grid">
            {roofingProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <img src={product.imageUrl} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="price">Rs. {product.price.toFixed(2)}</p>
                <p className="description">{product.description}</p>
                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Featured/Best Seller Products */}
      {featuredProducts.length > 0 && (
        <section id="top-selling-products" className="product-section">
          <div className="section-heading">
            <h2>Top Selling Products</h2>
            <div className="underline"></div>
          </div>
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <div className="product-card featured" key={product.id}>
                {product.bestSeller && <span className="badge">Best Seller</span>}
                {product.featured && <span className="badge featured-badge">Featured</span>}
                <img src={product.imageUrl} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="price">Rs. {product.price.toFixed(2)}</p>
                <p className="description">{product.description}</p>
                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Accessories Products Section */}
      {accessoriesProducts.length > 0 && (
        <section id="accessories-products" className="product-section">
          <div className="section-heading">
            <h2>Accessories Products</h2>
            <div className="underline"></div>
          </div>
          <div className="products-grid">
            {accessoriesProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <img src={product.imageUrl} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="price">Rs. {product.price.toFixed(2)}</p>
                <p className="description">{product.description}</p>
                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
            ))}
          </div>
        </section>
      )}

      <NewsletterSection />
      <section id="contact">
        <Footer />
      </section>
    </div>
  );
};

export default Products;
