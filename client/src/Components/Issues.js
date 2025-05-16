import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { viewIssues, updateIssueDetails } from "../Features/IssueSlice";
import moment from "moment";
const Issues = () => {
  const dispatch = useDispatch();
  const issues = useSelector((state) => state.issues.issues);
  const staff = useSelector((state) => state.staff.staff);

  const [localPriorities, setLocalPriorities] = useState({});
  const [localStates, setLocalStates] = useState({});

  const [searchTerm, setSearchTerm] = useState("");
  const [filterState, setFilterState] = useState("All");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    dispatch(viewIssues());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(issues)) {
      const initialStates = {};
      const initialPriorities = {};

      issues.forEach((issue) => {
        initialStates[issue._id] = issue.state;
        initialPriorities[issue._id] = issue.priority;
      });

      setLocalStates(initialStates);
      setLocalPriorities(initialPriorities);
    }
  }, [issues]);

  const handlePriorityChange = (e, issueId) => {
    setLocalPriorities((prev) => ({
      ...prev,
      [issueId]: e.target.value,
    }));
  };

  const handleSelectChange = (e, issueId) => {
    setLocalStates((prev) => ({
      ...prev,
      [issueId]: e.target.value,
    }));
  };

  const handleUpdateDetails = async (e, issueId) => {
    const newPriority = localPriorities[issueId];
    const newState = localStates[issueId];
    await dispatch(
      updateIssueDetails({
        id: issueId,
        staffId: staff._id,
        priority: newPriority,
        state: newState,
      })
    );
    alert("Issue Details updated successfully!");
  };

  const handleDelete = (issueId) => {
    // Add your delete logic here
    console.log("Delete", issueId);
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleFilterChange = (e) => setFilterState(e.target.value);
  const handleSortByDate = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredIssues = issues
    ?.filter((issue) => issue && issue.title)
    .filter((issue) =>
      issue.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    .filter((issue) =>
      filterState === "All"
        ? true
        : issue.state?.toLowerCase() === filterState.toLowerCase()
    )
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  return (
    <div className="reports-container">
      <Container>
        <h2 className="report-title mb-4">Issues</h2>

        {/* Search and Filter Row */}
        <Row className="mb-3">
          <Col md={4}>
            <input
              type="text"
              className="form-control"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Col>
          <Col md={4}>
            <select
              className="form-select"
              value={filterState}
              onChange={handleFilterChange}
            >
              <option value="All">All States</option>
              <option value="Pending">Pending</option>
              <option value="In-Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </Col>
        </Row>

        {/* Table */}
        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Building</th>
                  <th onClick={handleSortByDate} style={{ cursor: "pointer" }}>
                    Date {sortOrder === "asc" ? "↑" : "↓"}
                  </th>
                  <th>State</th>
                  <th>Priority</th>
                  <th colSpan={2}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredIssues?.map((issue) =>
                  issue && issue._id ? (
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
                      <td>
                        <select
                          className="form-select"
                          value={localPriorities[issue._id] || "low"}
                          onChange={(e) => handlePriorityChange(e, issue._id)}
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(issue._id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={(e) => handleUpdateDetails(e, issue._id)}
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ) : null
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Issues;
