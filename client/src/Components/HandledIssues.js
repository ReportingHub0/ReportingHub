import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { viewIssues, updateIssueDetails } from "../Features/IssueSlice";
import moment from "moment";
import { FaArrowLeftLong } from "react-icons/fa6";
const HandledIssues = () => {
  const dispatch = useDispatch();
  const issues = useSelector((state) => state.issues.issues);
  const staff = useSelector((state) => state.staff.staff);

  const [selectedIssue, setSelectedIssue] = useState(null);
  const [newState, setNewState] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    dispatch(viewIssues());
  }, [dispatch]);

  const issuesByBuild =
    staff && staff._id
      ? issues.filter((issue) => issue.assignedTo === staff._id)
      : [];
  const handleUpdateClick = (issue) => {
    setSelectedIssue(issue);
    setNewState(issue.state || "pending");
    setComment(issue.comment || "");
  };

  const handleSave = async () => {
    await dispatch(
      updateIssueDetails({
        id: selectedIssue._id,
        state: newState,
        comment,
        staffId: staff._id,
      })
    );
    alert("Issue updated successfully!");
    setSelectedIssue(null);
  };

  return (
    <div className="reports-container">
      <Container>
        <Row>
          <Col md={selectedIssue ? 8 : 12}>
            <h2 className="report-title mb-4">Handled Issues</h2>
            <div className="scrollable-table-container">
              <Table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Building</th>
                    <th>Date</th>
                    <th>Last Update</th>
                    <th>State</th>
                    <th>Priority</th>
                    <th>Comment</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {issuesByBuild.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="text-center text-muted">
                        No issues assigned to you.
                      </td>
                    </tr>
                  ) : (
                    issuesByBuild.map((issue) => (
                      <tr key={issue._id}>
                        <td>{issue.title}</td>
                        <td>{issue.category}</td>
                        <td>{issue.description}</td>
                        <td>{issue.building}</td>
                        <td>{moment(issue.createdAt).format("DD-MM-YYYY")}</td>
                        <td>{moment(issue.updatedAt).format("DD-MM-YYYY")}</td>
                        <td>{issue.state}</td>
                        <td>{issue.priority}</td>
                        <td>{issue.comment}</td>
                        <td>
                          <Button
                            className="btn btn-primary"
                            onClick={() => handleUpdateClick(issue)}
                          >
                            Update
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </div>
          </Col>

          {selectedIssue && (
            <Col md={4}>
              <FaArrowLeftLong
                className="cancle-icon"
                onClick={() => setSelectedIssue(null)}
              />
              <h4 className="text-center">Update Issue</h4>
              <Form className="p-3 border rounded bg-light">
                <FormGroup>
                  <Label>Title</Label>
                  <Input value={selectedIssue.title} disabled />
                </FormGroup>

                <FormGroup>
                  <Label>State</Label>
                  <Input
                    type="select"
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="inProgress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label>Comment</Label>
                  <Input
                    type="textarea"
                    rows="3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add comment here"
                  />
                </FormGroup>

                <Button color="success" className="w-100" onClick={handleSave}>
                  Save
                </Button>
              </Form>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default HandledIssues;
