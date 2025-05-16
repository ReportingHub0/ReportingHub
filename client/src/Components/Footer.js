import gmail from "../Images/gmail.jpg";
import Instagram from "../Images/Instagram-icon.png";
import Phone from "../Images/phone-icon.png";
import React from 'react';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>About us</h3>
        <p>
          ReportingHub is an innovative online platform designed to streamline
          the process of reporting and resolving technical issues in educational
          institutions. It allows students, faculty, and staff to efficiently
          report problems with equipment, software, and network systems
        </p>
      </div>

      <div className="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About Us</a>
          </li>
          <li>
            <a href="/content">Content</a>
          </li>
        </ul>
      </div>

      <div className="footer-section">
        <h3>Services</h3>
        <p>
          ReportingHub provides a centralized platform for efficiently reporting
          and resolving technical issues in educational institutions It offers
          real-time tracking, automated notifications, and categorization of
          issues for faster resolution.
        </p>
      </div>

      <div className="footer-section">
        <h3>Contact</h3>
        <p>46S1982@utas.edu.om</p>
        <p>46S1954@utas.edu.om</p>
        <p>46S1977@utas.edu.om</p>

        <p>Phone: +968-XXX-XXX</p>
        <div className="social-icons">
          <a href="#">
            <img src={gmail} alt="Gmail" />
          </a>
          <a href="#">
            <img src={Instagram} alt="Instagram" />
          </a>
          <a href="#">
            <img src={Phone} alt="Phone" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
