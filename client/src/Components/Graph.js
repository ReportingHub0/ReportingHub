import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Container, Row, Col } from "reactstrap";
import { viewIssues } from "../Features/IssueSlice";
import React from "react";

const COLORS = ["#00bcd4", "#ff9800", "#e91e63", "#4caf50", "#9c27b0"];

const Graph = () => {
  const dispatch = useDispatch();
  const issues = useSelector((state) => state.issues.issues);

  useEffect(() => {
    dispatch(viewIssues());
  }, [dispatch]);

  const countByField = (field) => {
    const map = {};
    for (let issue of issues) {
      const key = issue[field] || "Unknown";
      map[key] = (map[key] || 0) + 1;
    }
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  };

  const countByStaff = () => {
    const map = {};
    for (let issue of issues) {
      const name = issue.assignedTo?.name || "Unassigned";
      map[name] = (map[name] || 0) + 1;
    }
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  };

  const countUsersByRole = () => {
    const map = {};
    for (let issue of issues) {
      const role = issue.createdBy?.role || "Unknown";
      map[role] = (map[role] || 0) + 1;
    }
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  };

  const totalUsers = countUsersByRole().reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <Container className="graph-section">
      <h3 className="graph-title">Issue Statistics</h3>

      <Row>
        <Col md={6} className="card-box">
          <h5 className="card-title">Issues by State</h5>
          <PieChart width={300} height={250}>
            <Pie
              data={countByField("state")}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
            >
              {countByField("state").map((entry, index) => (
                <Cell
                  key={`cell-state-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Col>

        <Col md={6} className="card-box">
          <h5 className="card-title">Issues by Building</h5>
          <BarChart width={350} height={250} data={countByField("building")}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#00bcd4" />
          </BarChart>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6} className="card-box">
          <h5 className="card-title">Issues by Priority</h5>
          <PieChart width={300} height={250}>
            <Pie
              data={countByField("priority")}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
            >
              {countByField("priority").map((entry, index) => (
                <Cell
                  key={`cell-priority-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Col>

        <Col md={6} className="card-box">
          <h5 className="card-title">Issues Handled by Each Technician</h5>
          <BarChart width={350} height={250} data={countByStaff()}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#e91e63" />
          </BarChart>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6} className="card-box">
          <h5 className="card-title">Issues by User Type</h5>
          <PieChart width={300} height={250}>
            <Pie
              data={countUsersByRole()}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
            >
              {countUsersByRole().map((entry, index) => (
                <Cell
                  key={`cell-role-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Col>

        <Col
          md={6}
          className="total-box d-flex align-items-center justify-content-center flex-column"
        >
          <h4>Total Users Reported Issues</h4>
          <h2>{totalUsers}</h2>
        </Col>
      </Row>
    </Container>
  );
};

export default Graph;
