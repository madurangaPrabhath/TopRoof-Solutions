import React from 'react';
import '../assets/styles/RoofingProducts.css';

import CaulfieldGreen from '../assets/images/caulfield-green.jpg';
import Bronze from '../assets/images/bronze.jpg';
import AutumnRed from '../assets/images/autumn-red.jpg';
import RoofTile from '../assets/images/roof-tile.jpg';

const products = [
  { name: 'Caulfield Green', price: 'Rs.2,000+', image: CaulfieldGreen },
  { name: 'Bronze', price: 'Rs.7,500+', image: Bronze },
  { name: 'Autumn Red', price: 'Rs.2,210+', image: AutumnRed },
  { name: 'Colorup Roof Tile', price: 'Rs.4,100+', image: RoofTile },
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
