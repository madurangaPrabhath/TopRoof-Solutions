import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="price">LKR {product.price}</p>
            <button className="add-to-cart">Add to Cart</button>
        </div>
    );
};

export default ProductCard;