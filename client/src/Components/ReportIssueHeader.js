import React, { useState } from "react";
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  Collapse,
} from "reactstrap";
import { Link } from "react-router-dom";
import logo from "../Images/logo.png";
import "../ReportIssueHeader.css";
import { logout } from "../Features/UserSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const ReportIssueHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlelogout = async () => {
    dispatch(logout());
    await new Promise((resolve) => setTimeout(resolve, 100));

    navigate("/");
  };
  return (
    <Navbar expand="lg" className="navbar">
      <div className="logo-container">
        <img src={logo} className="logo" alt="Logo" />
        <span className="brand-name">Reporting Hub</span>
      </div>

      <NavbarToggler onClick={() => setIsOpen(!isOpen)} />

      <Collapse isOpen={isOpen} navbar>
        <Nav className="nav-links" navbar>
          <NavItem>
            <NavLink tag={Link} to="/ReportIssue">
              Report Issue
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/Reports">
              Reports
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/profilepage">
              Profile
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/logout" onClick={handlelogout}>
              Logout
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default ReportIssueHeader;
