import React from 'react';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 
import '../styles/privacypolicy.css'; 

const PrivacyPolicy = () => {
  return (
    <>
      <Header /> {/* Use the imported Header component */}

      <section className="policy-banner">
        <h1>Privacy Policy</h1>
        <p>Last Updated: March 2025</p>
      </section>

      <section className="policy-wrapper">
        <div className="policy-container">
          <h2>Introduction</h2>
          <p>Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your personal data.</p>

          <h3>1. Information We Collect</h3>
          <ul>
            <li>Personal information (name, email, phone number)</li>
            <li>Payment details (encrypted & secured)</li>
            <li>Browsing and transaction history</li>
          </ul>

          <h3>2. How We Use Your Information</h3>
          <ul>
            <li>To process orders and payments</li>
            <li>To improve our website and services</li>
            <li>To send updates, offers, and promotions</li>
          </ul>

          <h3>3. Data Security</h3>
          <p>We use industry-standard encryption and security measures to protect your data from unauthorized access.</p>

          <h3>4. Third-Party Services</h3>
          <p>We may share data with third-party payment providers and logistics partners, ensuring secure transactions.</p>

          <h3>5. Your Rights</h3>
          <p>You have the right to request access, correction, or deletion of your personal data.</p>

          <h3>6. Contact Us</h3>
          <p>
            For privacy-related concerns, contact us at{' '}
            <a href="mailto:support@medikart.com">support@medikart.com</a>.
          </p>
        </div>
      </section>

    </>
  );
};

export default PrivacyPolicy;
