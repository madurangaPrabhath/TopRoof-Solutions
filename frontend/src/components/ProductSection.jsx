import React from 'react';
import ProductCard from './ProductCard';

const ProductSection = ({ title, category }) => {
  const products = [
    { id: 1, name: 'Galvanized Roof Sheet', price: 4500, image: 'roof-sheet.jpg' },
    { id: 2, name: 'PVC Gutter', price: 3800, image: 'gutter.jpg' },
    { id: 3, name: 'Roofing Nails', price: 1200, image: 'nails.jpg' },
  ];

  return (
    <section className={`product-section ${category}`}>
      <h2>{title}</h2>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;