import React, { useState } from 'react';
import Header from '../components/Header'; // Import the Header component
import Footer from '../components/Footer'; // Import the Footer component
import '../styles/faq.css'; // Ensure this path is correct

const FAQ = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <>
      <Header /> {/* Use the imported Header component */}

      <section className="faq-banner">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to commonly asked questions.</p>
      </section>

      <section className="faq-container">
        {faqData.map((faq, index) => (
          <div className="faq-item" key={index}>
            <h2 onClick={() => toggleFAQ(index)}>
              {faq.question} <span className="arrow">{activeFAQ === index ? '▲' : '▼'}</span>
            </h2>
            <div className={`faq-content ${activeFAQ === index ? 'show' : ''}`}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </section>

     
    </>
  );
};

const faqData = [
  {
    question: 'What is MediKart?',
    answer: 'MediKart is an online pharmacy that provides high-quality medicines, healthcare essentials, and medical consultations.',
  },
  {
    question: 'How do I place an order?',
    answer: 'To place an order, browse products, add them to your cart, and proceed to checkout. You can pay using credit/debit cards, UPI, or net banking.',
  },
  {
    question: 'What are the delivery charges?',
    answer: 'Delivery charges vary based on location. Free shipping is available for orders above ₹500.',
  },
  {
    question: 'Can I return or exchange a product?',
    answer: 'Returns are accepted only for defective or incorrect products. Refer to our Return Policy for details.',
  },
  {
    question: 'How can I contact customer support?',
    answer: 'You can contact us via email at support@medikart.com or call our helpline at 1800-123-456.',
  },
];

export default FAQ;
