import React, { useState } from 'react';
import './ContactUs.css'; // Import the ContactUs CSS for styling
import { FaEnvelope, FaComment } from 'react-icons/fa'; // Icons for email and message
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const ContactUs = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // To track form submission
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Form data
    const formData = {
      email,
      message,
    };

    // Send data to the backend (db.json file on localhost:5000)
    try {
      await fetch('http://localhost:5000/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Once the data is sent, update state and reset form
      setIsSubmitted(true); // Set submitted state to true
      setEmail(''); // Reset the email input field
      setMessage(''); // Reset the message input field

      // Redirect to the homepage after 2 seconds
      setTimeout(() => {
        navigate('/'); // Redirect to the homepage
      }, 2000);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="contact-us">
      <h1 className="contact-us-title">We'd Love to Hear From You!</h1>
      <p className="contact-us-description">
        Have any questions or feedback? Feel free to reach out to us through the form below, and we’ll get back to you shortly.
      </p>

      <form onSubmit={handleSubmit} className="contact-us-form">
        <div className="form-group">
          <label htmlFor="email">
            <FaEnvelope className="form-icon" /> Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">
            <FaComment className="form-icon" /> Message:
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Write your message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="form-textarea"
          />
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>

      {isSubmitted && (
        <div className="success-message">
          <p>
            <strong>Thank you!</strong> Your request has been received successfully. We will get back to you shortly!
          </p>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
