import React from 'react';
import { useAuth } from '../context/AuthContext';

const TechWriter = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'tech_writer') {
    return <div>You must be a tech writer to access this panel.</div>;
  }

  return (
    <div>
      <h2>Tech Writer Panel</h2>
      <p>Welcome, {user.name}!</p>
      <p>Your role is: {user.role}</p>
      <p>Here you can access tech writing tasks.</p>
    </div>
  );
};

export default TechWriter;
