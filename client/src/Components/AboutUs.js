import React from "react";
import "../Home.css";
import aboutImage from "../Images/Aboutus.png";

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="text-section">
        <h1>About us</h1>
        <h3>Who we are</h3>
        <p>
          We are software engineering students who would like to make the users
          of this site happy with the services added under the supervision of:
        </p>
        <p className="supervisor">Mr. Hansel G Delos Santos</p>
      </div>

      <div className="image-section">
        <img src={aboutImage} alt="About Us" className="about-image" />
      </div>
    </div>
  );
};

export default AboutUs;
