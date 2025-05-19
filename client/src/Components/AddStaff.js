import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Label } from "reactstrap";
import "../Admin.css"; // Import CSS for styling
import Background from "../Images/Background.png"; // Adjust path if needed
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addStaff } from "../Features/StaffSlice";
import { staffSchemaValidation } from "../Validations/StaffValidation";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const AddStaff = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [id, setid] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [building, setbuilding] = useState("");
  const [role, setrole] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(staffSchemaValidation),
  });

  const onSubmit = (data) => {
    try {
      const staffData = {
        id: data.id,
        name: data.name,
        role: data.role,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        building: data.building,
      };
      console.log("Form data", data);
      alert("Staff Added.");
      dispatch(addStaff(staffData));
      navigate("/manageStaff");
    } catch (error) {
      console.log("ERROR!");
    }
  };

  return (
    <Container fluid className="add-form-container">
      <Row className="justify-content-center">
        <Col md={8}>
          <h3 className="text-center">Add Staff Team</h3>
          <Form className="add-form" onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={6}>
                <Label>Staff ID:</Label>
                <input
                  type="text"
                  name="StaffID"
                  {...register("id", {
                    onChange: (e) => setid(e.target.value),
                  })}
                />
                <p className="error">{errors.id?.message}</p>
              </Col>
              <Col md={6}>
                <Label>Name:</Label>
                <input
                  type="text"
                  name="name"
                  {...register("name", {
                    onChange: (e) => setname(e.target.value),
                  })}
                />
                <p className="error">{errors.name?.message}</p>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Label>Email</Label>
                <input
                  type="email"
                  name="email"
                  {...register("email", {
                    onChange: (e) => setemail(e.target.value),
                  })}
                />
                <p className="error">{errors.email?.message}</p>
              </Col>
              <Col md={6}>
                <Label>Password:</Label>
                <input
                  type="password"
                  name="password"
                  {...register("password", {
                    onChange: (e) => setpassword(e.target.value),
                  })}
                />
                <p className="error">{errors.password?.message}</p>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Label>Confirm Password:</Label>
                <input
                  type="password"
                  name="confirmPassword"
                  {...register("confirmPassword", {
                    onChange: (e) => setconfirmPassword(e.target.value),
                  })}
                />
                <p className="error">{errors.confirmPassword?.message}</p>
              </Col>
              <Col md={6}>
                <Label>Phone Number:</Label>
                <input
                  type="tel"
                  name="phoneNumber"
                  {...register("phoneNumber", {
                    onChange: (e) => setphoneNumber(e.target.value),
                  })}
                />
                <p className="error">{errors.phoneNumber?.message}</p>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Label>Building:</Label>
                <select
                  name="building"
                  {...register("building", {
                    onChange: (e) => setbuilding(e.target.value),
                  })}
                >
                  <option>Select Building</option>
                  <option value="IT">IT</option>
                  <option value="BSIT">BSIT</option>
                </select>
                <p className="error">{errors.building?.message}</p>
              </Col>
              <Col md={6}>
                <Label>Staff Role</Label>
                <select
                  name="role"
                  {...register("role", {
                    onChange: (e) => setrole(e.target.value),
                  })}
                >
                  <option>Select Staff Role</option>
                  <option value="HelpDesk">HelpDesk</option>
                  <option value="Technical">Technical</option>
                </select>
                <p className="error">{errors.role?.message}</p>
              </Col>
            </Row>
            <Button
              type="submit"
              className="submit-btn w-100 mt-3"
              color="primary"
            >
              Add
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddStaff;
