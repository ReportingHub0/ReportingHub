import {
  userIssues,
  deleteIssue,
  updateIssue,
  viewIssues,
} from "../Features/IssueSlice";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Table, Button, Form } from "reactstrap";
import moment from "moment";
import { useEffect, useState } from "react";
import "../ReportIssueHeader.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { issueSchemaValidation } from "../Validations/IssueValidation";
import { FaArrowLeftLong } from "react-icons/fa6";
import React from 'react';
const Reports = () => {
  const issues = useSelector((state) => state.issues.issues);
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

  const [showEdit, setshowEdit] = useState(false);

  const [issueId, setissueId] = useState("");
  const [title, settitle] = useState(issues.title || "");
  const [category, setcategory] = useState(issues.category || "");
  const [description, setdescription] = useState(issues.description || "");
  const [building, setbuilding] = useState(issues.building || "");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(issueSchemaValidation),
  });

  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to delete this Issue information?")
    ) {
      dispatch(deleteIssue(id));
    }
  };

  const handleUpdate = async (data) => {
    const issueData = {
      userId: user._id,
      title: data.title,
      category: data.category,
      description: data.description,
      building: data.building,
    };
    await dispatch(updateIssue({ issueData, issue_id: issueId }));

    alert("Issue Updated.");
    setshowEdit(false);
  };

  useEffect(() => {
    if (user?._id) {
      dispatch(userIssues(user._id));
    }
  }, [dispatch, user]);
  return (
    <Container className="reports-container">
      <h2 className="report-title mb-4">Reports</h2>
      <Row>
        <Col md={showEdit ? 8 : 12}>
          {issues?.length === 0 ? (
            <h5>No issues were found for this user</h5>
          ) : (
            <Table className="scrollable-table-container">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Building</th>
                  <th>Date</th>
                  <th>State</th>
                  <th colSpan={2}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {issues
                  .filter((issue) => issue !== null && issue !== undefined)
                  .map((issue) => (
                    <tr key={issue._id}>
                      <td>{issue.title}</td>
                      <td>{issue.category}</td>
                      <td>{issue.description}</td>
                      <td>{issue.building}</td>
                      <td>{moment(issue.createdAt).format("DD-MM-YYYY")}</td>
                      <td>{issue.state}</td>
                      <td>
                        <Button
                          color="primary"
                          onClick={() => {
                            settitle(issue.title);
                            setdescription(issue.description);
                            setbuilding(issue.building);
                            setcategory(issue.category);
                            setissueId(issue._id);
                            setshowEdit(true);
                          }}
                        >
                          Update
                        </Button>
                      </td>
                      <td>
                        <Button
                          color="danger"
                          onClick={() => handleDelete(issue._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          )}
        </Col>

        {showEdit && (
          <Col md={4} className=" border-start">
            <div className="report-form-container">
              <div className="form-wrapper">
                <FaArrowLeftLong
                  onClick={() => setshowEdit(false)}
                  className="cancle-icon"
                />
                <h2 className="form-title">Update Issue</h2>

                <Form
                  className="report-form"
                  onSubmit={handleSubmit(handleUpdate)}
                >
                  <label>Issue Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    {...register("title", {
                      onChange: (e) => settitle(e.target.value),
                    })}
                  />
                  <p className="error">{errors.title?.message}</p>
                  <label>Category</label>
                  <select
                    id="category"
                    name="category"
                    value={category}
                    {...register("category", {
                      onChange: (e) => setcategory(e.target.value),
                    })}
                  >
                    <option>Select</option>
                    <option value="Hardware">Hardware</option>
                    <option value="Software">Software</option>
                    <option value="Network">Network</option>
                  </select>
                  <p className="error">{errors.category?.message}</p>
                  <label>Description</label>
                  <input
                    type="textarea"
                    placeholder="Describe the issue"
                    id="description"
                    name="description"
                    value={description}
                    {...register("description", {
                      onChange: (e) => setdescription(e.target.value),
                    })}
                  />
                  <p className="error">{errors.description?.message}</p>
                  <label>Building</label>
                  <select
                    id="building"
                    name="building"
                    value={building}
                    {...register("building", {
                      onChange: (e) => setbuilding(e.target.value),
                    })}
                  >
                    <option>Select</option>
                    <option value="IT">IT</option>
                    <option value="BSIT">BSIT</option>
                  </select>
                  <p className="error">{errors.building?.message}</p>
                  <button type="submit" className="submit-btn">
                    Update
                  </button>
                </Form>
              </div>
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Reports;
