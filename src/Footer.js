
// src/Footer.js
import React from 'react';
import { FaFacebookF, FaInstagram, FaPhoneAlt } from 'react-icons/fa'; // Import Facebook, Instagram, and Phone icons
import './Footer.css'; // Import the CSS file for footer styles

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-icons">
          {/* Phone icon with the updated phone number */}
          <a href="tel:+254722280353" target="_blank" rel="noopener noreferrer">
            <FaPhoneAlt />
          </a>

          {/* Facebook icon */}
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>

          {/* Instagram icon */}
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </div>
        <div className="location">
          <p>Located at: Mlolongo Street, Nairobi, Kenya</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
