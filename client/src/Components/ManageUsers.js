import {
  Container,
  Row,
  Col,
  Form,
  Label,
  Input,
  FormGroup,
  Button,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { viewUsers, deleteUser, updateUser } from "../Features/UserSlice";
import { userSchemaValidation } from "../Validations/UserValidation";
import { FaArrowLeftLong } from "react-icons/fa6";
import React from 'react';
const ManageUsers = () => {
  const users = useSelector((state) => state.users.user);

  const [showEdit, setShowEdit] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [id, setid] = useState(users?.id || "");
  const [name, setname] = useState(users?.name || "");
  const [email, setemail] = useState(users?.email || "");
  const [password, setpassword] = useState(users?.password || "");
  const [confirmPassword, setconfirmPassword] = useState(users?.password || "");
  const [phoneNumber, setphoneNumber] = useState(users?.phoneNumber || "");
  const [role, setrole] = useState(users?.role || "");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation),
  });
  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to delete this User information?")
    ) {
      dispatch(deleteUser(id));
    }
  };

  const handleUpdate = async (data) => {
    const userData = {
      id: data.id,
      name: data.name,
      role: data.role,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
    };
    await dispatch(updateUser({ userData, originalEmail: email }));
    await dispatch(viewUsers());
    setShowEdit(false);
  };

  useEffect(() => {
    dispatch(viewUsers());
    setShowEdit(false);
  }, [dispatch]);

  return (
    <Container>
      <Row>
        <Col md={8}>
          <div className="scrollable-table-container">
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Phone Number</th>

                  <th colSpan={2}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(users) &&
                  users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.phoneNumber}</td>
                      <td>
                        <button
                          onClick={() => {
                            handleDelete(user._id);
                          }}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            setid(user.id);
                            setname(user.name);
                            setemail(user.email);
                            setpassword(user.password);
                            setconfirmPassword(user.password);
                            setphoneNumber(user.phoneNumber);
                            setrole(user.role);
                            setShowEdit(true);
                          }}
                          className="btn btn-primary"
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </Col>
        {showEdit && (
          <Col md={4}>
            <FaArrowLeftLong
              onClick={() => setShowEdit(false)}
              className="cancle-icon"
            />
            <h3 className="text-center">Update User Info</h3>
            <Form className="add-form" onSubmit={handleSubmit(handleUpdate)}>
              <Row>
                <Col>
                  <input
                    type="text"
                    name="id"
                    placeholder="User ID"
                    value={id}
                    {...register("id", {
                      onChange: (e) => setid(e.target.value),
                    })}
                  />

                  <p className="error">{errors.id?.message}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    {...register("name", {
                      onChange: (e) => setname(e.target.value),
                    })}
                  />

                  <p className="error">{errors.name?.message}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    {...register("email", {
                      onChange: (e) => setemail(e.target.value),
                    })}
                  />
                  <p className="error">{errors.email?.message}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    {...register("password", {
                      onChange: (e) => setpassword(e.target.value),
                    })}
                  />

                  <p className="error">{errors.password?.message}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    {...register("confirmPassword", {
                      onChange: (e) => setconfirmPassword(e.target.value),
                    })}
                  />
                  <p className="error">{errors.confirmPassword?.message}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    {...register("phoneNumber", {
                      onChange: (e) => setphoneNumber(e.target.value),
                    })}
                  />
                  <p className="error">{errors.phoneNumber?.message}</p>
                </Col>
              </Row>

              <Row>
                <Col>
                  <select
                    name="role"
                    id="role"
                    value={role}
                    {...register("role", {
                      onChange: (e) => setrole(e.target.value),
                    })}
                  >
                    <option>Select User Role</option>
                    <option value="Lecturer">Lecturer</option>
                    <option value="Employee">Employee</option>
                    <option value="Student">Student</option>
                  </select>
                  <p className="error">{errors.role?.message}</p>
                </Col>
              </Row>
              <Button
                type="submit"
                className="submit-btn w-100 mt-3"
                color="primary"
              >
                Update
              </Button>
            </Form>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default ManageUsers;
