import React, { useState, useEffect } from 'react';
import { Button, TextField, List, ListItem, ListItemText, Divider, Typography, Grid, Snackbar } from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import axios from 'axios';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Fetch categories from the server when the component is mounted
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setSnackbarMessage('Failed to fetch categories');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    };

    fetchCategories();
  }, []);

  // Handle adding a new category
  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      try {
        const response = await axios.post('http://localhost:5000/categories', {
          name: newCategory,
        });

        setCategories([...categories, response.data]);
        setNewCategory('');
        setSnackbarMessage('Category added successfully');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      } catch (error) {
        console.error('Error adding category:', error);
        setSnackbarMessage('Failed to add category');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    } else {
      setSnackbarMessage('Category name cannot be empty');
      setSnackbarSeverity('warning');
      setOpenSnackbar(true);
    }
  };

  // Handle deleting a category
  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/categories/${id}`);
      setCategories(categories.filter((category) => category.id !== id));
      setSnackbarMessage('Category deleted successfully');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error deleting category:', error);
      setSnackbarMessage('Failed to delete category');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
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
      setSnackbarMessage('Category updated successfully');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error editing category:', error);
      setSnackbarMessage('Failed to update category');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
        Manage Categories
      </Typography>

      {/* Add new category form */}
      <Grid container spacing={2} alignItems="center" style={{ marginBottom: '20px' }}>
        <Grid item xs={8}>
          <TextField
            label="New Category"
            variant="outlined"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAddCategory}
            fullWidth
            sx={{ height: '100%' }}
          >
            Add Category
          </Button>
        </Grid>
      </Grid>

      {/* Categories list */}
      <List>
        {categories.map((category) => (
          <div key={category.id}>
            <ListItem>
              <ListItemText primary={category.name} />
              <Button
                startIcon={<Edit />}
                onClick={() => {
                  const newName = prompt('Enter new category name:', category.name);
                  if (newName && newName.trim()) handleEditCategory(category.id, newName);
                }}
                size="small"
                sx={{
                  marginRight: '10px',
                  '&:hover': {
                    backgroundColor: '#f0f0f0', // Change to a light background color on hover
                    transform: 'scale(0.95)', // Slightly shrink the button on hover
                    transition: 'transform 0.3s ease, background-color 0.3s ease', // Smooth transition
                  },
                }}
              >
                Edit
              </Button>
              <Button
                startIcon={<Delete />}
                onClick={() => handleDeleteCategory(category.id)}
                color="error"
                size="small"
                sx={{
                  '&:hover': {
                    backgroundColor: '#f44336', // Stronger red for hover effect
                    color: '#fff', // Text color changes on hover
                    transform: 'scale(1.05)', // Slightly enlarge the button
                    transition: 'transform 0.3s ease, background-color 0.3s ease', // Smooth transition
                  },
                }}
              >
                Delete
              </Button>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>

      {/* Snackbar for feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </div>
  );
};

export default ManageCategories;
