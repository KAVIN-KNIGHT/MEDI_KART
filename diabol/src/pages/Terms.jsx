import React from 'react';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 
import '../styles/terms.css';

const Terms = () => {
  return (
    <>
      <Header /> 

      <section className="terms-banner">
        <h1>Terms & Conditions</h1>
        <p>Last Updated: March 2025</p>
      </section>

      <section className="terms-wrapper">
        <div className="terms-container">
          <h2>Welcome to MediKart</h2>
          <p>
            These terms and conditions outline the rules and regulations for the use of <strong>MediKart's</strong> website and services.
          </p>

          <h3>1. General Information</h3>
          <p>
            By accessing this website, you agree to abide by these terms. If you do not agree, you may not use our services.
          </p>

          <h3>2. Account and Security</h3>
          <p>
            Users must create an account with accurate details. You are responsible for maintaining the confidentiality of your account and password.
          </p>

          <h3>3. Orders, Pricing & Payments</h3>
          <ul>
            <li>All orders are subject to availability and confirmation.</li>
            <li>Prices are subject to change without prior notice.</li>
            <li>We accept multiple payment methods, including credit/debit cards and UPI.</li>
          </ul>

          <h3>4. Shipping & Delivery</h3>
          <p>
            We aim to deliver all orders within the estimated timeframe. However, unexpected delays may occur due to unforeseen circumstances.
          </p>

          <h3>5. Returns & Refunds</h3>
          <ul>
            <li>Only defective or incorrect products are eligible for returns.</li>
            <li>Requests for returns must be submitted within 7 days of delivery.</li>
            <li>Refunds are processed within 7-10 business days.</li>
          </ul>

          <h3>6. Privacy Policy</h3>
          <p>
            Your personal data is collected and used in accordance with our{' '}
            <a href="/privacy-policy">Privacy Policy</a>.
          </p>

          <h3>7. Governing Law</h3>
          <p>
            These Terms are governed by and construed in accordance with the laws of [Your Country/State].
          </p>

          <h3>8. Changes to Terms</h3>
          <p>
            MediKart reserves the right to update these terms at any time. Continued use of our services implies acceptance of any modifications.
          </p>

          <h3>9. Contact Us</h3>
          <p>
            If you have any questions, please contact us at{' '}
            <a href="mailto:support@medikart.com">support@medikart.com</a>.
          </p>
        </div>
      </section>

     
    </>
  );
};

export default Terms;
