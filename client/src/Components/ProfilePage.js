import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { updateUserProfile } from "../Features/UserSlice";
import { Container, Form, FormGroup, Button, Label } from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchemaValidation } from "../Validations/UserValidation";
import { useForm } from "react-hook-form";

const ProfilePage = () => {
  const user = useSelector((state) => state.users.user);
  const [showEdit, setShowEdit] = useState(false);

  // form states
  const [name, setname] = useState(user?.name || "");
  const [phoneNumber, setphoneNumber] = useState(user?.phoneNumber || "");
  const [password, setpassword] = useState(user?.password || "");
  const [confirmPassword, setconfirmPassword] = useState(user.password || "");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation),
  });

  const dispatch = useDispatch();

  const handleUpdate = (e) => {
    e.preventDefault();
    const userData = {
      email: user.email,
      name,
      phoneNumber,
      password,
    };
    dispatch(updateUserProfile(userData));
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
          <strong>Name:</strong> {user?.name}
        </p>
        <p>
          <strong>ID:</strong> {user.id}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Phone Number:</strong> {user?.phoneNumber}
        </p>
      </div>

      {/* update part */}
      {showEdit && (
        <div className="edit-card">
          <h3 className="profile-title">Update User Information</h3>
          <Form onSubmit={handleUpdate}>
            <p>
              <strong>Name:</strong>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="User Name"
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

export default ProfilePage;
