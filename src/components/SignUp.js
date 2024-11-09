import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'User',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateEmailDomain = () => {
    const { email, userType } = form;
    if (email && !validateEmail(email)) {
      return 'Please enter a valid email address';
    }
    if (userType === 'Admin' && !email.endsWith('@admin.moringaschool.com')) {
      return 'Please ensure your email address is for an admin account.';
    }
    if (userType === 'Tech Writer' && !email.endsWith('@techwriter.moringaschool.com')) {
      return 'Please ensure your email address is for a tech writer account.';
    }
    if (userType === 'User' && !email.endsWith('@gmail.com')) {
      return 'Please ensure your email address is for a user account.';
    }
    return '';
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Your name is missing';
    if (!form.email) {
      newErrors.email = 'Your e-mail is missing';
    } else {
      const domainError = validateEmailDomain();
      if (domainError) newErrors.email = domainError;
    }
    if (!form.password) newErrors.password = 'Your password is missing';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'The passwords do not match';
    return newErrors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          user_type: form.userType, 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(loginSuccess(data));

        // Redirect to the login page
        navigate('/login');
      } else {
        setErrors({ server: data.msg || 'Registration failed. Please try again.' });
      }
    } catch (error) {
      console.error('Registration failed', error);
      setErrors({ server: 'An error occurred. Please try again later.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page max-w-7xl mx-auto grid grid-cols-2 gap-4">
      <div className="main-left">
        <div className="p-12 bg-white border border-gray-200 rounded-lg">
          <h1 className="mb-6 text-2xl">Sign up</h1>
          <p className="mb-6 text-gray-500">
            Join our community and get access to exclusive resources, articles, and guidance from experts in the tech industry.
          </p>
          <p className="font-bold">
            Already have an account? <a href="/login" className="underline">Click here</a> to log in!
          </p>
        </div>
      </div>

      <div className="main-right">
        <div className="p-12 bg-white border border-gray-200 rounded-lg">
          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label>Name</label><br />
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                className="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
                required
              />
              {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
            </div>

            <div>
              <label>E-mail</label><br />
              <input
                type="email"
                name="email"
                placeholder="Your e-mail address"
                value={form.email}
                onChange={handleChange}
                className="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
                required
              />
              {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
            </div>

            <div>
              <label>Password</label><br />
              <input
                type="password"
                name="password"
                placeholder="Your password"
                value={form.password}
                onChange={handleChange}
                className="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
                required
              />
              {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
            </div>

            <div>
              <label>Repeat password</label><br />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Repeat your password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
                required
              />
              {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword}</p>}
            </div>

            <div>
              <label>User Type</label><br />
              <select
                name="userType"
                value={form.userType}
                onChange={handleChange}
                className="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
                <option value="Tech Writer">Tech Writer</option>
              </select>
            </div>

            {errors.server && (
              <div className="bg-red-300 text-white rounded-lg p-6 mt-4">
                <p>{errors.server}</p>
              </div>
            )}

            <div>
              <button className="py-4 px-6 bg-purple-600 text-white rounded-lg w-full" disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Sign up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
