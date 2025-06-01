import React from 'react';
import '../assets/styles/TopSellingProducts.css';

const topSelling = [
  { name: 'Colorbond Roofing Sheet', price: 'Rs.2,200+', image: 'https://via.placeholder.com/200x150' },
  { name: 'Square Gutter', price: 'Rs.1,500+', image: 'https://via.placeholder.com/200x150' },
  { name: 'Downspout Pipe', price: 'Rs.950+', image: 'https://via.placeholder.com/200x150' },
  { name: 'Roof Ridge Cap', price: 'Rs.1,800+', image: 'https://via.placeholder.com/200x150' },
];

const TopSellingProducts = () => {
  return (
    <section className="top-selling-section">
      <h2>Top Selling Products</h2>
      <div className="top-selling-grid">
        {topSelling.map((item, index) => (
          <div className="top-product-box" key={index}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopSellingProducts;
