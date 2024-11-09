import React, { useState } from 'react';
import { register as registerService } from '../services/AuthService';
import './Auth.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');

  const handleRoleChange = (e) => setRole(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    try {
      const userData = { email, password, role };
      await registerService(userData);
      alert('Registration successful!');
    } catch (error) {
      setError(error.message || 'An unexpected error occurred');
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <select value={role} onChange={handleRoleChange}>
          <option value="admin">Admin</option>
          <option value="tech_writer">Tech Writer</option>
          <option value="user">User</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
