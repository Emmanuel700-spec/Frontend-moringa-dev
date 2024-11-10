import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Ensure this file exists
import { Circles } from 'react-loader-spinner'; // Import a loading spinner

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // For showing loading state
  const navigate = useNavigate();

  // Check if user is already logged in (persisted from localStorage)
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    const role = localStorage.getItem('role');
    
    if (token && userName && role) {
      // Redirect based on role if the user is already logged in
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else if (role === 'tech_writer') {
        navigate('/tech_writer/dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true); // Start loading state

    try {
      // Fetch users from the mock API
      const response = await fetch('http://localhost:5000/users');

      // Check if the response is valid
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const users = await response.json();

      // Find the user that matches the email and password
      const user = users.find((user) => user.email === email && user.password === password);

      if (user) {
        // Simulate a token generation (normally you would generate a real token here)
        const token = 'sample-jwt-token'; // Simulated token for now

        // Store user details in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('role', user.role);
        localStorage.setItem('userName', user.name); // Store user's name for the Navbar

        // Introduce a delay of 4-5 seconds before navigating to the dashboard
        setTimeout(() => {
          // Clear form and redirect after the delay
          setEmail('');  // Clear email
          setPassword('');  // Clear password

          // Redirect based on user role
          if (user.role === 'admin') {
            navigate('/admin/dashboard');
          } else if (user.role === 'tech_writer') {
            navigate('/tech_writer/dashboard');
          } else {
            navigate('/dashboard');
          }
        }, 4000); // 4 seconds delay
      } else {
        throw new Error('Invalid email or password.');
      }
    } catch (error) {
      // Handle different error cases
      if (error.message === 'Failed to fetch users') {
        setError('Unable to reach the server. Please try again later.');
      } else {
        setError(error.message || 'An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>

      {/* Display error message if there is any */}
      {error && <p className="error" aria-live="assertive">{error}</p>}

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

        <button
          type="submit"
          className="login-btn"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? (
            <Circles height="20" width="20" color="#4fa94d" ariaLabel="loading" />
          ) : (
            <span>Login</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
