import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo (2).png';
import '../styles/header.css';
import LoginModal from './LoginModel';
import RegisterModal from './RegisterModel';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Separate useEffect hooks for better cleanup
  useEffect(() => {
    const storedUser = localStorage.getItem('medikartUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992 && isMenuOpen) {
        setIsMenuOpen(false);
        document.body.style.overflow = 'auto';
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openModal = (modalType) => {
    setError(null);
    if (modalType === 'login') setIsLoginModalOpen(true);
    else setIsRegisterModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      setUser(data.user || data);
      setIsLoggedIn(true);
      localStorage.setItem('medikartUser', JSON.stringify(data.user || data));
      closeModal();

      // Redirect if admin
      if ((data.user || data)?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const password = e.target.password.value;

    try {
      const res = await fetch('http://localhost:3001/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname: name, email, phone, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');

      alert('Registration successful! You can now login.');
      closeModal();
      openModal('login');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('medikartUser');
    setUser(null);
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    navigate('/');
  };

  const handleNavLinkClick = () => {
    if (window.innerWidth <= 992) {
      setIsMenuOpen(false);
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <>
      <header className={`header-container ${scrolled ? 'scrolled' : ''}`}>
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Pharmacy Logo" />
            <p>MediKart</p>
          </Link>
        </div>

        <div 
          className={`menu-icon ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          role="button"
          tabIndex="0"
        >
          {isMenuOpen ? '✕' : '☰'}
        </div>

        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><Link to="/" onClick={handleNavLinkClick}>Home</Link></li>
            <li><Link to="/products" onClick={handleNavLinkClick}>Products</Link></li>
            <li><Link to="/doctors" onClick={handleNavLinkClick}>Find Doctors</Link></li>
            <li><Link to="/about" onClick={handleNavLinkClick}>About Us</Link></li>
            <li><Link to="/health-records" onClick={handleNavLinkClick}>Health Records</Link></li>
            <li><Link to="/diabetes-care" onClick={handleNavLinkClick}>Diabetes Care</Link></li>
            
          </ul>
        </nav>

        <div className="login-cart">
          <Link to="/cart" className="cart-link" aria-label="Shopping cart">
            <span className="cart-icon">🛒</span>
          </Link>
          
          {isLoggedIn ? (
            <div className="user-dropdown">
              <button 
                className="user-btn"
                onClick={toggleDropdown}
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
              >
                {user?.photo ? (
                  <Avatar 
                    src={user.photo} 
                    alt={user?.fullname || user?.name} 
                    sx={{ width: 30, height: 30, mr: 1 }}
                  />
                ) : (
                  <AccountCircleIcon sx={{ fontSize: 30, mr: 1 }} />
                )}
                <span className="user-name">{user?.fullname || user?.name}</span>
                <ArrowDropDownIcon sx={{ fontSize: 18, ml: 0.5 }} />
              </button>
              
              {isDropdownOpen && (
  <div className="dropdown-content">
    <Link to="/profile" onClick={() => setIsDropdownOpen(false)}>
      <AccountCircleIcon sx={{ fontSize: 18, mr: 1 }} />
      My Profile
    </Link>
    <Link to="/orders" onClick={() => setIsDropdownOpen(false)}>
      <ShoppingBagIcon sx={{ fontSize: 18, mr: 1 }} />
      My Orders
    </Link>

    {user?.role === 'admin' && (
      <Link to="/admin" onClick={() => setIsDropdownOpen(false)}>
        <i className="fas fa-tools" style={{ marginRight: '6px' }}></i>
        Admin Panel
      </Link>
    )}

    <button onClick={handleLogout}>
      <LogoutIcon sx={{ fontSize: 18, mr: 1 }} />
      Logout
    </button>
  </div>
)}

            </div>
          ) : (
            <button 
              className="login-btn" 
              onClick={() => openModal('login')}
              aria-label="Login"
            >
              Login
            </button>
          )}
        </div>
      </header>

      {isMenuOpen && (
        <div 
          className="menu-overlay" 
          onClick={toggleMenu}
          role="button"
          aria-label="Close menu"
          tabIndex="0"
        ></div>
      )}

      {isLoginModalOpen && (
        <LoginModal
          onClose={closeModal}
          onSwitchToRegister={() => { closeModal(); openModal('register'); }}
          onLogin={handleLogin}
          isLoading={isLoading}
          error={error}
        />
      )}

      {isRegisterModalOpen && (
        <RegisterModal
          onClose={closeModal}
          onSwitchToLogin={() => { closeModal(); openModal('login'); }}
          onRegister={handleRegister}
          isLoading={isLoading}
          error={error}
        />
      )}
    </>
  );
}