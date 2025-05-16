import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import "../welcome.css";
import supportImage from "../Images/supportImage.png";
import google from "../Images/google.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../Features/UserSlice";
import { adminLogin } from "../Features/AdminSlice";
import { staffLogin } from "../Features/StaffSlice";
const Login = () => {
  const user = useSelector((state) => state.users.user);
  const isSuccess = useSelector((state) => state.users.isSuccess);
  const isError = useSelector((state) => state.users.isError);

  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    const userData = {
      email: email,
      password: password,
    };
    dispatch(login(userData));
  };

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
    if (isSuccess && user) {
      if (user.role === "Admin") {
        navigate("/addStaff");
      } else {
        navigate("/reports");
      }
    }
  }, [user, isError, isSuccess, navigate]);
  return (
    <div className="login-container">
      <Container className="login-box">
        <Row className="align-items-center">
          <Col md={6} className="image-container">
            <img src={supportImage} alt="Support" className="support-image" />
          </Col>

          <Col md={6} className="form-container">
            <h2 className="logo-text">ReportingHub</h2>

            <Form>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => setemail(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => setpassword(e.target.value)}
                />
              </FormGroup>
              <Button className="login-button" onClick={handleLogin}>
                Log in
              </Button>
            </Form>

            <p className="extra-links">
              No account? <Link to="/register">Create one</Link>
            </p>
            <p>
              <Link href="/stafflogin" className="staff-link">
                Staff Login
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
