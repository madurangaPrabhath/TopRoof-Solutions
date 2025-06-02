import React from 'react';
import '../assets/styles/AccessoriesProducts.css';

import Accessory1 from '../assets/images/armour-terminal-ridge.jpg';
import Accessory2 from '../assets/images/el-toro-frame.jpg';
import Accessory3 from '../assets/images/gutter.jpg';
import Accessory4 from '../assets/images/snow-white(ridge).jpg';

const accessories = [
  { name: 'Armour Terminal Ridge', price: 'Rs.750+', image: Accessory1 },
  { name: 'El-Toro Frame', price: 'Rs.320+', image: Accessory2 },
  { name: 'Gutter', price: 'Rs.450+', image: Accessory3 },
  { name: 'Snow White (Ridge)', price: 'Rs.200+', image: Accessory4 },
];

const AccessoriesProducts = () => {
  return (
    <section className="accessories-section">
      <h2>Roofing Accessories</h2>
      <div className="accessories-grid">
        {accessories.map((item, index) => (
          <div className="accessory-box" key={index}>
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

export default AccessoriesProducts;
