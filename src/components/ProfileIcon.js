import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons'; // User icon

const ProfileIcon = ({ onClick }) => {
  return (
    <FontAwesomeIcon
      icon={faUser}
      className="user-icon"
      onClick={onClick} // Make sure this calls the parent's toggleUserInfo function
      style={{ cursor: 'pointer', fontSize: '24px' }} // Added cursor pointer and font size for better visibility
    />
    
  );
};

export default ProfileIcon;