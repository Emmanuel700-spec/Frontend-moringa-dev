import React, { useEffect, useState } from 'react';
import { deleteUser } from '../services/AuthService';




const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      // Optimistically update UI
      setUsers(users.filter(user => user.id !== id));
      alert("User deleted successfully");
    } catch (error) {
      setError("Error deleting user");
    }
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.role})
            {user.role !== "admin" && (
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
