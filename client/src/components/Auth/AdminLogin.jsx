import React, { useState } from "react";
import axios from "axios";
import "./AdminLogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });
      localStorage.setItem("adminToken", response.data.token);
      setMessage("✅ Login successful!");
      setIsSuccess(true);
      setTimeout(() => (window.location.href = "/admin/dashboard"), 1200);
    } catch (error) {
      setIsSuccess(false);
      setMessage(error.response?.data?.message || "❌ Login failed");
    }
  };

  return (
    <div className="admin-login-container">
      <form onSubmit={handleSubmit} className="admin-login-box">
        <h2 className="admin-login-title">Admin Login</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="admin-input"
          required
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="admin-input"
          required
        />

        <button type="submit" className="admin-login-btn">
          Login
        </button>

        {message && (
          <p
            className={`admin-message ${
              isSuccess ? "success" : "error"
            }`}
          >
            {message}
          </p>
        )}

        <div className="admin-footer">
          <p>© {new Date().getFullYear()} PetCare Admin Portal</p>
        </div>
      </form>
    </div>
  );
}

export default AdminLogin;
