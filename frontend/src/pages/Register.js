import React, { useState } from 'react';
import '../assets/styles/Register.css';
import Header from '../components/Header';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Passwords do not match.");
      return;
    }

    const response = await fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const result = await response.text();
    alert(result);
  };

  return (
    <div>
      <Header />
      <div className="register-container">
        <h2>Create an Account</h2>
        <form className="register-form" onSubmit={handleRegister}>
          <input type="text" placeholder="Full Name" required disabled />
          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
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
