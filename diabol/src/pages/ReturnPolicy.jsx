import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/return.css';

const ReturnPolicy = () => {
  const [activeSections, setActiveSections] = useState({});

  const toggleSection = (index) => {
    setActiveSections((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <>
     
      <section className="policy-banner">
        <h1>Return & Refund Policy</h1>
        <p>Last Updated: March 2025</p>
      </section>

      <section className="policy-wrapper">
        <div className="policy-container">
          <h2 onClick={() => toggleSection(1)}>
            1. Return Eligibility <span className="arrow">{activeSections[1] ? '▲' : '▼'}</span>
          </h2>
          <div className={`content ${activeSections[1] ? 'show' : ''}`}>
            <p>We aim to provide high-quality healthcare products, but if you're not satisfied with your purchase, you may be eligible for a return under the following conditions:</p>
            <ul>
              <li><strong>Damaged, Defective, or Incorrect Products:</strong> If the product is delivered damaged, defective, or different from what you ordered, you can request a return.</li>
              <li><strong>Unopened and Unused Items:</strong> The product must be unused, in its original packaging, and in a resellable condition.</li>
              <li><strong>Return Request Period:</strong> Returns must be requested within <strong>7 days</strong> of receiving the order. Requests made beyond this period will not be accepted.</li>
              <li><strong>Non-Returnable Items:</strong> Certain healthcare products like prescription medicines, intimate hygiene products, and medical devices are not eligible for returns due to health and safety concerns.</li>
            </ul>
          </div>

          <h2 onClick={() => toggleSection(2)}>
            2. Refund Process <span className="arrow">{activeSections[2] ? '▲' : '▼'}</span>
          </h2>
          <div className={`content ${activeSections[2] ? 'show' : ''}`}>
            <p>If your return request is approved, the refund process will be initiated as follows:</p>
            <ul>
              <li><strong>Refund Timeframe:</strong> Refunds will be processed within <strong>7-10 business days</strong> after the returned item has been received and inspected.</li>
              <li><strong>Refund Method:</strong> Refunds will be credited to the <strong>original payment method</strong> used for the purchase. If the payment was made via COD (Cash on Delivery), refunds will be transferred to your bank account.</li>
              <li><strong>Shipping Costs:</strong> Shipping charges are non-refundable. However, if the return is due to our error (e.g., wrong product shipped), we will cover the return shipping cost.</li>
              <li><strong>Exchange Option:</strong> If you prefer, we can provide a replacement product instead of a refund.</li>
            </ul>
          </div>

          <h2 onClick={() => toggleSection(3)}>
            3. How to Request a Return <span className="arrow">{activeSections[3] ? '▲' : '▼'}</span>
          </h2>
          <div className={`content ${activeSections[3] ? 'show' : ''}`}>
            <p>Follow these steps to request a return:</p>
            <ul>
              <li>Contact our customer support via email at <a href="mailto:support@medikart.com">support@medikart.com</a> or call <strong>1800-123-456</strong>.</li>
              <li>Provide your order number, a brief description of the issue, and images of the product (if damaged or incorrect).</li>
              <li>Our team will verify your request and provide you with return instructions.</li>
              <li>After we receive the returned product, we will process your refund or replacement.</li>
            </ul>
          </div>

          <h2 onClick={() => toggleSection(4)}>
            4. Contact for Returns & Support <span className="arrow">{activeSections[4] ? '▲' : '▼'}</span>
          </h2>
          <div className={`content ${activeSections[4] ? 'show' : ''}`}>
            <p>If you have any concerns regarding your return or refund, please reach out to us:</p>
            <ul>
              <li>Email: <a href="mailto:support@medikart.com">support@medikart.com</a></li>
              <li>Phone: <strong>1800-123-456</strong> (Available Mon-Sat, 9 AM - 7 PM)</li>
              <li>Live Chat: Available on our website during business hours</li>
            </ul>
          </div>
        </div>
      </section>
     
    </>
  );
};

export default ReturnPolicy;
