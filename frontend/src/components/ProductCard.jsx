import React from 'react';
import { FaCartPlus } from 'react-icons/fa';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <div className="product-image">
                <img src={`/images/products/${product.image}`} alt={product.name} />
                <button className="quick-view">Quick View</button>
            </div>
            <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">LKR {product.price.toLocaleString()}</p>
                <button className="add-to-cart">
                    <FaCartPlus /> Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;