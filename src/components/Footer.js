import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { IoMail, IoPhonePortrait, IoLocation } from 'react-icons/io5';
import './Footer.css';

const Footer = () => {
  const handleSubscribeClick = (event) => {
    event.preventDefault();
    alert('Thank you for subscribing!');
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Us Section */}
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>We are Moringa School, committed to empowering students to excel in tech. Our mission is to provide cutting-edge education that fosters skills in Software Engineering, Data Science, and UX Design.</p>
          <div className="social-icons">
            <a href="https://www.facebook.com/moringaschool" target="_blank" rel="noopener noreferrer" title="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com/moringaschool" target="_blank" rel="noopener noreferrer" title="Twitter">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/moringaschool" target="_blank" rel="noopener noreferrer" title="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/school/moringaschool" target="_blank" rel="noopener noreferrer" title="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Courses Section */}
        <div className="footer-section courses">
          <h3>Our Courses</h3>
          <ul>
            <li><a href="/courses/software-engineering">Software Engineering</a></li>
            <li><a href="/courses/web-development">Web Development</a></li>
            <li><a href="/courses/data-science">Data Science</a></li>
            <li><a href="/courses/ux-design">UX Design</a></li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="footer-section support">
          <h3>Support</h3>
          <ul>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Info Section */}
        <div className="footer-section contact-info">
          <h3>Contact Info</h3>
          <p><IoPhonePortrait /> +254-712-345-678</p>
          <p><IoMail /> support@moringaschool.com</p>
          <p><IoLocation /> Nairobi, Kenya</p>
        </div>

        {/* Map Section */}
        <div className="footer-section map">
          <h3>Our Location</h3>
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15969.396727046173!2d36.82194662404731!3d-1.2920650557150596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f3a3d3c72293b%3A0xa758dff56a0b7b83!2sMoringa%20School!5e0!3m2!1sen!2ske!4v1633196197402!5m2!1sen!2ske" 
              width="100%" 
              height="300" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              title="Map showing Moringa School location"
            ></iframe>
          </div>
        </div>

        {/* Newsletter Subscription Section */}
        <div className="footer-section newsletter">
          <h3>Subscribe to Our Newsletter</h3>
          <p>Stay updated with the latest news and offers from Moringa School.</p>
          <form onSubmit={handleSubscribeClick}>
            <input 
              type="email" 
              name="email" 
              className="email" 
              placeholder="Enter your email" 
              required
            />
            <button type="submit" className="btn">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-credit">
        <p>© {new Date().getFullYear()} Moringa School. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
