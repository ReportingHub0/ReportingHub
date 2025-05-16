import { Container, Form, FormGroup, Button, Label } from "reactstrap";
import "../welcome.css";
import "../Register.css";
import logo from "../Images/logo.png";
import supportImg from "../Images/supportImage.png";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchemaValidation } from "../Validations/UserValidation";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { registerUser } from "../Features/UserSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from 'react';
const Register = () => {
const dispatch = useDispatch();
  const navigate = useNavigate();

  const [id, setid] = useState("");
  const [name, setname] = useState("");
  const [role, setrole] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [phoneNumber, setphoneNumber] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation),
  });

  const onSubmit = (data) => {
    try {
      const userData = {
        id: data.id,
        name: data.name,
        role: data.role,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
      };
      console.log("Form data", data);
      alert("Validation all good.");
      dispatch(registerUser(userData));
      navigate("/login")  ;
    } catch (error) {
      console.log("ERROR!");
    }
  };
 

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="image-section">
          <img src={supportImg} alt="Support" className="support-img" />
        </div>

        <div className="register-content">
          <div className="logo-section">
            <img src={logo} alt="Logo" className="logo-img" />
          </div>

          <Form className="register-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="two-column-grid">
              <div className="form-item">
                <Label htmlFor="id">User ID:</Label>
                <input id="id" {...register("id", { onChange: (e) => setid(e.target.value) })} />
                <p className="error">{errors.id?.message}</p>
              </div>

              <div className="form-item">
                <Label htmlFor="name">User Name:</Label>
                <input id="name" {...register("name", { onChange: (e) => setname(e.target.value) })} />
                <p className="error">{errors.name?.message}</p>
              </div>

              <div className="form-item">
                <Label htmlFor="email">Email:</Label>
                <input id="email" {...register("email", { onChange: (e) => setemail(e.target.value) })} />
                <p className="error">{errors.email?.message}</p>
              </div>

              <div className="form-item">
                <Label htmlFor="phoneNumber">Phone Number:</Label>
                <input id="phoneNumber" {...register("phoneNumber", { onChange: (e) => setphoneNumber(e.target.value) })} />
                <p className="error">{errors.phoneNumber?.message}</p>
              </div>

              <div className="form-item">
                <Label htmlFor="password">Password:</Label>
                <input type="password" id="password" {...register("password", { onChange: (e) => setpassword(e.target.value) })} />
                <p className="error">{errors.password?.message}</p>
              </div>

              <div className="form-item">
                <Label htmlFor="confirmPassword">Confirm Password:</Label>
                <input type="password" id="confirmPassword" {...register("confirmPassword", { onChange: (e) => setconfirmPassword(e.target.value) })} />
                <p className="error">{errors.confirmPassword?.message}</p>
              </div>

              <div className="form-item">
                <Label htmlFor="role">Role:</Label>
                <select id="role" {...register("role", { onChange: (e) => setrole(e.target.value) })}>
                  <option value="" disabled hidden>You are</option>
                  <option value="Lecturer">Lecturer</option>
                  <option value="Employee">Employee</option>
                  <option value="Student">Student</option>
                </select>
                <p className="error">{errors.role?.message}</p>
              </div>

              <div className="form-item form-button">
                <Button className="register-btn" type="submit">Register</Button>
                <p className="extra-links">
                  Already have an account? <a href="/login">Login here</a>
                </p>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;