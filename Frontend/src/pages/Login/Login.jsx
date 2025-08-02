import React, { useState } from 'react';
import './Login.css';
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.text();

      if (result.includes('successful')) {
        localStorage.setItem('user', JSON.stringify({ email }));
        navigate('/feedback'); // or navigate('/') if you prefer redirecting to Home
      } else {
        setErrorMsg(result);
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMsg('An error occurred during login.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        {errorMsg && <p className="error-message">{errorMsg}</p>}
      </form>

      <div className="login-options">
        <NavLink to="/reset-password">Forgot Password?</NavLink>
        <span> | </span>
        <NavLink to="/signup">Sign Up</NavLink>
      </div>
    </div>
  );
};

export default Login;
