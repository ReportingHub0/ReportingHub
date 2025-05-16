import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useSelector } from "react-redux";
import HomeHeader from "./HomeHeader";
import ReportIssueHeader from "./ReportIssueHeader";
import StaffHeader from "./StaffHeader";
import AdminHeader from "./AdminHeader";
import React from 'react';
const Headers = () => {
  const user = useSelector((state) => state.users?.user);
  const staff = useSelector((state) => state.staff?.staff);
  const admin = useSelector((state) => state.admin?.admin);

  console.log("Auth states:", {
    userEmail: user?.email || "none",
    staffEmail: staff?.email || "none",
    adminEmail: admin?.email || "none",
  });

  const hasUserEmail = Boolean(
    user && typeof user.email === "string" && user.email.length > 0
  );
  const hasStaffEmail = Boolean(
    staff && typeof staff.email === "string" && staff.email.length > 0
  );
  const hasAdminEmail = Boolean(
    admin && typeof admin.email === "string" && admin.email.length > 0
  );

  console.log("Auth checks:", { hasUserEmail, hasStaffEmail, hasAdminEmail });

  if (hasAdminEmail) {
    return <AdminHeader />;
  } else if (hasStaffEmail) {
    return <StaffHeader />;
  } else if (hasUserEmail) {
    return <ReportIssueHeader />;
  } else {
    return <HomeHeader />;
  }
};

export default Headers;
