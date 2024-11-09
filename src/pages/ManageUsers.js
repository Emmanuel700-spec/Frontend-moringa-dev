import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, Button, Grid, Paper, CircularProgress, Snackbar, Alert, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip } from '@mui/material';
import { getUsers, deactivateUser, activateUser, addUser } from '../services/api';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deactivationSuccess, setDeactivationSuccess] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '', status: 'pending' });
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (err) {
        setError('Error fetching users. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDeactivateUser = async (userId) => {
    setLoading(true);
    try {
      const response = await deactivateUser(userId);
      if (response) {
        setUsers(users.map(user =>
          user.id === userId ? { ...user, status: 'deactivated' } : user
        ));
        setDeactivationSuccess(true);
      }
    } catch (err) {
      setError('Error deactivating user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleActivateUser = async (userId) => {
    setLoading(true);
    try {
      const response = await activateUser(userId);
      if (response) {
        setUsers(users.map(user =>
          user.id === userId ? { ...user, status: 'active' } : user
        ));
      }
    } catch (err) {
      setError('Error activating user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    setLoading(true);
    try {
      const response = await addUser(newUser);
      if (response) {
        setUsers([...users, response]);
        setOpenDialog(false);
        setNewUser({ name: '', email: '', role: '', status: 'pending' });
      }
    } catch (err) {
      setError('Error adding user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Manage Users
      </Typography>

      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error">
          {error}
        </Alert>
      </Snackbar>

      <Snackbar open={deactivationSuccess} autoHideDuration={4000} onClose={() => setDeactivationSuccess(false)}>
        <Alert onClose={() => setDeactivationSuccess(false)} severity="success">
          User successfully deactivated
        </Alert>
      </Snackbar>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenDialog(true)}
        style={{ marginBottom: '20px', fontWeight: 'bold' }}
        fullWidth
      >
        Add New User
      </Button>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
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
        <Grid container spacing={3}>
          {users?.length ? users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Paper elevation={3} style={{ padding: '20px' }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {user.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {user.email}
                    </Typography>
                    <Typography variant="body2" color={user.status === "active" ? "green" : user.status === "pending" ? "orange" : "red"} gutterBottom>
                      {/* Ensure user.status is defined and not undefined */}
                      {user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : 'Unknown'}
                    </Typography>

                    <Tooltip title={user.status === "pending" ? "Activate this user" : user.status === "active" ? "Deactivate this user" : "This user is deactivated"}>
                      <Button
                        variant="contained"
                        color={user.status === "active" ? "secondary" : user.status === "pending" ? "default" : "primary"}
                        onClick={() => user.status === "pending" ? handleActivateUser(user.id) : user.status === "active" ? handleDeactivateUser(user.id) : handleActivateUser(user.id)}
                        disabled={loading}
                        fullWidth
                      >
                        {user.status === "pending" ? "Activate" : user.status === "active" ? "Deactivate" : "Activate"}
                      </Button>
                    </Tooltip>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          )) : (
            <Typography variant="body1" style={{ textAlign: 'center', marginTop: '20px' }}>
              No users available.
            </Typography>
          )}
        </Grid>
      )}
    </div>
  );
};

export default ManageUsers;
