import React from 'react';
import '../assets/styles/NewsletterSection.css';
import { FaArrowRight } from 'react-icons/fa';

const NewsletterSection = () => {
  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <h2 className="newsletter-heading">
          Join us and get a discount for your first order
        </h2>
        <a href="/products" className="try-button">
          TRY NOW <FaArrowRight />
        </a>
      </div>
    </section>
  );
};

export default NewsletterSection;
