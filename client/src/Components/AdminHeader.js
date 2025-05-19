import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import logo from "../Images/logo.png"; 
import "../Admin.css";
import { logout } from "../Features/AdminSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const AdminHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlelogout = async () => {
    dispatch(logout());
    await new Promise((resolve) => setTimeout(resolve, 100));
    navigate("/");
  };
  return (
    <Navbar color="light" light expand="lg" className="header">
      {/* Logo & Project Name Section */}
      <div className="navbar-brand d-flex align-items-center header-logo">
        <img src={logo} alt="Logo" className="logo" />
        <span className="project-name">ReportingHub</span>{" "}
        {/* Added project name */}
      </div>

      {/* Toggle Button for Mobile */}
      <NavbarToggler
        onClick={() => setIsOpen(!isOpen)}
        className="toggle-btn"
      />

      {/* Navigation Links */}
      <Collapse isOpen={isOpen} navbar className="nav-collapse">
        <Nav className="ms-auto nav-links" navbar>
          <NavItem className="nav-item">
            <NavLink tag={Link} to="/Graph" className="nav-link">
              Graph
            </NavLink>
          </NavItem>
          <NavItem className="nav-item">
            <NavLink tag={Link} to="/addStaff" className="nav-link">
              Add Staff
            </NavLink>
          </NavItem>
          <NavItem className="nav-item">
            <NavLink tag={Link} to="/manageStaff" className="nav-link">
              Manage Staff
            </NavLink>
          </NavItem>
          <NavItem className="nav-item">
            <NavLink tag={Link} to="/manageUsers" className="nav-link">
              Manage Users
            </NavLink>
          </NavItem>
          <NavItem className="nav-item">
            <NavLink tag={Link} to="/issuesOverview" className="nav-link">
            Issues Overview
            </NavLink>
          </NavItem>
          <NavItem className="nav-item">
            <NavLink
              tag={Link}
              to="/logout"
              className="nav-link"
              onClick={handlelogout}
            >
              Logout
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default AdminHeader;
