// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Holds the user state
  const [loading, setLoading] = useState(true); // Loading state for async operations

  // Function to check if the user is authenticated from localStorage
  const loadUserFromLocalStorage = () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    }
    setLoading(false); // Done loading, so set loading to false
  };

  useEffect(() => {
    loadUserFromLocalStorage(); // Try to load user from localStorage when the app starts
  }, []);

  const setUserAndPersist = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Persist user data to localStorage
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove user data from localStorage
  };

  return (
    <UserContext.Provider value={{ user, setUser: setUserAndPersist, clearUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
