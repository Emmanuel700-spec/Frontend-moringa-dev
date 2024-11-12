import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please fill in both email and password fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const users = await response.json();
      console.log("Fetched users:", users);

      const user = users.find((user) => user.email === email && user.password === password);

      if (user) {
        console.log("User found:", user);
        localStorage.setItem('token', 'user-token');
        localStorage.setItem('role', user.role);

        // Extract domain part of email for comparison
        const emailDomain = email.split('@')[1]?.trim().toLowerCase();
        const userRole = user.role.toLowerCase();

        // Define acceptable domains for roles
        const roleDomains = {
          admin: 'admin.moringaschool.com',
          techwriter: 'techwriter.moringaschool.com',
          user: 'gmail.com'
        };

        console.log("Extracted Domain:", emailDomain);
        console.log("User Role:", userRole);

        // Validate domain based on role
        if (roleDomains[userRole] === emailDomain) {
          switch (userRole) {
            case 'admin':
              navigate('/admin/dashboard');
              break;
            case 'techwriter':
              navigate('/techwriter/TechWriterHomePage');
              break;
            case 'user':
              navigate('/user/UserDashboard');
              break;
            default:
              setErrorMessage('Invalid role. Please try again.');
          }
        } else {
          setErrorMessage('Invalid email domain for the specified role. Please check and try again.');
        }
      } else {
        setErrorMessage('Invalid credentials. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while logging in. Please try again later.');
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="input-field"
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <div className="password-container">
              <input 
                type={showPassword ? "text" : "password"}
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="input-field"
                placeholder="Enter your password"
              />
              <span 
                className="eye-icon" 
                onClick={() => setShowPassword(!showPassword)} 
                style={{ cursor: 'pointer' }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="signup-link">
          <p>Don't have an account? <a href="/register" className="signup-link-text">Sign up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
