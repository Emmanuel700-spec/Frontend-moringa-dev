import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import Footer from './Footer';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);  // State for toggling visibility
  const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);  // State for repeat password visibility
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleRepeatPasswordVisibility = () => {
    setRepeatPasswordVisible(!repeatPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setError('Passwords do not match');
      return;
    }

    const userData = { name, email, password, role };

    // Send data to the backend (JSON Server)
    const response = await fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      setSuccess('User signed up successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
    } else {
      setError('Error signing up user. Please try again later.');
    }
  };

  return (
    <>
      <div className="signup-container">
        <div className="description-column">
          <h2>Join Moringa School’s Tech Community</h2>
          <p>
            Join Moringa School’s software engineering program, offering hands-on learning, mentorship, and access to top industry tools.
          </p>
          <ul>
            <li>Real-world curriculum</li>
            <li>Industry mentorship</li>
            <li>Tech-driven community</li>
            <li>Advanced resources</li>
          </ul>
        </div>

        <div className="form-column">
          <h2>Sign Up</h2>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="input-group">
              <label htmlFor="name">Full Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password:</label>
              <div className="password-container">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                />
                <span className="eye-icon" onClick={togglePasswordVisibility}>
                  👁️
                </span>
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="repeatPassword">Repeat Password:</label>
              <div className="password-container">
                <input
                  type={repeatPasswordVisible ? 'text' : 'password'}
                  id="repeatPassword"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  required
                />
                <span className="eye-icon" onClick={toggleRepeatPasswordVisibility}>
                  👁️
                </span>
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="role">Select Role:</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="user">User</option>
                <option value="techwriter">Tech Writer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit">Sign Up</button>
          </form>
          <div className="login-link">
            <p>Already have an account? <a href="/login">Login</a></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
