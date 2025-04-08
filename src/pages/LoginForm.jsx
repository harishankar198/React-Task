// src/pages/LoginForm.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";
import { loginUser } from "../lib/api";
import { LOGIN_PAYLOAD_STATIC } from "../lib/constants";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const credentials = {
      username,
      password,
      ...LOGIN_PAYLOAD_STATIC,
    };

    const result = await loginUser(credentials);

    if (result.success && result.data.access_token) {
      localStorage.setItem("token", result.data.access_token);
      localStorage.setItem(
        "patientProfile",
        JSON.stringify(result.data.PatientProfile)
      );
      navigate("/doctor");
    } else {
      setError(result.msg || "Login failed");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="image-box1">
        <div className="image-box">
          <img src="/assets/login-image.png" alt="img" />
          <p>
            Instapract
            <br /> User Centric <br />
            Teleconsulting,
            <br />
            Expert Opinion
            <br /> Platform.
          </p>
        </div>
      </div>

      <div className="login-box">
        <form onSubmit={handleLogin} className="login-form">
          <div className="Form-title">
            <h2>
              <span>Insta</span>pract
            </h2>
            <h5>HealthTech IT Solution</h5>
          </div>
          <h2 className="login-title">Login</h2>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;




















