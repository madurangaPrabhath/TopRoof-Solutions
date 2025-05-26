import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-section">
                    <h3>TopRoof Solutions</h3>
                    <p>Your trusted roofing materials supplier in Sri Lanka since 2010.</p>
                    <div className="social-links">
                        <a href="#"><FaFacebook /></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaTwitter /></a>
                    </div>
                </div>
                
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/products">Products</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>
                
                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <ul className="contact-info">
                        <li><FaMapMarkerAlt /> 123 Roofing St, Colombo, Sri Lanka</li>
                        <li><FaPhone /> +94 112 345 678</li>
                        <li><FaEnvelope /> info@toproof.lk</li>
                    </ul>
                </div>
            </div>
            
            <div className="copyright">
                <p>&copy; {new Date().getFullYear()} TopRoof Solutions. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;