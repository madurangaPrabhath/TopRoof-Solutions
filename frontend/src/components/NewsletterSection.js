import React from 'react';
//import '../assets/styles/NewsletterSection.css';
import { FaArrowRight } from 'react-icons/fa';

const NewsletterSection = () => {
  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <h2 className="newsletter-heading">
          Join our newsletter and get a discount for your first order
        </h2>
        <button className="try-button">
          Try <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default NewsletterSection;
