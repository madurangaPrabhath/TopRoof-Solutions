import React from 'react';
import '../assets/styles/Login.css';
import Header from '../components/Header';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';

const Login = () => {
  return (
    <div>
      <Header />
      <div className="login-container">
        <h2>Login to TopRoof Solutions</h2>
        <form className="login-form">
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
      <NewsletterSection />
      <section id="contact">
        <Footer />
      </section>
    </div>
  );
};

export default Login;
