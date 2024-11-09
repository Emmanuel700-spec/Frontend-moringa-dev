

import React from "react";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile">
      <h1>My Profile</h1>
      <div className="profile-info">
        <p>
          <strong>Name:</strong> John Doe
        </p>
        <p>
          <strong>Email:</strong> john.doe@example.com
        </p>
        <p>
          <strong>Bio:</strong> Full Stack Developer
        </p>
      </div>
    </div>
  );
};

export default Profile;
