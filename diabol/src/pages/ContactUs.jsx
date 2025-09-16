import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/contactusy.css';

const ContactUs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openForm = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeForm = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Your message has been sent successfully.');
    closeForm();
  };

  useEffect(() => {
    const handleResize = () => {
      const contactImageSection = document.querySelector('.contact-image-section');
      if (window.innerWidth <= 768) {
        contactImageSection.style.display = 'none';
      } else {
        contactImageSection.style.display = 'block';
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Header />
      <section className="contact-wrapper">
        <div className="contact-container animate__animated animate__fadeIn">
          <div className="contact-button-section">
            <h2 className="animate__animated animate__fadeInDown">Need Help?</h2>
            <p className="animate__animated animate__fadeIn">Click below to get in touch with us.</p>
            <button
              className="open-form-btn animate__animated animate__fadeInUp pulse"
              onClick={openForm}
            >
              Contact Us
            </button>
          </div>
          <div className="contact-image-section"></div>
        </div>
      </section>

      {isModalOpen && (
        <div className="modal active">
          <div className="modal-content">
            <span className="close" onClick={closeForm}>
              &times;
            </span>
            <h2>Contact Us</h2>
            <p>Fill out the form, and we'll respond shortly.</p>
            <form onSubmit={handleFormSubmit}>
              <label htmlFor="name">Full Name:</label>
              <input type="text" id="name" placeholder="Enter your name" required />

              <label htmlFor="email">Email:</label>
              <input type="email" id="email" placeholder="Enter your email" required />

              <label htmlFor="phone">Phone Number:</label>
              <input type="tel" id="phone" placeholder="Enter your phone number" />

              <label htmlFor="subject">Subject:</label>
              <select id="subject" required>
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="order">Order Issue</option>
                <option value="product">Product Question</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>

              <label htmlFor="message">Message:</label>
              <textarea id="message" placeholder="Write your message" required></textarea>

              <button type="submit" className="animate__animated animate__pulse animate__infinite">
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
   
    </>
  );
};

export default ContactUs;
