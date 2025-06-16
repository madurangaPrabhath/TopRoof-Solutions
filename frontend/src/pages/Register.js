import React from 'react';
import '../assets/styles/Register.css';
import Header from '../components/Header';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div>
      <Header />
      <div className="register-container">
        <h2>Create an Account</h2>
        <form className="register-form">
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email Address" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />
          <button type="submit">Register</button>
        </form>
        <div className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
      <NewsletterSection />
      <section id="contact">
        <Footer />
      </section>
    </div>
  );
};

export default Register;
