// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
// import { Provider } from 'react-redux';
// import { store } from './redux/store-tech';
// import { UserProvider } from './context/UserContext';

// // Tech Writer pages and components
// import Sidebar from './components/Sidebar'; 
// import TechWriterHomePage from './pages/TechWriterHomePage';
// import ProfilePage from './pages/ProfileCreation';
// import ReviewContent from './pages/ContentListPage';
// import ApproveContent from './pages/ApproveContent';
// import EditContent from './pages/EditContent';
// import ContentPage from './pages/ContentPage';

// // Admin pages and components
// import AdminDashboard from './pages/AdminDashboard';
// import ManageUsers from './pages/ManageUsers';
// import ManageContent from './pages/ManageContent';
// import ManageCategories from './pages/ManageCategories';
// import SidebarAdmin from './components/Sidebar-admin';
// import Login from './components/Login';
// import Home from './components/Home';
// import SignUp from './components/SignUp';
// import Contact from './components/ContactUs';
// import Register from './components/Register';

// // Import the Navbar component
// import Navbar from './components/Navbar';

// // Protected Route component for role-based access
// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [role, setRole] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const userRole = localStorage.getItem('role');

//     if (token && userRole) {
//       setIsAuthenticated(true);
//       setRole(userRole);
//     }
//   }, []);

//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   if (allowedRoles && !allowedRoles.includes(role)) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// function App() {
//   const [isSidebarOpen, setSidebarOpen] = useState(true);

//   return (
//     <Provider store={store}>
//       <UserProvider>
//         <Router>
//           <div className="App">
//             {/* Navbar appears at the top of all pages */}
//             <Navbar />

//             <div className="main-content" style={{ marginTop: '50px' }}> {/* Add marginTop for space */}
//               {/* Public Routes */}
//               <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/signup" element={<SignUp />} />
//                 <Route path="/contact" element={<Contact />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/register" element={<Register />} />

//                 {/* Tech Writer Routes */}
//                 <Route path="/techwriter/*" element={
//                   <ProtectedRoute allowedRoles={['tech-writer']}>
//                     <div style={{ display: 'flex', height: '100vh' }}>
//                       <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
//                       <div style={{ marginLeft: isSidebarOpen ? '240px' : '0', padding: '20px', flex: 1 }}>
//                         <Routes>
//                           <Route path="home" element={<TechWriterHomePage />} />
//                           <Route path="profile" element={<ProfilePage />} />
//                           <Route path="review-content" element={<ReviewContent />} />
//                           <Route path="approve-content" element={<ApproveContent />} />
//                           <Route path="edit-content" element={<EditContent />} />
//                           <Route path="content/:id" element={<ContentPage />} />
//                         </Routes>
//                       </div>
//                     </div>
//                   </ProtectedRoute>
//                 } />

//                 {/* Admin Routes */}
//                 <Route path="/admin/*" element={
//                   <ProtectedRoute allowedRoles={['admin']}>
//                     <div style={{ display: 'flex', height: '100vh' }}>
//                       <SidebarAdmin />
//                       <div style={{ marginLeft: '240px', padding: '20px', flex: 1 }}>
//                         <Routes>
//                           <Route path="dashboard" element={<AdminDashboard />} />
//                           <Route path="users" element={<ManageUsers />} />
//                           <Route path="content" element={<ManageContent />} />
//                           <Route path="categories" element={<ManageCategories />} />
//                         </Routes>
//                       </div>
//                     </div>
//                   </ProtectedRoute>
//                 } />

//                 {/* Fallback Route */}
//                 <Route path="*" element={<Navigate to="/" />} />
//               </Routes>
//             </div>
//           </div>
//         </Router>
//       </UserProvider>
//     </Provider>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Contact from './components/ContactUs';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Admin components
import AdminDashboard from './pages/AdminDashboard';
import ManageUsers from './pages/ManageUsers';
import ManageContent from './pages/ManageContent-admin';
import ManageCategories from './pages/ManageCategories-admin';
import SidebarAdmin from './components/Sidebar-admin';

// Tech Writer components
import TechWriterHomePage from './pages/TechWriterHomePage';
import ProfilePage from './pages/ProfileCreation';
import ReviewContent from './pages/ContentListPage';
import ApproveContent from './pages/ApproveContent';
import EditContent from './pages/EditContent';
import ContentPage from './pages/ContentPage';
import SidebarTechWriter from './components/Sidebar-techwriter';

// User components
import UserDashboard from './components/UserDashboard';
import UserProfile from './components/ProfileOverlay';
import DevOpsComponent from './components/DevOpsComponent';
import FullStackComponent from './components/FullStack';
import FrontendComponent from './components/Frontend';
import BackendComponent from './components/Backend';
import CloudComputingComponent from './components/CloudComputing';
import BookmarksOverlay from './components/BookmarksOverlay';
import ProfileOverlay from './components/ProfileOverlay';
import NotificationsOverlay from './components/NotificationsOverlay';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    if (token && userRole) {
      setIsAuthenticated(true);
      setRole(userRole);
    }
  }, []);

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!isAuthenticated) return <Navigate to="/login" />;
    if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/" />;
    return children;
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Admin Routes */}
            <Route path="/admin/*" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <div style={{ display: 'flex', height: '100vh' }}>
                  <SidebarAdmin />
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

            {/* Protected Tech Writer Routes */}
            <Route path="/techwriter/*" element={
              <ProtectedRoute allowedRoles={['techwriter']}>
                <div style={{ display: 'flex', height: '100vh' }}>
                  <SidebarTechWriter />
                  <div style={{ marginLeft: '240px', padding: '20px', flex: 1 }}>
                    <Routes>
                      <Route path="TechWriterHomePage" element={<TechWriterHomePage />} />
                      <Route path="profile" element={<ProfilePage />} />
                      <Route path="review-content" element={<ReviewContent />} />
                      <Route path="approve-content" element={<ApproveContent />} />
                      <Route path="edit-content" element={<EditContent />} />
                      <Route path="content/:id" element={<ContentPage />} />
                    </Routes>
                  </div>
                </div>
              </ProtectedRoute>
            } />

            {/* Protected User Routes */}
            <Route path="/user/*" element={
              <ProtectedRoute allowedRoles={['user']}>
                <div style={{ display: 'flex', height: '100vh' }}>
                  <div style={{ marginLeft: '240px', padding: '20px', flex: 1 }}>
                    <Routes>
                      <Route path="UserDashboard" element={<UserDashboard />} />
                      <Route path="profile" element={<UserProfile />} />
                      <Route path="devops" element={<DevOpsComponent />} />
                      <Route path="fullstack" element={<FullStackComponent />} />
                      <Route path="frontend" element={<FrontendComponent />} />
                      <Route path="backend" element={<BackendComponent />} />
                      <Route path="cloudcomputing" element={<CloudComputingComponent />} />
                      <Route path="bookmarks" element={<BookmarksOverlay />} />
                      <Route path="notifications" element={<NotificationsOverlay />} />
                    </Routes>
                  </div>
                </div>
              </ProtectedRoute>
            } />

          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
