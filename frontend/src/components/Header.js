import React from 'react';
import '../assets/styles/Header.css';
import Logo from '../assets/images/logo.png';

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-left">
        <img src={Logo} alt="TopRoof Logo" className="header-logo" />
        <h1 className="header-title">TopRoof Solutions</h1>
      </div>
      <nav className="header-nav">
        <a href="/">Home</a>
        <a href="/products">Products</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
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
