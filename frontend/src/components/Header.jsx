import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import '../assets/styles/header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <Link to="/">TopRoof Solutions</Link>
                </div>
                
                <nav className="nav-menu">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/products">Roofing Products</Link></li>
                        <li><Link to="/accessories">Accessories</Link></li>
                        <li><Link to="/showrooms">Showrooms</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                    </ul>
                </nav>
                
                <div className="user-actions">
                    <Link to="/account" className="account-btn">
                        <FaUser /> Account
                    </Link>
                    <Link to="/cart" className="cart-btn">
                        <FaShoppingCart /> Cart (0)
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;