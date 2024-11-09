import React from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaHeart, FaUserCircle } from 'react-icons/fa';//icons in react
import  '../style/Usernav.css'; 
import '../images/moringalogo.png';

const Usernav = () => {
  return (
    <nav className="usernav">
      {/* Logo on the left */}
      <div className="usernav-logo">
        <div className='user-logo'>          
          <img src='../images/moringalogo.png' alt='moringalogo' />
        </div>        
        <div className="usernav-icons">
        <FaBell className="icon" title="Notifications" />
        <FaHeart className="icon" title="Wishlist" />
        <FaUserCircle className="icon" title="Profile" />
      </div>
      </div>


      {/* Menu Items */}
      <ul className="usernav-menu">
        <li><Link to="/">ForYou</Link></li>
        <li><Link to="/devops">DevOps</Link></li>
        <li><Link to="/fullstack">Fullstack</Link></li>
        <li><Link to="/frontend">Frontend</Link></li>
        <li><Link to="/backend">Backend</Link></li>
        <li><Link to="/cloudcomputing">Cloud Computing</Link></li>
      </ul>

      

    </nav>
  );
};

export default Usernav;
