import React, { useState } from 'react';
import './UserDashboard.css';

function UserProfile({ name, imageUrl, onImageChange }) {
  return (
    <div className="user-profile">
      <img src={imageUrl} alt={`${name}'s profile`} className="profile-image" />
      <h2>Welcome {name}.</h2>
      <input 
        type="file" 
        accept="image/*" 
        onChange={onImageChange} 
        className="profile-image-input" 
      />
    </div>
  );
}

function Post({ image, title }) {
  return (
    <div className="post">
      <img src={image} alt={title} className="post-image" />
      <p className="post-title">{title}</p>
      <div className="post-actions">
        <button>👍</button>
        <button>👎</button>
        <button>🔖</button>
      </div>
    </div>
  );
}

function UserDashboard() {
  const [user, setUser] = useState({
    name: localStorage.getItem('userName') || 'John Doe',
    imageUrl: localStorage.getItem('profilePic') || 'https://via.placeholder.com/150',
  });

  const posts = [
    { image: 'https://c4.wallpaperflare.com/wallpaper/583/900/955/5bd03e05b51f9-wallpaper-preview.jpg', title: 'Our trip to Eldoret' },
    { image: 'https://c4.wallpaperflare.com/wallpaper/817/87/825/programmer-coder-admin-administrator-wallpaper-preview.jpg', title: 'Top Full Stack Developer Skills in 2024' },
    { image: 'https://c4.wallpaperflare.com/wallpaper/195/687/738/autohotkey-programmers-code-programming-wallpaper-preview.jpg', title: 'Will ChatGPT really replace us?' },
  ];

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser((prevUser) => ({ ...prevUser, imageUrl }));
      localStorage.setItem('profilePic', imageUrl);
    }
  };

  return (
    <div className="UserDashboard">
      <UserProfile 
        name={user.name} 
        imageUrl={user.imageUrl} 
        onImageChange={handleImageChange} 
      />
      <div className="post-list">
        {posts.map((post, index) => (
          <Post key={index} image={post.image} title={post.title} />
        ))}
      </div>
    </div>
  );
}

export default UserDashboard;
