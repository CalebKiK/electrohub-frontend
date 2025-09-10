import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Support.css';

const Support = () => {
  return (
    <div className="support-container">
      <h1>Customer Support</h1>
      <div className="support-links">


        <Link to="/warranty" className="support-item">
          <div className="support-icon">
          <img src="/Icons/warranty.png" alt="warranty Icon" className="warranty-icon-img" />
          </div>
          <h2>Warranty</h2>
          <p>Check local warranty policy protection</p>
        </Link>

        <Link to="/order-support" className="support-item">
          <div className="support-icon">
          <img src="/Icons/support.png" alt="support Icon" className="support-icon-img" />
          </div>
          <h2>Order Support</h2>
          <p>Check order progress</p>
        </Link>

        <Link to="/FAQs" className="support-item">

          <div className="support-icon"></div>
          <img src="/Icons/faq.png" alt="FAQ Icon" className="faq-icon-img" />
          <h2>FAQs</h2>
          <p>Get help from frequently asked questions</p>
        </Link>

        <Link to="/Customer-Feedback" className="support-item">
        <img src="/Icons/feedback.png" alt="Customer Feedback Icon" className="feedback-icon-img" />
          <div className="support-icon"></div>
          <h2>Customer Feedback</h2>
          <p>Help Us Serve You Better!</p>
        </Link>
      </div>
    </div>
  );
};

export default Support;
