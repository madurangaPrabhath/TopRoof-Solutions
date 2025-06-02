import React from 'react';
import '../assets/styles/AboutUs.css';
import aboutBackground from '../assets/images/about.jpg';

const AboutSection = () => {
  return (
    <section
      className="about-section"
      style={{ backgroundImage: `url(${aboutBackground})` }}
    >
      <div className="about-overlay">
        <div className="about-wrapper">
          <h2>About Us</h2>
          <p>
            At <strong>TopRoof Solutions</strong>, we are dedicated to transforming the way roofing materials are distributed and accessed across Sri Lanka. As the country's trusted online platform for gutters, roofing sheets, downspouts, and related construction accessories, our mission is simple: make high-quality roofing products available to everyone, everywhere.
          </p>

          <h3>Who We Are</h3>
          <p>
            TopRoof Solutions was founded with a vision to modernize the roofing industry in Sri Lanka. We recognized a common challenge faced by contractors, homeowners, and builders — limited access to a wide variety of roofing products in one place. That's why we created this platform to bring convenience, variety, and reliability to your roofing supply needs.
          </p>

          <h3>What We Offer</h3>
          <p>
            At TopRoof Solutions, we provide a convenient online platform for purchasing high-quality gutters, roofing sheets, and accessories across Sri Lanka. With a wide product range, secure payments, reliable delivery, and expert support, we make it easy for homeowners and contractors to find everything they need in one place.
          </p>
          <p>
            Our mission is to simplify roofing material distribution through technology, quality, and exceptional service.
          </p>

          <h3>Our Vision</h3>
          <p>
            To be Sri Lanka's leading online destination for roofing and gutter products, empowering construction professionals and homeowners through accessibility, technology, and service excellence.
          </p>

          <p><strong>Join the TopRoof community today</strong> and experience a smarter way to shop for roofing materials. Whether you're building your dream home or managing a construction project, we're here to support you every step of the way.</p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
