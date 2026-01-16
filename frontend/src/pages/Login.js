import React, { useState, useEffect } from "react";
import "../assets/styles/Login.css";
import Header from "../components/Header";
import NewsletterSection from "../components/NewsletterSection";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        // Redirect to appropriate dashboard
        if (user.role === "ADMIN") {
          navigate("/admin-dashboard");
        } else {
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
    }
  }, [navigate]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const result = await response.json();

        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("userEmail", email);

        // Redirect based on user role
        if (result.user.role === "ADMIN") {
          navigate("/admin-dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        const result = await response.json();

        // Handle validation errors from backend
        if (result.errors) {
          setErrors(result.errors);
        } else {
          setErrors({ general: result.message || "Invalid email or password" });
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ general: "Login failed! Please check your connection." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="login-container">
        <h2>Login to TopRoof Solutions</h2>
        {errors.general && (
          <div
            className="error-message"
            style={{ color: "red", marginBottom: "10px" }}
          >
            {errors.general}
          </div>
        )}
        <form className="login-form" onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              style={{ borderColor: errors.email ? "red" : "" }}
            />
            {errors.email && (
              <div
                className="error-text"
                style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
              >
                {errors.email}
              </div>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password)
                  setErrors({ ...errors, password: undefined });
              }}
              style={{ borderColor: errors.password ? "red" : "" }}
            />
            {errors.password && (
              <div
                className="error-text"
                style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
              >
                {errors.password}
              </div>
            )}
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="register-link">
          Not registered? <Link to="/register">Register here</Link>
        </p>
      </div>
      <NewsletterSection />
      <section id="contact">
        <Footer />
      </section>
    </div>
  );
};

export default Login;
