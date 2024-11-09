import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './components/Home';
import ContactUs from './components/ContactUs';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';

import AdminDashboard from './pages/AdminDashboard';
import ManageUsers from './pages/ManageUsers';
import ManageContent from './pages/ManageContent';
import ManageCategories from './pages/ManageCategories';
import NotificationsPage from './pages/NotificationsPage';

import TechWriterHomePage from './pages/TechWriterHomePage';
import ProfilePage from './pages/ProfileCreation';
import ApproveContent from './pages/ApproveContent';
import EditContent from './pages/EditContent';
import ReviewContent from './pages/ContentListPage';
import ContentPage from './pages/ContentPage';

import './App.css';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Provider store={store}>
      <AuthProvider>
        <UserProvider>
          <Router>
            <div className="app-container">
              {/* Sidebar for admin and tech writer routes */}
              <Routes>
                <Route path="/admin/*" element={<Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />} />
                <Route path="/techwriter/*" element={<Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />} />
              </Routes>

              <div className="content">
                {/* Navbar for all routes */}
                <Navbar />

                <div className="main-content" style={{ display: 'flex', height: '100vh' }}>
                  <div
                    style={{
                      marginLeft: isSidebarOpen ? '240px' : '0',
                      padding: '20px',
                      flex: 1,
                      transition: 'margin-left 0.3s',
                    }}
                  >
                    <Routes>
                      {/* General/Public Routes */}
                      <Route path="/" element={<Home />} />
                      <Route path="/contact" element={<ContactUs />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<SignUp />} />
                      <Route path="/profile" element={<Profile />} />

                      {/* Tech Writer Routes */}
                      <Route path="/techwriter/home" element={<TechWriterHomePage />} />
                      <Route path="/techwriter/profile" element={<ProfilePage />} />
                      <Route path="/techwriter/review-content" element={<ReviewContent />} />
                      <Route path="/techwriter/approve-content" element={<ApproveContent />} />
                      <Route path="/techwriter/edit-content" element={<EditContent />} />
                      <Route path="/content/:id" element={<ContentPage />} />

                      {/* Admin Routes */}
                      <Route path="/admin/dashboard" element={<AdminDashboard />} />
                      <Route path="/admin/users" element={<ManageUsers />} />
                      <Route path="/admin/content" element={<ManageContent />} />
                      <Route path="/admin/categories" element={<ManageCategories />} />
                      <Route path="/admin/notifications" element={<NotificationsPage />} />
                    </Routes>
                  </div>
                </div>

                {/* Footer for all routes */}
                <Footer />
              </div>
            </div>
          </Router>
        </UserProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
