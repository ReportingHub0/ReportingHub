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
import { viewStaff, deleteStaff } from "../Features/StaffSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { staffSchemaValidation } from "../Validations/StaffValidation";
import { updateStaff } from "../Features/StaffSlice";
import { FaArrowLeftLong } from "react-icons/fa6";
import React from "react";
const ManageStaff = () => {
  const staff = useSelector((state) => state.staff.staff);

  const [showEdit, setShowEdit] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [id, setid] = useState(staff?.id || "");
  const [name, setname] = useState(staff?.name || "");
  const [email, setemail] = useState(staff?.email || "");
  const [password, setpassword] = useState(staff?.password || "");
  const [confirmPassword, setconfirmPassword] = useState(staff?.password || "");
  const [phoneNumber, setphoneNumber] = useState(staff?.phoneNumber || "");
  const [building, setbuilding] = useState(staff?.building || "");
  const [role, setrole] = useState(staff?.role || "");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(staffSchemaValidation),
  });
  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to delete this staff information?")
    ) {
      dispatch(deleteStaff(id));
    }
  };

  const handleUpdate = async (data) => {
    const staffData = {
      id: data.id,
      name: data.name,
      role: data.role,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      building: data.building,
    };
    await dispatch(updateStaff({ staffData, originalEmail: email }));
    await dispatch(viewStaff());
    setShowEdit(false);
  };

  useEffect(() => {
    dispatch(viewStaff());
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
                  <th>Building</th>

                  <th colSpan={2}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(staff) &&
                  staff.map(
                    (member, index) =>
                      member && (
                        <tr key={member._id || index}>
                          <td>{member.id || member._id || "N/A"}</td>
                          <td>{member.name}</td>
                          <td>{member.email}</td>
                          <td>{member.role}</td>
                          <td>{member.phoneNumber}</td>
                          <td>{member.building}</td>
                          <td>
                            <button
                              onClick={() => {
                                handleDelete(member._id);
                              }}
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() => {
                                setid(member.id || member._id || "");
                                setname(member.name);
                                setemail(member.email);
                                setpassword(member.password);
                                setconfirmPassword(member.password);
                                setphoneNumber(member.phoneNumber);
                                setbuilding(member.building);
                                setrole(member.role);
                                setShowEdit(true);
                              }}
                              className="btn btn-primary"
                            >
                              Update
                            </button>
                          </td>
                        </tr>
                      )
                  )}
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
            <h3 className="text-center">Update Staff Member</h3>

            <Form className="add-form" onSubmit={handleSubmit(handleUpdate)}>
              <Row>
                <Col>
                  <input
                    type="text"
                    name="StaffID"
                    placeholder="Staff ID"
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
                    name="building"
                    placeholder="Building No"
                    value={building}
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
                <Row></Row>
                <Col>
                  <select
                    name="role"
                    id="role"
                    value={role}
                    {...register("role", {
                      onChange: (e) => setrole(e.target.value),
                    })}
                  >
                    <option>Select Staff Role</option>
                    <option value="HelpDesk"> HelpDesk</option>
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
                Update
              </Button>
            </Form>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default ManageStaff;
