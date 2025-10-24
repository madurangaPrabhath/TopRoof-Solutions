import React, { useState, useEffect, useRef } from 'react';
import '../assets/styles/Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { FaShoppingCart, FaUser, FaUserCircle } from 'react-icons/fa';
import Logo from '../assets/images/logo.png';

const Header = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userEmail');
    setUser(null);
    setShowDropdown(false);
    navigate('/');
  };

  const handleDashboardClick = () => {
    setShowDropdown(false);
    if (user?.role === 'ADMIN') {
      navigate('/admin-dashboard');
    } else {
      navigate('/dashboard');
    }
  };

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
        {user ? (
          <div className="user-menu" ref={dropdownRef}>
            <button 
              className="user-profile-btn" 
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <FaUserCircle className="user-icon" />
              <span className="user-name">{user.email?.split('@')[0]}</span>
            </button>
            
            {showDropdown && (
              <div className="user-dropdown">
                <div className="dropdown-header">
                  <FaUserCircle className="dropdown-avatar" />
                  <div className="dropdown-user-info">
                    <p className="dropdown-name">{user.fullName || user.email}</p>
                    <p className="dropdown-role">{user.role}</p>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                <button onClick={handleDashboardClick} className="dropdown-item">
                  <FaUser className="dropdown-icon" />
                  {user.role === 'ADMIN' ? 'Admin Dashboard' : 'My Dashboard'}
                </button>
                <button onClick={() => {
                  setShowDropdown(false);
                  navigate('/cart');
                }} className="dropdown-item">
                  <FaShoppingCart className="dropdown-icon" />
                  My Cart
                </button>
                <div className="dropdown-divider"></div>
                <button onClick={handleLogout} className="dropdown-item logout-item">
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="nav-btn">Login</Link>
        )}
        
        <Link to="/cart" className="cart-btn">
          <FaShoppingCart />
          <span>Cart</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
