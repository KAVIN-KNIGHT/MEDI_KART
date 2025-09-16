import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo (2).png'; // Ensure this path is correct
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  const location = useLocation();

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-column">
            <div className="footer-logo">
              <img src={logo} alt="MediKart Logo" />
              <p>MediKart</p>
            </div>
            <p className="footer-description">Your trusted online pharmacy for quality medicines and healthcare products.</p>
            <div className="footer-social">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FacebookIcon style={{ color: '#4267B2', fontSize: '24px' }} />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <TwitterIcon style={{ color: '#1DA1F2', fontSize: '24px' }} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramIcon style={{ color: '#C13584', fontSize: '24px' }} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms and Conditions</Link></li>
              <li><Link to="/return">Return and Refund</Link></li>
            </ul>
          </div>

          {/* Health Categories */}
          <div className="footer-column">
            <h3>Health Categories</h3>
            <ul className="footer-links">
              <li>
                <Link
                  to="/categories/diabetes-care"
                  className={location.pathname === '/categories/diabetes-care' ? 'active' : ''}
                >
                  Diabetes Care
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/cardiac-care"
                  className={location.pathname === '/categories/cardiac-care' ? 'active' : ''}
                >
                  Cardiac Care
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/stomach-care"
                  className={location.pathname === '/categories/stomach-care' ? 'active' : ''}
                >
                  Stomach Care
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/pain-relief"
                  className={location.pathname === '/categories/pain-relief' ? 'active' : ''}
                >
                  Pain Relief
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/oral-care"
                  className={location.pathname === '/categories/oral-care' ? 'active' : ''}
                >
                  Oral Care
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/brain-health"
                  className={location.pathname === '/categories/brain-health' ? 'active' : ''}
                >
                  Brain Health
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-column">
            <h3>Contact Us</h3>
            <div className="contact-info">
              <div className="contact-item">
                <EmailIcon style={{ color: '#555', marginRight: '10px' }} />
                <a href="mailto:rkavin975rk@gmail.com">rkavin975rk@gmail.com</a>
              </div>
              <div className="contact-item">
                <PhoneIcon style={{ color: '#555', marginRight: '10px' }} />
                <a href="tel:+916374337696">6374337696</a>
              </div>
              <div className="contact-item">
                <LocationOnIcon style={{ color: '#555', marginRight: '10px' }} />
                <p>123 Health Street, Wellness City</p>
              </div>
            </div>
            
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 MediKart. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;