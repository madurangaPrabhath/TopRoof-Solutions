import React from 'react';
import '../assets/styles/TopSellingProducts.css';

// Import your local product images
import ColorbondSheet from '../assets/images/colorbond-roofing-sheet.jpg';
import SquareGutter from '../assets/images/square-gutter.jpg';
import DownspoutPipe from '../assets/images/downspout-pipe.jpg';
import RoofRidgeCap from '../assets/images/roof-ridge-cap.jpg';

const topSelling = [
  { name: 'Colorbond Roofing Sheet', price: 'Rs.2,200+', image: ColorbondSheet },
  { name: 'Square Gutter', price: 'Rs.1,500+', image: SquareGutter },
  { name: 'Downspout Pipe', price: 'Rs.950+', image: DownspoutPipe },
  { name: 'Roof Ridge Cap', price: 'Rs.1,800+', image: RoofRidgeCap },
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
