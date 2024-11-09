import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { login as loginService } from '../services/AuthService';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await loginService({ email, password });

      if (response.token) {
        // Store the token
        localStorage.setItem('token', response.token);

        // Update the global auth state
        login(response.token);

        // Log response for debugging
        console.log("User type:", response.userType);

        // Check user type and redirect accordingly
        if (response.userType === 'Admin' || email.endsWith('@admin.moringaschool.com')) {
          // Redirect to the specified admin dashboard URL
          navigate('/admin/dashboard');
        } else if (response.userType === 'Tech Writer') {
          // Redirect to the Tech Writer homepage
          navigate('/techwriter/home'); // Updated to use navigate instead of window.location.href
        } else {
          // Redirect to regular user dashboard
          navigate('/');
        }

        alert('Login successful!');
      } else {
        throw new Error('Token missing from response');
      }
    } catch (error) {
      setError(error.message || 'An unexpected error occurred');
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="forgot-password">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
      <div className="register-link">
        <p>Don’t have an account? <Link to="/signup">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
