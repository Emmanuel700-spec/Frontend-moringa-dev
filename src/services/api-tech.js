import axios from 'axios';

const apiUrl = 'http://localhost:5000'; // Your mock API URL

// Admin functionalities

// Add a new user (Admin)
export const addUser = async (newUser) => {
  try {
    const response = await axios.post(`${apiUrl}/users`, newUser);
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

// Flag or remove content (Admin)
export const flagContent = async (contentId) => {
  try {
    const response = await axios.patch(`${apiUrl}/content/${contentId}`, { flagged: true });
    return response.data;
  } catch (error) {
    console.error('Error flagging content:', error);
  }
};

// Approve content for public publishing (Admin)
export const approveContent = async (contentId) => {
  try {
    const response = await axios.patch(`${apiUrl}/content/${contentId}`, { approved: true });
    return response.data;
  } catch (error) {
    console.error('Error approving content:', error);
  }
};

// Deactivate a user (Admin)
export const deactivateUser = async (userId) => {
  try {
    const response = await axios.patch(`${apiUrl}/users/${userId}`, { active: false });
    return response.data;
  } catch (error) {
    console.error('Error deactivating user:', error);
  }
};

// Create a content category (Admin)
export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(`${apiUrl}/categories`, categoryData);
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
  }
};

// Remove a category (Admin)
export const removeCategory = async (categoryId) => {
  try {
    const response = await axios.delete(`${apiUrl}/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing category:', error);
  }
};

// Get all categories (Admin)
export const getCategories = async () => {
  try {
    const response = await axios.get(`${apiUrl}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

// Tech Writer functionalities

// Create a tech writer profile
export const createProfile = async (profileData) => {
  try {
    const response = await axios.post(`${apiUrl}/profiles`, profileData);
    return response.data;
  } catch (error) {
    console.error('Error creating profile:', error);
  }
};

// Create a category (Tech Writer)
export const createTechCategory = async (categoryData) => {
  try {
    const response = await axios.post(`${apiUrl}/categories`, categoryData);
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
  }
};

// Post new content (Tech Writer)
export const postContent = async (contentData) => {
  try {
    const response = await axios.post(`${apiUrl}/content`, contentData);
    return response.data;
  } catch (error) {
    console.error('Error posting content:', error);
  }
};

// Edit existing content (Tech Writer)
export const editContent = async (contentId, updatedContent) => {
  try {
    const response = await axios.put(`${apiUrl}/content/${contentId}`, updatedContent);
    return response.data;
  } catch (error) {
    console.error('Error editing content:', error);
  }
};

// Approve content for public publishing (Tech Writer)
export const approveTechContent = async (contentId) => {
  try {
    const response = await axios.patch(`${apiUrl}/content/${contentId}`, { approved: true });
    return response.data;
  } catch (error) {
    console.error('Error approving content:', error);
  }
};

// Flag content (Tech Writer)
export const flagTechContent = async (contentId) => {
  try {
    const response = await axios.patch(`${apiUrl}/content/${contentId}`, { flagged: true });
    return response.data;
  } catch (error) {
    console.error('Error flagging content:', error);
  }
};

// Like/Dislike content (Tech Writer, User)
export const likeDislikeContent = async (contentId, action) => {
  try {
    const response = await axios.patch(`${apiUrl}/content/${contentId}/like-dislike`, { action });
    return response.data;
  } catch (error) {
    console.error('Error liking/disliking content:', error);
  }
};

// Comment on content (User)
export const commentOnContent = async (contentId, commentData) => {
  try {
    const response = await axios.post(`${apiUrl}/content/${contentId}/comments`, commentData);
    return response.data;
  } catch (error) {
    console.error('Error posting comment:', error);
  }
};

// Get all comments for a content (User)
export const getComments = async (contentId) => {
  try {
    const response = await axios.get(`${apiUrl}/content/${contentId}/comments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};

// User functionalities

// Create user profile
export const createUserProfile = async (profileData) => {
  try {
    const response = await axios.post(`${apiUrl}/users`, profileData);
    return response.data;
  } catch (error) {
    console.error('Error creating user profile:', error);
  }
};

// Subscribe to categories (User)
export const subscribeToCategory = async (userId, categoryId) => {
  try {
    const response = await axios.post(`${apiUrl}/users/${userId}/subscriptions`, { categoryId });
    return response.data;
  } catch (error) {
    console.error('Error subscribing to category:', error);
  }
};

// Get content by category (User)
export const getContentByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${apiUrl}/content/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching content by category:', error);
  }
};

// Add content to wishlist (User)
export const addToWishlist = async (userId, contentId) => {
  try {
    const response = await axios.post(`${apiUrl}/users/${userId}/wishlist`, { contentId });
    return response.data;
  } catch (error) {
    console.error('Error adding to wishlist:', error);
  }
};

// Get recommendations based on user interests (User)
export const getRecommendations = async (userId) => {
  try {
    const response = await axios.get(`${apiUrl}/users/${userId}/recommendations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
  }
};

// Get notifications for new content (User)
export const getNotifications = async (userId) => {
  try {
    const response = await axios.get(`${apiUrl}/users/${userId}/notifications`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
  }
};

// Get all users (Admin)
export const getUsers = async () => {
  try {
    const response = await axios.get(`${apiUrl}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

// Get content (Admin or Tech Writer)
export const getContent = async () => {
  try {
    const response = await axios.get(`${apiUrl}/content`);
    return response.data;
  } catch (error) {
    console.error('Error fetching content:', error);
  }
};
