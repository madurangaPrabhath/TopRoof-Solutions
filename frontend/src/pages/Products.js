import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import NewsletterSection from "../components/NewsletterSection";
import Footer from "../components/Footer";
import ProductShare from "../components/ProductShare";
import { API_ENDPOINTS } from "../config/api";
import axios from "axios";
import "../assets/styles/Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [wishlistItems, setWishlistItems] = useState(new Set());

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8080/api/products").then((res) => res.json()),
      fetch("http://localhost:8080/api/products/brands").then((res) =>
        res.json(),
      ),
      fetch("http://localhost:8080/api/products/categories").then((res) =>
        res.json(),
      ),
    ])
      .then(([productsData, brandsData, categoriesData]) => {
        setProducts(productsData);
        setFilteredProducts(productsData);
        setBrands(brandsData);
        setCategories(categoriesData);
        setLoading(false);
        fetchWishlist();
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams();

    if (searchTerm) params.append("search", searchTerm);
    if (selectedCategory) params.append("category", selectedCategory);
    if (selectedBrand) params.append("brand", selectedBrand);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    if (sortBy) params.append("sortBy", sortBy);

    const queryString = params.toString();
    const url = queryString
      ? `http://localhost:8080/api/products/filter?${queryString}`
      : "http://localhost:8080/api/products";

    fetch(url)
      .then((res) => res.json())
      .then((data) => setFilteredProducts(data))
      .catch((err) => console.error("Error filtering products:", err));
  }, [searchTerm, selectedCategory, selectedBrand, minPrice, maxPrice, sortBy]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const fetchWishlist = async () => {
    const userData = localStorage.getItem("user");
    if (!userData) return;

    const user = JSON.parse(userData);
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.WISHLIST_GET}/${user.id}`,
      );
      const wishlistProductIds = new Set(
        response.data.map((item) => item.product.id),
      );
      setWishlistItems(wishlistProductIds);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  };

  const toggleWishlist = async (productId) => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      alert("Please login to add items to wishlist");
      navigate("/login");
      return;
    }

    const user = JSON.parse(userData);
    const isInWishlist = wishlistItems.has(productId);

    try {
      if (isInWishlist) {
        await axios.delete(API_ENDPOINTS.WISHLIST_REMOVE, {
          params: { userId: user.id, productId },
        });
        setWishlistItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
      } else {
        await axios.post(API_ENDPOINTS.WISHLIST_ADD, null, {
          params: { userId: user.id, productId },
        });
        setWishlistItems((prev) => new Set([...prev, productId]));
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);
      alert(err.response?.data?.error || "Failed to update wishlist");
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedBrand("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("");
  };

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
        const errorText = await response.text();
        console.error("Error response:", errorText);
        alert("Failed to add to cart: " + errorText);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart: " + error.message);
    }
  };

  const getProductsByCategory = (category) => {
    return products.filter(
      (p) => p.category?.toLowerCase() === category.toLowerCase(),
    );
  };

  const roofingProducts = getProductsByCategory("roofing");
  const accessoriesProducts = getProductsByCategory("accessories");
  const featuredProducts = products.filter((p) => p.featured || p.bestSeller);

  if (loading) {
    return (
      <div>
        <Header />
        <div style={{ textAlign: "center", padding: "100px 20px" }}>
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
        <div
          style={{ textAlign: "center", padding: "100px 20px", color: "red" }}
        >
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
          <p>
            High-quality roofing sheets, gutters, ridges and accessories crafted
            for durability and performance in Sri Lankan conditions.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="filter-section">
        <div className="filter-container">
          <div className="filter-header">
            <h3>
              <span>🔍</span> Search & Filter Products
            </h3>
            <button
              className="toggle-filters-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? "▲ Hide Filters" : "▼ Show Filters"}
            </button>
          </div>

          {showFilters && (
            <div className="filter-controls">
              {/* Search Bar */}
              <div className="filter-group search-group">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>

              {/* Filters Grid */}
              <div className="filters-grid">
                {/* Category Filter */}
                <div className="filter-group">
                  <label>Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="filter-select"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Brand Filter */}
                <div className="filter-group">
                  <label>Brand</label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="filter-select"
                  >
                    <option value="">All Brands</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div className="filter-group">
                  <label>Min Price (Rs.)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="price-input"
                  />
                </div>

                <div className="filter-group">
                  <label>Max Price (Rs.)</label>
                  <input
                    type="number"
                    placeholder="10000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="price-input"
                  />
                </div>

                {/* Sort By */}
                <div className="filter-group">
                  <label>Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="filter-select"
                  >
                    <option value="">Default</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="name_asc">Name: A to Z</option>
                    <option value="name_desc">Name: Z to A</option>
                  </select>
                </div>

                {/* Clear Filters Button */}
                <div className="filter-group">
                  <label>&nbsp;</label>
                  <button onClick={clearFilters} className="clear-filters-btn">
                    Clear Filters
                  </button>
                </div>
              </div>

              {/* Results Count */}
              <div className="results-count">
                Showing <strong>{filteredProducts.length}</strong> of{" "}
                <strong>{products.length}</strong> products
              </div>
            </div>
          )}
        </div>
      </section>

      {/* All Products Grid */}
      <section className="all-products-section">
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <h3>No products found</h3>
            <p>Try adjusting your filters or search term</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                {product.bestSeller && (
                  <span className="badge">Best Seller</span>
                )}
                {product.featured && (
                  <span className="badge featured-badge">Featured</span>
                )}
                <button
                  className={`wishlist-btn ${
                    wishlistItems.has(product.id) ? "in-wishlist" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  title={
                    wishlistItems.has(product.id)
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                >
                  {wishlistItems.has(product.id) ? "❤️" : "🤍"}
                </button>
                <ProductShare product={product} />
                <div
                  onClick={() => navigate(`/products/${product.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={product.imageUrl} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p className="brand">{product.brand}</p>
                  <p className="category-tag">{product.category}</p>
                  <p className="price">Rs. {product.price.toFixed(2)}</p>
                  <p className="description">{product.description}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {roofingProducts.length > 0 &&
        !searchTerm &&
        !selectedCategory &&
        !selectedBrand &&
        !minPrice &&
        !maxPrice && (
          <section id="roofing-products" className="product-section">
            <div className="section-heading">
              <h2>Roofing Products</h2>
              <div className="underline"></div>
            </div>
            <div className="products-grid">
              {roofingProducts.map((product) => (
                <div className="product-card" key={product.id}>
                  <button
                    className={`wishlist-btn ${
                      wishlistItems.has(product.id) ? "in-wishlist" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    title={
                      wishlistItems.has(product.id)
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                  >
                    {wishlistItems.has(product.id) ? "❤️" : "🤍"}
                  </button>
                  <ProductShare product={product} />
                  <div
                    onClick={() => navigate(`/products/${product.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={product.imageUrl} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p className="price">Rs. {product.price.toFixed(2)}</p>
                    <p className="description">{product.description}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

      {featuredProducts.length > 0 &&
        !searchTerm &&
        !selectedCategory &&
        !selectedBrand &&
        !minPrice &&
        !maxPrice && (
          <section id="top-selling-products" className="product-section">
            <div className="section-heading">
              <h2>Top Selling Products</h2>
              <div className="underline"></div>
            </div>
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <div className="product-card featured" key={product.id}>
                  {product.bestSeller && (
                    <span className="badge">Best Seller</span>
                  )}
                  {product.featured && (
                    <span className="badge featured-badge">Featured</span>
                  )}
                  <button
                    className={`wishlist-btn ${
                      wishlistItems.has(product.id) ? "in-wishlist" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    title={
                      wishlistItems.has(product.id)
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                  >
                    {wishlistItems.has(product.id) ? "❤️" : "🤍"}
                  </button>
                  <ProductShare product={product} />
                  <div
                    onClick={() => navigate(`/products/${product.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={product.imageUrl} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p className="price">Rs. {product.price.toFixed(2)}</p>
                    <p className="description">{product.description}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

      {accessoriesProducts.length > 0 &&
        !searchTerm &&
        !selectedCategory &&
        !selectedBrand &&
        !minPrice &&
        !maxPrice && (
          <section id="accessories-products" className="product-section">
            <div className="section-heading">
              <h2>Accessories Products</h2>
              <div className="underline"></div>
            </div>
            <div className="products-grid">
              {accessoriesProducts.map((product) => (
                <div className="product-card" key={product.id}>
                  <button
                    className={`wishlist-btn ${
                      wishlistItems.has(product.id) ? "in-wishlist" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    title={
                      wishlistItems.has(product.id)
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                  >
                    {wishlistItems.has(product.id) ? "❤️" : "🤍"}
                  </button>
                  <ProductShare product={product} />
                  <div
                    onClick={() => navigate(`/products/${product.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={product.imageUrl} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p className="price">Rs. {product.price.toFixed(2)}</p>
                    <p className="description">{product.description}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                  >
                    Add to Cart
                  </button>
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
