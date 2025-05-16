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
  ButtonGroup,
} from "reactstrap";
import "../welcome.css";
import supportImage from "../Images/supportImage.png";
import google from "../Images/google.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Features/UserSlice";
import { adminLogin } from "../Features/AdminSlice";
import { staffLogin } from "../Features/StaffSlice";
import logo from "../Images/logo.png";

const Login = () => {
  const user = useSelector((state) => state.users.user);
  const admin = useSelector((state) => state.admin.admin);
  const staff = useSelector((state) => state.staff.staff);

  const isSuccess = useSelector((state) => state.users.isSuccess);
  const isAdminSuccess = useSelector((state) => state.admin.isSuccess);
  const isStaffSuccess = useSelector((state) => state.staff.isSuccess);

  const isError = useSelector((state) => state.users.isError);
  const isAdminError = useSelector((state) => state.admin.isError);
  const isStaffError = useSelector((state) => state.staff.isError);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("user");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    const userData = {
      email: email,
      password: password,
    };

    switch (loginType) {
      case "admin":
        dispatch(adminLogin(userData));
        break;
      case "staff":
        dispatch(staffLogin(userData));
        break;
      default:
        dispatch(login(userData));
        break;
    }
  };

  useEffect(() => {
    if (isSuccess && user) {
      navigate("/reports");
    }

    if (isAdminSuccess && admin) {
      navigate("/Graph");
    }

    if (isStaffSuccess && staff) {
      navigate("/issues");
    }

    if (isError || isAdminError || isStaffError) {
      console.log("Login failed");
    }
  }, [
    user,
    admin,
    staff,
    isSuccess,
    isAdminSuccess,
    isStaffSuccess,
    isError,
    isAdminError,
    isStaffError,
    navigate,
  ]);


  return (
    <div className="login-container">
      <div className="login-box">
        <div className="image-container">
          <img src={supportImage} alt="Support" className="support-image" />
        </div>
        <div className="form-container">
          <h2 className="logo-text">ReportingHub</h2>
          <ButtonGroup className="mb-3 w-100">
            <Button
              color={loginType === "user" ? "primary" : "secondary"}
              onClick={() => setLoginType("user")}
            >
              User
            </Button>
            <Button
              color={loginType === "admin" ? "primary" : "secondary"}
              onClick={() => setLoginType("admin")}
            >
              Admin
            </Button>
            <Button
              color={loginType === "staff" ? "primary" : "secondary"}
              onClick={() => setLoginType("staff")}
            >
              Staff
            </Button>
          </ButtonGroup>
          <Form>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <Button className="login-button" onClick={handleLogin}>
              Login
            </Button>
          </Form>
          {loginType === "user" && (
            <p className="extra-links">
              No account? <Link to="/register">Create one</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
