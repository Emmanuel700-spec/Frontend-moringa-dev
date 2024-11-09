import React, { createContext, useContext, useState } from 'react';

// Create the context
const AuthContext = createContext();

// AuthProvider component to provide AuthContext to the application
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login function to set the token
  const login = (token) => {
    const userData = { token }; // Store only token or additional user data as needed
    setUser(userData);
  };

  // Logout function to clear the user data
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);

  // Check if context is available, throw an error if not
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
