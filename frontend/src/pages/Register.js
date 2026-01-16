import React, { useState, useEffect } from "react";
import "../assets/styles/Register.css";
import Header from "../components/Header";
import NewsletterSection from "../components/NewsletterSection";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
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

  const validatePassword = (password) => {
    return password.length >= 6;
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
    } else if (!validatePassword(password)) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (!confirm) {
      newErrors.confirm = "Please confirm your password";
    } else if (password !== confirm) {
      newErrors.confirm = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message || "Registration successful!");
        navigate("/login");
      } else {
        // Handle validation errors from backend
        if (result.errors) {
          setErrors(result.errors);
        } else {
          setErrors({
            general: result.message || "Registration failed. Please try again.",
          });
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ general: "An error occurred. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="register-container">
        <h2>Create an Account</h2>
        {errors.general && (
          <div
            className="error-message"
            style={{ color: "red", marginBottom: "10px" }}
          >
            {errors.general}
          </div>
        )}
        <form className="register-form" onSubmit={handleRegister}>
          <input type="text" placeholder="Full Name" disabled />
          <div>
            <input
              type="email"
              placeholder="Email Address"
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
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value);
                if (errors.confirm)
                  setErrors({ ...errors, confirm: undefined });
              }}
              style={{ borderColor: errors.confirm ? "red" : "" }}
            />
            {errors.confirm && (
              <div
                className="error-text"
                style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
              >
                {errors.confirm}
              </div>
            )}
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
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
