import { Container, Row, Col, Table } from "reactstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewIssues } from "../Features/IssueSlice";
import { viewStaff } from "../Features/StaffSlice";
import React from 'react';
const IssuesOverview = () => {
  const dispatch = useDispatch();
  const issues = useSelector((state) => state.issues.issues);

  useEffect(() => {
    dispatch(viewIssues());
    dispatch(viewStaff());
  }, [dispatch]);

  return (
    <Container>
      <Row>
        <Col>
          <h3>Issue List</h3>
          <div className="scrollable-table-container">
            <Table striped>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Building</th>
                  <th>State</th>
                  <th>Priority</th>
                  <th>Created By</th>
                  <th>Assigned To</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(issues) &&
                  issues.map((issue) => (
                    <tr key={issue._id}>
                      <td>{issue.title}</td>
                      <td>{issue.category}</td>
                      <td>{issue.building}</td>
                      <td>{issue.state}</td>
                      <td>{issue.priority}</td>
                      <td>{issue.createdBy?.name || "Unknown"}</td>
                      <td>{issue.assignedTo?.name || "Unassigned"}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default IssuesOverview;
