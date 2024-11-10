import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';  // Ensure Router is wrapping the entire app
import Home from './components/Home';
import Contact from './components/ContactUs';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminDashboard from './pages/AdminDashboard';
import ManageUsers from './pages/ManageUsers';
import ManageContent from './pages/ManageContent';
import ManageCategories from './pages/ManageCategories';
import Sidebar from './components/Sidebar-admin';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    // Check localStorage for authentication token and role
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    
    if (token && userRole) {
      setIsAuthenticated(true);
      setRole(userRole);
    }
  }, []);

  // Protected Route component to handle role-based access
  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <Router>  {/* Ensure the entire app is wrapped with Router */}
      <div className="App">
        <Navbar />
        
        <div className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Admin Routes */}
            <Route path="/admin/*" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <div style={{ display: 'flex', height: '100vh' }}>
                  <Sidebar />
                  <div style={{ marginLeft: '240px', padding: '20px', flex: 1 }}>
                    <Routes>
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route path="users" element={<ManageUsers />} />
                      <Route path="content" element={<ManageContent />} />
                      <Route path="categories" element={<ManageCategories />} />
                    </Routes>
                  </div>
                </div>
              </ProtectedRoute>
            } />

            {/* Add a fallback route for unmatched paths */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
