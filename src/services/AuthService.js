// AuthService.js
const API_URL = 'http://localhost:5000/users';

// Register a new user (unchanged)
export const register = async (userData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Registration failed' }));
      throw new Error(errorData.message || 'Registration failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Registration Error:', error.message);
    throw error;
  }
};

// Log in a user (modified for JSON Server)
export const login = async ({ email, password }) => {
  try {
    const response = await fetch(`${API_URL}?email=${email}&password=${password}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const users = await response.json();

    if (users.length > 0) {
      // Assuming the first match is the logged-in user
      const user = users[0];
      return {
        token: `mock-token-${user.id}`,  // Generate a mock token
        userType: user.userType,  // Admin, User, Tech Writer, etc.
      };
    } else {
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    console.error('Login Error:', error.message);
    throw new Error(error.message || 'An error occurred during login');
  }
};
