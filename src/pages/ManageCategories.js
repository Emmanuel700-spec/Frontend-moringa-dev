import React, { useState, useEffect } from 'react';
import { Button, TextField, List, ListItem, ListItemText, Divider, Typography } from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import axios from 'axios';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  // Fetch categories from the server when the component is mounted
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);  // Runs only once when the component mounts

  // Handle adding a new category
  const handleAddCategory = async () => {
    if (newCategory) {
      try {
        const response = await axios.post('http://localhost:5000/admin-categories', {
          name: newCategory,
        });

        setCategories([...categories, response.data]);
        setNewCategory('');
      } catch (error) {
        console.error('Error adding category:', error);
      }
    }
  };

  // Handle deleting a category
  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/categories/${id}`);
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // Handle editing a category
  const handleEditCategory = async (id, newName) => {
    try {
      const response = await axios.put(`http://localhost:5000/categories/${id}`, {
        name: newName,
      });
      setCategories(
        categories.map((category) =>
          category.id === id ? { ...category, name: response.data.name } : category
        )
      );
    } catch (error) {
      console.error('Error editing category:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
        Manage Categories
      </Typography>

      {/* Add new category form */}
      <div style={{ marginBottom: '20px' }}>
        <TextField
          label="New Category"
          variant="outlined"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleAddCategory}
          style={{ marginTop: '10px' }}
        >
          Add Category
        </Button>
      </div>

      {/* Categories list with scrollbar */}
      <div
        style={{
          maxHeight: '400px', // Set a maximum height for the list container
          overflowY: 'auto',  // Enable vertical scrolling
          marginBottom: '20px',
        }}
      >
        <List>
          {categories.map((category) => (
            <div key={category.id}>
              <ListItem>
                <ListItemText primary={category.name} />
                <Button
                  startIcon={<Edit />}
                  onClick={() => {
                    const newName = prompt('Enter new category name:', category.name);
                    if (newName) handleEditCategory(category.id, newName);
                  }}
                >
                  Edit
                </Button>
                <Button
                  startIcon={<Delete />}
                  onClick={() => handleDeleteCategory(category.id)}
                  color="error"
                >
                  Delete
                </Button>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </div>
    </div>
  );
};

export default ManageCategories;
