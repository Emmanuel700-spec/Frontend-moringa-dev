import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a Context for the user data
const UserContext = createContext();

// Provider component to wrap around your app
export const UserProvider = ({ children }) => {
  // Initialize user state (role, profile data, and authentication status)
  const [user, setUser] = useState(null); // This will hold the entire user object
  const [userRole, setUserRole] = useState('TechWriter'); // Default role, can be dynamic
  const [isAuthenticated, setIsAuthenticated] = useState(false); // To track authentication state

  // Mock API call to fetch user data (can be replaced with actual API call or localStorage)
  useEffect(() => {
    const fetchedUser = JSON.parse(localStorage.getItem('userData')) || null;
    if (fetchedUser) {
      setUser(fetchedUser);
      setUserRole(fetchedUser.role);
      setIsAuthenticated(true);
    }
  }, []);

  // Function to login a user
  const login = (userData) => {
    setUser(userData);
    setUserRole(userData.role);
    setIsAuthenticated(true);
    localStorage.setItem('userData', JSON.stringify(userData)); // Store in localStorage
  };

  // Function to logout the user
  const logout = () => {
    setUser(null);
    setUserRole('TechWriter');
    setIsAuthenticated(false);
    localStorage.removeItem('userData'); // Clear user data from localStorage
  };

  // Function to update user profile (e.g., after editing)
  const updateUserProfile = (updatedUserData) => {
    setUser(updatedUserData);
    setUserRole(updatedUserData.role);
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
  };

  return (
    <UserContext.Provider value={{ user, userRole, isAuthenticated, login, logout, updateUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = () => {
  return useContext(UserContext);
};
