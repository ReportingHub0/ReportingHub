import "./App.css";
import Footer from "./Components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "reactstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./Components/Home";
import Welcome from "./Components/Welcome";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ReportIssue from "./Components/ReportIssue";
import AboutUs from "./Components/AboutUs";
import Content from "./Components/Content";
import Logout from "./Components/Logout";
import Graph from "./Components/Graph";
import AddStaff from "./Components/AddStaff";
import Reports from "./Components/Reports";
import ManageStaff from "./Components/ManageStaff";
import Issues from "./Components/Issues";
import ProfilePage from "./Components/ProfilePage";
import ManageUsers from "./Components/ManageUsers";
import IssuesByBuild from "./Components/IssuesByBuild";
import HandledIssues from "./Components/HandledIssues";
import Headers from "./Components/Headers";
import IssuesOverview from "./Components/IssuesOverview";
import StaffProfile from "./Components/StaffProfile";
import React from "react";
const AppContent = () => {
  const location = useLocation();
  const hiddenRoutes = ["/login", "/register"];
  const hideHeaderFooter = hiddenRoutes.includes(location.pathname);

  return (
    <>
      {!hideHeaderFooter && (
        <Row>
          <Headers />
        </Row>
      )}

      <Row>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reportIssue" element={<ReportIssue />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/content" element={<Content />} />
          <Route path="/Graph" element={<Graph />} />
          <Route path="/addStaff" element={<AddStaff />} />
          <Route path="/manageStaff" element={<ManageStaff />} />
          <Route path="/issues" element={<Issues />} />
          <Route path="/profilepage" element={<ProfilePage />} />
          <Route path="/manageUsers" element={<ManageUsers />} />
          <Route path="/issuesByBuild" element={<IssuesByBuild />} />
          <Route path="/handledIssues" element={<HandledIssues />} />
          <Route path="/issuesOverview" element={<IssuesOverview />} />
          <Route path="/staffProfile" element={<StaffProfile />} />
        </Routes>
      </Row>

      {!hideHeaderFooter && (
        <Row>
          <Footer />
        </Row>
      )}
    </>
  );
};

const App = () => {
  return (
    <Container fluid>
      <Router>
        <AppContent />
      </Router>
    </Container>
  );
};

export default App;
