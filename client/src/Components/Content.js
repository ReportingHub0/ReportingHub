import React from "react";
import "../Home.css";
import strategyIcon from "../Images/strategy.png";
import solutionIcon from "../Images/solution.png";
import brandingIcon from "../Images/branding.png";
import supportIcon from "../Images/support.png";

const Content = () => {
  return (
    <div className="content-container">
      <div className="benefits-section">
        <h1>Benefits of the ReportingHub Project</h1>

        <h3>Enhanced Efficiency and User Experience</h3>
        <p>
          • Streamlines the reporting and resolution of technical issues,
          reducing downtime, boosting productivity, and providing a
          user-friendly platform that enhances communication accountability, and
          transparency.
        </p>

        <h3>Long-Term Impact and Sustainability</h3>
        <p>
          • Enables data-driven insights for proactive solutions, optimizes
          resource allocation and supports scalability and sustainable
          infrastructure management to ensure continuous improvement and
          adaptability.
        </p>
      </div>

      {/* Service*/}
      <div className="services-section">
        <h2>Our Service</h2>

        <div className="services-container">
          <div className="service-box">
            <img
              src={strategyIcon}
              alt="Global Strategy"
              className="service-icon"
            />
            <h3>Global Strategy</h3>
            <p>
              The ReportingHub project’s global strategy focuses on creating
              management in education, starting with a university pilot and
              scaling globally, ensuring efficiency, centralization, and
              long-term sustainability.
            </p>
          </div>

          <div className="service-box">
            <img
              src={solutionIcon}
              alt="Global Solution"
              className="service-icon"
            />
            <h3>Global Solution</h3>
            <p>
              Providing a scalable, centralized platform for efficient technical
              issue reporting and resolution in educational institutions. It
              enhances communication, minimizes downtime and leverages
              data-driven insights to address recurring problems ensuring
              adaptability and long-term sustainability.
            </p>
          </div>
        </div>

        <div className="services-container">
          <div className="service-box">
            <img src={brandingIcon} alt="Branding" className="service-icon" />
            <h3>Branding</h3>
            <p>
              The branding of the ReportingHub project focuses on creating a
              modern reliable, and user-centric platform designed to improve
              technical issue reporting and resolution within educational
              institutions.
            </p>
          </div>

          <div className="service-box">
            <img src={supportIcon} alt="Support" className="service-icon" />
            <h3>Support</h3>
            <p>
              Support for the ReportingHub project includes user assistance
              through a help center, live chat, and automated notifications,
              ensuring efficient issue reporting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
