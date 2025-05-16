import React from "react";
import "../Home.css";
import arrowIcon from "../Images/arrow.png";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          Streamlining Issue Reporting <br /> for Better Solutions
        </h1>
        <Link to="/login" className="hero-button">
          Get Start Now
          <img src={arrowIcon} alt="arrow" className="arrow-icon" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
