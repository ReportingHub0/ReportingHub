import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { Container, Form, FormGroup, Button, Label } from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { staffSchemaValidation } from "../Validations/StaffValidation";
import { updateStaffProfile } from "../Features/StaffSlice";

const StaffProfile = () => {
  const staff = useSelector((state) => state.staff.staff);
  const [showEdit, setShowEdit] = useState(false);

  // form states
  const [name, setname] = useState(staff?.name || "");
  const [phoneNumber, setphoneNumber] = useState(staff?.phoneNumber || "");
  const [password, setpassword] = useState(staff?.password || "");
  const [confirmPassword, setconfirmPassword] = useState(staff.password || "");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(staffSchemaValidation),
  });

  const dispatch = useDispatch();

  const handleUpdate = (e) => {
    e.preventDefault();
    const staffData = {
      email: staff.email,
      name,
      phoneNumber,
      password,
    };
    dispatch(updateStaffProfile(staffData));
    setShowEdit(false);
  };

  return (
    <div className="profile-con">
      {/* Profile part */}
      <div className="profile-card">
        <h2 className="profile-title">Profile</h2>
        <FaEdit
          title="Edit Profile"
          onClick={() => {
            setShowEdit(true);
          }}
          className="edit-icon"
        />
        <div className="profile-avatar-container">
          <img
            src="https://i.postimg.cc/52SNZ0X8/Profile.jpg"
            alt="UserAvatar"
            className="profile-avatar"
          />
        </div>
        <p>
          <strong>Name:</strong> {staff?.name}
        </p>
        <p>
          <strong>ID:</strong> {staff.id}
        </p>
        <p>
          <strong>Role:</strong> {staff.role}
        </p>
        <p>
          <strong>Email:</strong> {staff?.email}
        </p>
        <p>
          <strong>Phone Number:</strong> {staff?.phoneNumber}
        </p>
      </div>

      {/* update part */}
      {showEdit && (
        <div className="edit-card">
          <h3 className="profile-title">Update Staff Information</h3>
          <Form onSubmit={handleUpdate}>
            <p>
              <strong>Name:</strong>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Staff Name"
                {...register("name", {
                  onChange: (e) => setname(e.target.value),
                })}
              />
            </p>
            <p className="error">{errors.name?.message}</p>
            <p>
              <strong>Password:</strong>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                {...register("password", {
                  onChange: (e) => setpassword(e.target.value),
                })}
              />
            </p>
            <p className="error">{errors.password?.message}</p>
            <p>
              <strong>Confirm Password:</strong>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  onChange: (e) => setconfirmPassword(e.target.value),
                })}
              />
            </p>
            <p className="error">{errors.confirmPassword?.message}</p>
            <p>
              <strong>Phone Number:</strong>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone number"
                {...register("phoneNumber", {
                  onChange: (e) => setphoneNumber(e.target.value),
                })}
              />
            </p>
            <p className="error">{errors.phoneNumber?.message}</p>
            <Button className="register-btn" block>
              Update
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default StaffProfile;
