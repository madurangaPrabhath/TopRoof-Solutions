import React from 'react';
import '../assets/styles/Header.css';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { FaShoppingCart } from 'react-icons/fa';
import Logo from '../assets/images/logo.png';

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-left">
        <img src={Logo} alt="TopRoof Logo" className="header-logo" />
        <h1 className="header-title">TopRoof Solutions</h1>
      </div>

      <nav className="header-nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/products" className="nav-link">Products</Link>
        <HashLink smooth to="/#about">About</HashLink>
        <HashLink smooth to="/#contact">Contact</HashLink>
      </nav>

      <nav className="header-nav">
        <Link to="/login" className="nav-btn">Login</Link>
        <Link to="/cart" className="cart-btn">
          <FaShoppingCart />
          <span>Cart</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
