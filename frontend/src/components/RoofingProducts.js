import React from 'react';
import './RoofingProducts.css';

const products = [
  { name: 'Caulfield Green', price: 'Rs.2,000+', image: '/assets/caulfield-green.jpg' },
  { name: 'Bronze', price: 'Rs.7,500+', image: '/assets/bronze.jpg' },
  { name: 'Autumn Red', price: 'Rs.2,210+', image: '/assets/autumn-red.jpg' },
  { name: 'Colorup Roof Tile', price: 'Rs.4,100+', image: '/assets/roof-tile.jpg' },
];

const RoofingProducts = () => {
  return (
    <section className="roofing-products">
      <h2>Roofing Products</h2>
      <div className="product-grid">
        {products.map((product, idx) => (
          <div className="product-card" key={idx}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RoofingProducts;
