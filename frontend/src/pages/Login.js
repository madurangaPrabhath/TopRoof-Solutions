import React from 'react';
import '../assets/styles/Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <h2>Login to TopRoof Solutions</h2>
      <form className="login-form">
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
