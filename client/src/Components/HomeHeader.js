import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  Collapse,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../Images/logo.png";
import React from 'react';
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar color="white" light expand="lg" className="header-container">
      {/* Logo Section */}
      <div className="logo-container">
        <img src={logo} className="logo" alt="Logo" />
        <span></span>
      </div>

      {/* Toggle Button for Mobile */}
      <NavbarToggler onClick={() => setIsOpen(!isOpen)} />

      {/* Navigation Links */}
      <Collapse isOpen={isOpen} navbar>
        <Nav className="nav-container" navbar>
          <NavItem>
            <NavLink tag={Link} to="/" className="nav-link">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/aboutus" className="nav-link">
              About us
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/content" className="nav-link">
              Content
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>

      <button className="signup-btn">
        {" "}
        <Link to="/register">Sign Up</Link>
      </button>
    </Navbar>
  );
};

export default Header;
