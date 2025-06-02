import React from 'react';
import '../assets/styles/TopSellingProducts.css';

import CementRoofingSheet from '../assets/images/cement-roofing-sheet.jpg';
import SquareGutter from '../assets/images/easy-sheet.jpg';
import DownspoutPipe from '../assets/images/tile-roofing.jpg';
import RoofRidgeCap from '../assets/images/hi-ten-roofing.jpg';

const topSelling = [
  { name: 'Cement Roofing Sheet', price: 'Rs.2,200+', image: CementRoofingSheet },
  { name: 'Easy Sheet', price: 'Rs.1,500+', image: SquareGutter },
  { name: 'Tile Roofing', price: 'Rs.950+', image: DownspoutPipe },
  { name: 'Hi Ten Roofing', price: 'Rs.1,800+', image: RoofRidgeCap },
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
