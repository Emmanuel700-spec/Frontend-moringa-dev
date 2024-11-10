import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, Button, Grid, Paper, CircularProgress, Snackbar, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip } from '@mui/material';
import { getUsers, deactivateUser, addUser, activateUser } from '../services/api'; // Import the activateUser function

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionSuccess, setActionSuccess] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '', status: 'pending' });
  const [openDialog, setOpenDialog] = useState(false);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers();
        // Ensure each user has a default status if missing
        const usersWithStatus = fetchedUsers.map(user => ({
          ...user,
          status: user.status || 'pending', // Default to 'pending' if no status exists
        }));
        setUsers(usersWithStatus);
      } catch (err) {
        setError('Error fetching users. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle Activate/Deactivate user logic
  const handleToggleUserStatus = async (userId, currentStatus) => {
    setLoading(true);
    try {
      let response;
      if (currentStatus === 'pending' || currentStatus === 'deactivated') {
        response = await activateUser(userId); // Activate the user
      } else if (currentStatus === 'active') {
        response = await deactivateUser(userId); // Deactivate the user
      }

      if (response) {
        setUsers(users.map(user =>
          user.id === userId ? { ...user, status: currentStatus === 'active' ? 'deactivated' : 'active' } : user
        ));
        setActionSuccess(true);
      }
    } catch (err) {
      setError('Error updating user status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle adding a new user
  const handleAddUser = async () => {
    setLoading(true);
    try {
      const userWithStatus = { ...newUser, status: 'pending' }; // New user starts with "pending" status
      const response = await addUser(userWithStatus);
      if (response) {
        setUsers([...users, response]); // Add the newly created user to the list
        setOpenDialog(false); // Close the dialog
        setNewUser({ name: '', email: '', role: '', status: 'pending' }); // Reset form
      }
    } catch (err) {
      setError('Error adding user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div className="page-content" style={{ flexGrow: 1, padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <Typography variant="h4" gutterBottom align="center">
          Manage Users
        </Typography>

        {/* Error Snackbar */}
        <Snackbar
          open={!!error}
          message={error}
          onClose={() => setError('')}
          autoHideDuration={4000}
          severity="error"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />

        {/* Success Snackbar */}
        <Snackbar
          open={actionSuccess}
          message="User status updated successfully"
          onClose={() => setActionSuccess(false)}
          autoHideDuration={4000}
          severity="success"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenDialog(true)}
          style={{ marginBottom: '20px', fontWeight: 'bold' }}
          fullWidth
        >
          Add New User
        </Button>

        {/* Add User Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
          <DialogTitle>Add New User</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              fullWidth
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              margin="normal"
            />
            <TextField
              label="Email"
              fullWidth
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              margin="normal"
            />
            <TextField
              label="Role"
              fullWidth
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleAddUser} color="primary">
              Add User
            </Button>
          </DialogActions>
        </Dialog>

        {loading ? (
          <div style={{ textAlign: 'center' }}>
            <CircularProgress />
          </div>
        ) : (
          <div style={{ maxHeight: '500px', overflowY: 'auto', paddingBottom: '20px' }}>
            <Grid container spacing={3}>
              {users.map((user) => (
                <Grid item xs={12} sm={6} md={4} key={user.id}>
                  <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '200px' }}>
                    <Card style={{ width: '100%' }}>
                      <CardContent>
                        <Typography variant="h6" color="primary" gutterBottom align="center">
                          {user.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" align="center">
                          {user.email}
                        </Typography>

                        {/* Safely display user status with the updated code */}
                        <Typography variant="body2" color={user.status === 'active' ? 'green' : user.status === 'pending' ? 'orange' : 'red'} gutterBottom align="center">
                          {user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : 'Unknown Status'}
                        </Typography>

                        <Tooltip title={`Click to ${user.status === 'active' ? 'deactivate' : 'activate'} this user`}>
                          <Button
                            variant="contained"
                            color={user.status === 'active' ? 'secondary' : 'primary'}
                            onClick={() => handleToggleUserStatus(user.id, user.status)}
                            disabled={loading}
                            fullWidth
                          >
                            {user.status === 'active' ? 'Deactivate' : 'Activate'}
                          </Button>
                        </Tooltip>
                      </CardContent>
                    </Card>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
