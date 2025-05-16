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
import logo from "../Images/logo.png"; // Adjust path as needed
import "../Admin.css";
import { logout } from "../Features/StaffSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const StaffHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const staff = useSelector((state) => state.staff.staff);

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
          {staff.role === "HelpDesk" && (
            <NavItem className="nav-item">
              <NavLink tag={Link} to="/issues" className="nav-link">
                Issues
              </NavLink>
            </NavItem>
          )}
          {staff.role === "Technical" && (
            <NavItem className="nav-item">
              <NavLink tag={Link} to="/issuesByBuild" className="nav-link">
                Issues By Build
              </NavLink>
            </NavItem>
          )}
          <NavItem className="nav-item">
            <NavLink tag={Link} to="/handledIssues" className="nav-link">
              Handled Issues
            </NavLink>
          </NavItem>
          <NavItem className="nav-item">
            <NavLink tag={Link} to="/staffProfile" className="nav-link">
              Profile
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

export default StaffHeader;
