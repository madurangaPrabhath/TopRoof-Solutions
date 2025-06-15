import React from 'react';
import { HashLink } from 'react-router-hash-link';
import '../assets/styles/Footer.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { IoGlobeOutline } from 'react-icons/io5';
import Logo from '../assets/images/logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top-line"></div>
      <div className="footer-main">
        <div className="footer-col brand">
          <div className="footer-branding">
            <img src={Logo} alt="TopRoof Logo" className="footer-logo" />
            <h3 className="footer-title">TopRoof Solutions</h3>
          </div>
          <p>
            Head Office<br />
            752, Baseline Road,<br />
            Colombo 09,<br />
            Sri Lanka
          </p>
        </div>

        <div className="footer-col">
          <h4>Product</h4>
          <ul>
            <li><HashLink smooth to="/#roofing-products">Roofing Products</HashLink></li>
            <li><HashLink smooth to="/#top-selling-products">Top Selling Products</HashLink></li>
            <li><HashLink smooth to="/#accessories-products">Accessories Products</HashLink></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><HashLink smooth to="/#about">About us</HashLink></li>
            <li><HashLink smooth to="/#about">Careers</HashLink></li>
            <li><HashLink smooth to="/#showrooms">Help Center</HashLink></li>
            <li><HashLink smooth to="/#showrooms">Showrooms</HashLink></li>
          </ul>
        </div>

        <div className="footer-col" id="contact">
          <h4>Need help</h4>
          <p>+94 77 255 0770</p>
          <p>Monday – Friday: 9:00AM – 5:00PM</p>
          <p>Saturday: 9:00AM – 1:00PM</p>
          <p><a href="mailto:info@toproofsolutions.lk">Info@toproofsolutions.lk</a></p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-lang">
          <IoGlobeOutline />
          <span>English</span>
        </div>
        <div className="footer-copy">©2025 TopRoof Solutions</div>
        <div className="footer-socials">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
