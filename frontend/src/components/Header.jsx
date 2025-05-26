import React from 'react';
import { Link } from 'react-router-dom';
import './styles/header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <Link to="/">TopRoof Solutions</Link>
            </div>
            <nav className="nav">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/showrooms">Showrooms</Link></li>
                </ul>
            </nav>
            <div className="user-actions">
                <button className="login-btn">Login</button>
                <button className="cart-btn">Cart (0)</button>
            </div>
        </header>
    );
};

export default Header;