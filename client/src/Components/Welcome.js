import React from "react";
import { Button, Container, Row, Col } from "reactstrap";

import supportImage from "../Images/supportImage.png";

const Welcome = () => {
  return (
    <div className="welcome-container">
      <Container className="d-flex align-items-center justify-content-center vh-100">
        <Row className="welcome-box shadow-lg p-4 rounded">
          <Col md={6} className="d-flex align-items-center">
            <img src={supportImage} alt="Support" className="img-fluid" />
          </Col>

          <Col
            md={6}
            className="text-center d-flex flex-column justify-content-center"
          >
            <h1 className="welcome-text">Welcome!</h1>
            <Button color="secondary" className="mb-3 btn-lg">
              Log In
            </Button>
            <Button color="secondary" className="btn-lg">
              Register
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Welcome;
