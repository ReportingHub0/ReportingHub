import { useState } from "react";
import { Container, Row, Col, Form, Button } from "reactstrap";
import "../ReportIssueHeader.css";
import { reportIssue } from "../Features/IssueSlice";
import { issueSchemaValidation } from "../Validations/IssueValidation";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React from 'react';
const ReportIssue = () => {
  const user = useSelector((state) => state.users.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, settitle] = useState("");
  const [category, setcategory] = useState("");
  const [dataescription, setdescription] = useState("");
  const [building, setbuilding] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(issueSchemaValidation),
  });

  const onSubmit = (data) => {
    try {
      const issueData = {
        userId: user._id,
        title: data.title,
        category: data.category,
        description: data.description,
        building: data.building,
      };
      console.log("Form data", data);
      alert("Issue Reported.");
      dispatch(reportIssue(issueData));
      navigate("/reports");
    } catch (error) {
      console.log("ERROR!");
    }
  };
  return (
    <div className="report-form-container">
      <div className="form-wrapper">
        <h2 className="form-title">Input Issue</h2>

        <Form className="report-form" onSubmit={handleSubmit(onSubmit)}>
          <label>Issue Title</label>
          <input
            type="text"
            id="title"
            name="title"
            {...register("title", {
              onChange: (e) => settitle(e.target.value),
            })}
          />
          <p className="error">{errors.title?.message}</p>
          <label>Category</label>
          <select
            id="category"
            name="category"
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
            {...register("description", {
              onChange: (e) => setdescription(e.target.value),
            })}
          />
          <p className="error">{errors.description?.message}</p>
          <label>Building</label>
          <select
            id="building"
            name="building"
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
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
};

export default ReportIssue;
