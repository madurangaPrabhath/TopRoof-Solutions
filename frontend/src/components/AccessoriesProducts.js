import React from 'react';
import '../assets/styles/AccessoriesProducts.css';
import { useNavigate } from 'react-router-dom';

import Accessory1 from '../assets/images/armour-terminal-ridge.jpg';
import Accessory2 from '../assets/images/el-toro-frame.jpg';
import Accessory3 from '../assets/images/gutter.jpg';
import Accessory4 from '../assets/images/snow-white(ridge).jpg';

const accessories = [
  { name: 'Terminal Ridge', price: 'Rs.990/=', image: Accessory1 },
  { name: 'El-Toro Frame', price: 'Rs.1,500/=', image: Accessory2 },
  { name: 'Gutter', price: 'Rs.1,100/=', image: Accessory3 },
  { name: 'Snow White (Ridges)', price: 'Rs.870/=', image: Accessory4 },
];

const AccessoriesProducts = () => {
  const navigate = useNavigate();
  const handleAddToCart = () => {
    navigate('/cart');
  };

  return (
    <section className="accessories-section">
      <div className="section-heading">
        <h2>Accessories Products</h2>
        <div className="underline"></div>
      </div>
      <div className="accessories-grid">
        {accessories.map((item, index) => (
          <div className="accessory-card" key={index}>
            <img src={item.image} alt={item.name} className="product-image" />
            <h3 className="product-name">{item.name}</h3>
            <p className="product-price">{item.price}</p>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AccessoriesProducts;