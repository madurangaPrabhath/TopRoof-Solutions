import React from 'react';
import '../assets/styles/Footer.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-top">
        <div className="footer-col brand">
          <img src="/assets/logo.png" alt="TopRoof Logo" className="footer-logo" />
          <h3>TopRoof Solutions</h3>
          <p>Head Office<br />752, Baseline Road,<br />Colombo 09,<br />Sri Lanka</p>
        </div>
        <div className="footer-col">
          <h4>Product</h4>
          <p>Roofing Products</p>
          <p>Top Selling Products</p>
          <p>Accessories Products</p>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <p>About us</p>
          <p>Careers</p>
          <p>Help Center</p>
          <p>Showrooms</p>
        </div>
        <div className="footer-col">
          <h4>Need help</h4>
          <p>+94 77 255 0770</p>
          <p>Mon – Fri: 9:00AM - 5:00PM<br />Sat: 9:00AM – 1:00PM</p>
          <p><a href="mailto:Info@toproofsolutions.lk">Info@toproofsolutions.lk</a></p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-lang">🌐 English</div>
        <div className="footer-copy">©2025 TopRoof Solutions</div>
        <div className="footer-social">
          <FaFacebookF />
          <FaTwitter />
          <FaLinkedinIn />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
