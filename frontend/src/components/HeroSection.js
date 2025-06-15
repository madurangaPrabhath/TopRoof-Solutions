import React from 'react';
import '../assets/styles/HeroSection.css';

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-text">
        <h1>
          WELCOME TO<br />
          <span>TopRoof Solutions</span>
        </h1>
        <p>
          Your one-stop online shop for premium gutters, roofing sheets, and construction
          accessories in Sri Lanka. Explore a wide range of high-quality roofing products, all at
          your fingertips. Easy shopping, secure payment, and fast delivery — making your roofing
          projects simpler and more efficient.
          <br />Start shopping now!
        </p>
        <a href="/products" className="cta-button">Start shopping now!</a>
      </div>
      <div className="hero-image">
        <img src="/assets/hero-image.png" alt="Roof Design" />
      </div>
    </section>
  );
}

export default HeroSection;
