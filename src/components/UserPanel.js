import React from 'react';
import { useAuth } from '../context/AuthContext';

const UserPanel = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Please log in to view the user panel.</div>;
  }

  return (
    <div>
      <h2>User Panel</h2>
      <p>Welcome, {user.name}!</p>
      <p>Your role is: {user.role}</p>
    </div>
  );
};

export default UserPanel;
