import React from 'react';
import { Link } from 'react-router-dom'; 
import './Footer.css'; 

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
    
        <div className="footer-links">
          <div className="social-media">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f" style={{ fontSize: '30px' }}></i> 
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter" style={{ fontSize: '30px' }}></i> 
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram" style={{ fontSize: '30px' }}></i> 
            </a>
          </div>

          <div className="quick-links">
            <Link to="/terms">Terms and Conditions</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/about">About Us</Link>
          </div>
        </div>

        
        <div className="footer-bottom">
          <p>&copy; 2024 ElectroHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
