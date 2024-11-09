
// src/ContactUs.js
import React, { useState } from 'react';
import './ContactUs.css'; // Assuming you have a CSS file for styling

const ContactUs = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track form submission

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setIsSubmitted(true); // Set form submission status to true
    setEmail(''); // Reset the email input field
    setMessage(''); // Reset the message input field
  };

  return (
    <div className="contact-us">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} className="contact-us-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {isSubmitted && (
        <div className="success-message">
          <p>Thank you for your message! We will give you feedback shortly.</p>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
