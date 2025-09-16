import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/aboutus.css';

const AboutUs = () => {
  return (
    <>
      <Header />
      <section className="about-section">
        <div className="about-container">
          <div className="about-text">
            <h2>About Us</h2>
            <p><b>Know more about us, we are more than a pharmacy...</b></p>
            <p>Welcome to <b>MediKart</b>, your trusted online pharmacy for high-quality medicines and healthcare essentials.</p>
            <h2>Our Mission</h2>
            <p>Our mission is to provide <strong>affordable, high-quality healthcare products</strong> and make them accessible to everyone with ease.</p>
          </div>
          <div className="about-image">
            <img src="/src/assets/images/aboutus.jpg" alt="About Us Image" />
          </div>
        </div>
      </section>
      
    </>
  );
};

export default AboutUs;