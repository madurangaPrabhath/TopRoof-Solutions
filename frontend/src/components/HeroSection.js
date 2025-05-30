import React from 'react';
import '../assets/styles/HeroSection.css';

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>WELCOME TO TopRoof Solutions</h1>
        <p>
          Your one-stop online shop for premium gutters, roofing sheets, and construction accessories in Sri Lanka. Explore a wide range of high-quality roofing products, all at your fingertips. Easy shopping, secure payment, and fast delivery - making your roofing projects simpler and more efficient.
          Start shopping now!</p>
        <button>Start shopping now</button>
      </div>
      <div className="hero-image">
        <img src="/assets/hero-image.png" alt="Roof Design" />
      </div>
    </section>
  );
}

export default HeroSection;
