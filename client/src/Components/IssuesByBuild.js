import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { viewIssues, updateIssueDetails } from "../Features/IssueSlice";
import moment from "moment";
const IssuesByBuild = () => {
  const dispatch = useDispatch();
  const issues = useSelector((state) => state.issues.issues);
  const staff = useSelector((state) => state.staff.staff);

  const [localStates, setLocalStates] = useState({});

  useEffect(() => {
    dispatch(viewIssues());
  }, [dispatch]);

  useEffect(() => {
    const initialStates = {};
    issues.forEach((issue) => {
      initialStates[issue._id] = issue.state;
    });
    setLocalStates(initialStates);
  }, [issues]);

  const issuesByBuild = issues.filter(
    (issue) => issue.building === staff.building && issue.state === "pending"
  );

  const handleSelectChange = (e, issueId) => {
    setLocalStates((prev) => ({
      ...prev,
      [issueId]: e.target.value,
    }));
  };

  const handleUpdateDetails = async (e, issueId) => {
    const newState = localStates[issueId];

    await dispatch(
      updateIssueDetails({
        id: issueId,
        state: newState,
        staffId: staff._id,
      })
    );

    alert("Issue state updated successfully!");
  };

  return (
    <div className="reports-container">
      <Container>
        <h2 className="report-title mb-4">Issues</h2>
        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Building</th>
                  <th>Date</th>
                  <th>State</th>
                  <th>Priority</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {issuesByBuild?.map((issue) => (
                  <tr key={issue._id}>
                    <td>{issue.title}</td>
                    <td>{issue.category}</td>
                    <td>{issue.description}</td>
                    <td>{issue.building}</td>
                    <td>{moment(issue.createdAt).format("DD-MM-YYYY")}</td>
                    <td>
                      <select
                        className="form-select"
                        value={localStates[issue._id] || "pending"}
                        onChange={(e) => handleSelectChange(e, issue._id)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In-Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                    <td>{issue.priority}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={(e) => handleUpdateDetails(e, issue._id)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default IssuesByBuild;
