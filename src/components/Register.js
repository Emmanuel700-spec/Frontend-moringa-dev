import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register as registerService } from '../services/AuthService';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateEmail = (email, role) => {
    // Set email domain rules based on role
    const domainRules = {
      admin: '@admin.moringaschool.com',
      user: '@gmail.com',
      tech_writer: '@techwriter.moringaschool.com',
    };

    const domain = domainRules[role];
    if (email && !email.endsWith(domain)) {
      return `Please use a valid email for your user type.`;
    }
    return '';
  };

  const validateForm = () => {
    const newErrors = {};
    const emailError = validateEmail(formData.email, formData.role);

    if (!formData.name) newErrors.name = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (emailError) newErrors.email = emailError;
    
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      const userData = { ...formData };
      await registerService(userData);

      setSuccessMessage('Registration successful! You can now log in.');
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user',
      });

      setTimeout(() => navigate('/login'), 2000); // Redirect to login page after 2 seconds
    } catch (error) {
      setErrorMessage(error.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="card">
        <div className="auth-left">
          <h2>Join Us Today</h2>
          <p>Sign up to gain access to our platform, connect with other professionals, and get started on your journey!</p>
          <ul>
            <li>Exclusive access to premium content</li>
            <li>Engage with a growing community</li>
            <li>Manage your profile and settings easily</li>
          </ul>
        </div>

        <div className="auth-right">
          <h2>Create an Account</h2>

          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <form onSubmit={handleSubmit} className="form-container">
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="input-field"
                required
              />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="input-field"
                required
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="input-field"
                required
              />
              {errors.password && <p className="error-text">{errors.password}</p>}
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="input-field"
                required
              />
              {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
            </div>

            <div className="input-group">
              <label htmlFor="role">User Type</label>
              <select
                name="role"
                id="role"
                value={formData.role}
                onChange={handleChange}
                className="input-field"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="tech_writer">Tech Writer</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-button" disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>

          <p className="text-center">
            Already have an account? <a href="/login" className="link">Login here</a>
          </p>
        </div>
      </div>

      <style jsx>{`
        .auth-container {
          display: flex;
          justify-content: center;
          padding: 40px;
        }

        .card {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          overflow: hidden;
          width: 100%;
          max-width: 1200px;
          background-color: #fff;
          padding: 30px;
        }

        .auth-left {
          flex: 1;
          max-width: 400px;
        }

        .auth-left h2 {
          font-size: 1.4rem;
          margin-bottom: 10px;
          color: #333;
        }

        .auth-left p {
          font-size: 0.9rem;
          color: #555;
          margin-bottom: 20px;
        }

        .auth-left ul {
          list-style-type: disc;
          margin-left: 20px;
          font-size: 0.9rem;
          color: #555;
        }

        .auth-left li {
          margin-bottom: 10px;
        }

        .auth-right {
          flex: 2;
          max-width: 600px;
        }

        .auth-right h2 {
          font-size: 1.6rem;
          text-align: center;
          margin-bottom: 20px;
        }

        .input-group {
          margin-bottom: 1.2rem;
        }

        .input-group label {
          font-size: 0.9rem;
          color: #333;
          margin-bottom: 0.5rem;
          display: block;
        }

        .input-field {
          width: 100%;
          padding: 0.8rem;
          font-size: 0.9rem;
          border: 1px solid #ddd;
          border-radius: 5px;
          margin-top: 0.5rem;
        }

        .error-text {
          color: red;
          font-size: 0.8rem;
          margin-top: 5px;
        }

        .submit-button {
          width: 100%;
          padding: 1rem;
          background-color: #4caf50;
          color: white;
          font-size: 1rem;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .submit-button:disabled {
          background-color: #ccc;
        }

        .text-center {
          text-align: center;
        }

        .link {
          color: #4caf50;
          text-decoration: none;
        }

        .link:hover {
          text-decoration: underline;
        }

        .success-message {
          color: green;
          font-size: 0.9rem;
          text-align: center;
          margin-bottom: 20px;
        }

        .error-message {
          color: red;
          font-size: 0.9rem;
          text-align: center;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default Register;
