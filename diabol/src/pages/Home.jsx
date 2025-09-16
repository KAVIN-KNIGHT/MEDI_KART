import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Products from './Products';
import '../styles/home.css';
import deliveryIcon from '../assets/images/delivery.png';
import trustedQualityIcon from '../assets/images/partners.png';
import satisfactionIcon from '../assets/images/satisfaction.png';
import heroImage from '../assets/images/bg2.jpg';

const Home = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Login form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form states
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const switchToRegisterModal = () => {
    closeLoginModal();
    openRegisterModal();
  };

  const switchToLoginModal = () => {
    closeRegisterModal();
    openLoginModal();
  };

 const handleLoginSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:3001/api/users/login', {  // <-- updated URL
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: loginEmail, password: loginPassword })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('medikartUser', JSON.stringify(data.user));
      alert('✅ Login successful!');
      setIsLoginModalOpen(false);
    } else {
      alert(`❌ ${data.message}`);
    }
  } catch (error) {
    alert('❌ Server error');
    console.error(error);
  }
};

const handleRegisterSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:3001/api/users/signup', {  // <-- updated URL
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullname: registerName,
        email: registerEmail,
        phone: registerPhone,          // You had phone in state but forgot to send it
        password: registerPassword
      })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('medikartUser', JSON.stringify(data.user));
      alert('✅ Registration successful!');
      setIsRegisterModalOpen(false);
    } else {
      alert(`❌ ${data.message}`);
    }
  } catch (error) {
    alert('❌ Server error');
    console.error(error);
  }
};


  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.service-card, .category-card, .reason-card');
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        if (elementPosition < screenPosition) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

  return (
    <>
      <Header 
        openLoginModal={openLoginModal} 
        openRegisterModal={openRegisterModal} 
        windowWidth={windowWidth}
      />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to MediKart</h1>
          <p>Your trusted online pharmacy for quality medicines and healthcare products.</p>
          <button className="hero-btn" ><Link to="/products" className='shop-link'>Shop Now</Link></button>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="service-card" style={{ background: 'linear-gradient(to right, #fff7fa, #fdeef2)' }}>
          💰 20% Off on Skin Care
        </div>
        <div className="service-card" style={{ background: 'linear-gradient(to right, #faf5ff, #f3ebff)' }}>
          💰 30% Off on Hair Care
        </div>
        <div className="service-card" style={{ background: 'linear-gradient(to right, #f7fff8, #ecfaed)' }}>
          🏥 Book appointment
        </div>
        <div className="service-card" style={{ background: 'linear-gradient(to right, #f5fbff, #e8f4ff)' }}>
          💻 Video Consult
        </div>
        <div className="service-card" style={{ background: 'linear-gradient(to right, #f9f7ff, #f0ebff)' }}>
          🔬 Lab Tests
        </div>
      </section>

      {/* Health Categories Section */}
      <section className="health-categories">
        <h2>Browse by Health Conditions</h2>
        <div className="categories">
          <div className="category-card" style={{ background: 'linear-gradient(to right, #fff7fa, #fdeef2)' }}>
            🩸Diabetes Care
          </div>
          <div className="category-card" style={{ background: 'linear-gradient(to right, #faf5ff, #f3ebff)' }}>
            ❤️Cardiac Care
          </div>
          <div className="category-card" style={{ background: 'linear-gradient(to right, #f7fff8, #ecfaed)' }}>
            🩺Stomach Care
          </div>
          <div className="category-card" style={{ background: 'linear-gradient(to right, #f5fbff, #e8f4ff)' }}>
            💊Pain Relief
          </div>
          <div className="category-card" style={{ background: 'linear-gradient(to right, #f9f7ff, #f0ebff)' }}>
            🦷Oral Care
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <div className="reasons">
          <div className="reason-card" style={{ background: 'linear-gradient(to right, #fff7fa, #fdeef2)' }}>
            <div className="reason-image">
              <img src={deliveryIcon} alt="Fast Delivery Icon" />
            </div>
            <h3>Fast Delivery</h3>
            <p>We guarantee quick and reliable delivery for your convenience, no matter where you are.</p>
          </div>
          <div className="reason-card" style={{ background: 'linear-gradient(to right, #f9f7ff, #f0ebff)' }}>
            <div className="reason-image">
              <img src={trustedQualityIcon} alt="Trusted Quality Icon" />
            </div>
            <h3>Trusted Quality</h3>
            <p>All our products come from certified suppliers and are tested for quality, ensuring your safety.</p>
          </div>
          <div className="reason-card" style={{ background: 'linear-gradient(to right, #f5fbff, #e8f4ff)' }}>
            <div className="reason-image">
              <img src={satisfactionIcon} alt="Customer Satisfaction Icon" />
            </div>
            <h3>Customer Satisfaction</h3>
            <p>We care about your health and satisfaction, providing top-notch customer service and support.</p>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="modal active">
          <div className="modal-content">
            <span className="close" onClick={closeLoginModal}>&times;</span>
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label htmlFor="loginEmail">Email:</label>
                <input
                  type="email"
                  id="loginEmail"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="loginPassword">Password:</label>
                <input
                  type="password"
                  id="loginPassword"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <button type="submit">Login</button>
              <p className="text">
                Don't have an account?{' '}
                <a href="#" onClick={switchToRegisterModal}>
                  Register
                </a>
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {isRegisterModalOpen && (
        <div className="modal active">
          <div className="modal-content">
            <span className="close" onClick={closeRegisterModal}>&times;</span>
            <h2>Register</h2>
            <form onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name:</label>
                <input
                  type="text"
                  id="fullName"
                  required
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="registerEmail">Email:</label>
                <input
                  type="email"
                  id="registerEmail"
                  required
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="registerPhone">Phone:</label>
                <input
                  type="text"
                  id="registerPhone"
                  required
                  value={registerPhone}
                  onChange={(e) => setRegisterPhone(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="registerPassword">Password:</label>
                <input
                  type="password"
                  id="registerPassword"
                  required
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                />
              </div>
              <button type="submit">Register</button>
              <p className="text">
                Already have an account?{' '}
                <a href="#" onClick={switchToLoginModal}>
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      )}

    </>
  );
};

export default Home;