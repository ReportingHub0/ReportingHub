import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import UserModel from "./Models/UserModel.js";
import bcrypt from "bcrypt";
import IssueModel from "./Models/IssueModel.js";
import StaffModel from "./Models/StaffModel.js";
import AdminModel from "./Models/AdminModel.js";
import notifyHelpDesk from "./emails/notifyHelpDesk .js";
import {
  notifyUserOnStateChange,
  notifyStaffOnPriorityChange,
} from "./emails/updateIssueNotifications.js";
import * as ENV from "./config.js";

const app = express();
app.use(express.json());
app.use(cors());

//Database connection
const connectString = `mongodb+srv://${ENV.DB_USER}:${ENV.DB_PASSWORD}@${ENV.DB_CLUSTER}/${ENV.DB_NAME}?retryWrites=true&w=majority&appName=${ENV.DB_APP_NAME}`;
mongoose.connect(connectString);
//*****************API ****************/
// USER
// Registration
app.post("/registerUser", async (req, res) => {
  try {
    const id = req.body.id;
    const name = req.body.name;
    const role = req.body.role;
    const email = req.body.email;
    const password = req.body.password;
    const hashedpassword = await bcrypt.hash(password, 10);
    const phoneNumber = req.body.phoneNumber;
    const user = UserModel({
      id: id,
      name: name,
      role: role,
      email: email,
      password: hashedpassword,
      phoneNumber: phoneNumber,
    });
    await user.save();
    res.send({ user: user, msg: "Added." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

//Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(500).json({ error: "User not found." });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    res.status(200).json({ user, message: "Success." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Logout
app.post("/logout", async (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

//Update User Profile

app.put("/updateUserProfile/:email/", async (req, res) => {
  const name = req.body.name;
  const email = req.params.email;
  const password = req.body.password;
  const phoneNumber = req.body.phoneNumber;

  try {
    const userToUpdate = await UserModel.findOne({ email: email });

    if (!userToUpdate) {
      return res.status(404).json({ error: "User not found" });
    }

    userToUpdate.name = name;
    if (password !== userToUpdate.password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      userToUpdate.password = hashedPassword;
    } else {
      userToUpdate.password = password;
    }
    userToUpdate.phoneNumber = phoneNumber;

    await userToUpdate.save();
    res.send({ user: userToUpdate, msg: "Updated." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//Issues
//report Issue
app.post("/reportIssue", async (req, res) => {
  try {
    const title = req.body.title;
    const category = req.body.category;
    const description = req.body.description;
    const building = req.body.building;
    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const newIssue = new IssueModel({
      title,
      category,
      description,
      building,
      createdBy: userId,
    });

    await newIssue.save();
    await notifyHelpDesk(newIssue);
    res.send({ newIssue: newIssue, msg: "Added." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

//get Issues
app.get("/userIssues/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const userIssue = await IssueModel.find({ createdBy: userId }).sort({
      createdAt: -1,
    });

    res.send({ userIssue: userIssue });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

//get All Issues
app.get("/viewIssues", async (req, res) => {
  try {
    const issues = await IssueModel.find({})
      .populate("createdBy", "name role")
      .populate("assignedTo", "name");

    const countIssues = await IssueModel.countDocuments({});

    res.send({ issues: issues, count: countIssues });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

//Update Issue for User
app.put("/updateIssue/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const title = req.body.title;
    const category = req.body.category;
    const description = req.body.description;
    const building = req.body.building;

    const issueToUpdate = await IssueModel.findOne({ _id: id });

    if (!issueToUpdate) {
      return res.status(404).json({ error: "Issue not found" });
    }

    issueToUpdate.title = title;
    issueToUpdate.category = category;
    issueToUpdate.description = description;
    issueToUpdate.building = building;

    await issueToUpdate.save();
    res.send({ issue: issueToUpdate, msg: "Isssue Update." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// delete Issue
app.delete("/deleteIssue/:id/", async (req, res) => {
  const id = req.params.id;

  try {
    const issue = await IssueModel.findByIdAndDelete(id);

    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }

    res.status(200).json({ msg: "Issue deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the Issue" });
  }
});

//Support Staff
//Add Staff
app.post("/addStaff", async (req, res) => {
  try {
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const hashedpassword = await bcrypt.hash(password, 10);
    const phoneNumber = req.body.phoneNumber;
    const assignedIssues = req.body.assignedIssues;
    const role = req.body.role;
    const building = req.body.building;
    const Staff = StaffModel({
      id: id,
      name: name,
      email: email,
      password: hashedpassword,
      phoneNumber: phoneNumber,
      assignedIssues: assignedIssues,
      role: role,
      building: building,
    });
    await Staff.save();
    res.send({ Staff: Staff, msg: "Added." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

//view Staff
app.get("/viewStaff", async (req, res) => {
  try {
    const staff = await StaffModel.find({});

    const countStaff = await StaffModel.countDocuments({});
    res.send({ staff: staff, count: countStaff });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Delete Staff
app.delete("/deleteStaff/:id/", async (req, res) => {
  const id = req.params.id;
  try {
    const staff = await StaffModel.findByIdAndDelete(id);
    if (!staff) {
      return res.status(404).json({ error: "Staff Information not found" });
    }
    res.status(200).json({ msg: "Staff Information deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while deleting the Staff Infromation",
    });
  }
});

//Staff Login
app.post("/staffLogin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const staff = await StaffModel.findOne({ email: email });
    if (!staff) {
      return res.status(500).json({ error: "Staff not found." });
    }
    const passwordMatch = await bcrypt.compare(password, staff.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    res.status(200).json({ staff, message: "Success." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Update Staff Info
app.put("/updateStaff/:email/", async (req, res) => {
  const name = req.body.name;
  const email = req.params.email;
  const password = req.body.password;
  const id = req.body.id;
  const phoneNumber = req.body.phoneNumber;
  const role = req.body.role;
  const building = req.body.building;

  try {
    const staffToUpdate = await StaffModel.findOne({ email: req.params.email });

    if (!staffToUpdate) {
      return res.status(404).json({ error: "Staff not found" });
    }
    staffToUpdate.email = req.body.email;
    staffToUpdate.name = name;
    const isSamePassword = await bcrypt.compare(
      password,
      staffToUpdate.password
    );
    if (!isSamePassword) {
      const hashedPassword = await bcrypt.hash(password, 10);
      staffToUpdate.password = hashedPassword;
    }
    staffToUpdate.id = id;
    staffToUpdate.phoneNumber = phoneNumber;
    staffToUpdate.role = role;
    staffToUpdate.building = building;

    await staffToUpdate.save();
    res.send({ staff: staffToUpdate, msg: "Updated." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//view Users
app.get("/viewUsers", async (req, res) => {
  try {
    const users = await UserModel.find({});

    const countUsers = await UserModel.countDocuments({});
    res.send({ users: users, count: countUsers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Delete User
app.delete("/deleteUser/:id/", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "User Information not found" });
    }
    res.status(200).json({ msg: "User Information deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while deleting the User Infromation",
    });
  }
});

//Update User Info
app.put("/updateUser/:email/", async (req, res) => {
  const name = req.body.name;
  const email = req.params.email;
  const password = req.body.password;
  const id = req.body.id;
  const phoneNumber = req.body.phoneNumber;
  const role = req.body.role;

  try {
    const userToUpdate = await UserModel.findOne({ email: req.params.email });

    if (!userToUpdate) {
      return res.status(404).json({ error: "User not found" });
    }
    userToUpdate.email = req.body.email;
    userToUpdate.name = name;
    const isSamePassword = await bcrypt.compare(
      password,
      userToUpdate.password
    );
    if (!isSamePassword) {
      const hashedPassword = await bcrypt.hash(password, 10);
      userToUpdate.password = hashedPassword;
    }
    userToUpdate.id = id;
    userToUpdate.phoneNumber = phoneNumber;
    userToUpdate.role = role;

    await userToUpdate.save();
    res.send({ user: userToUpdate, msg: "Updated." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

///Update Issue State -- Technical Support
app.put("/updateIssueDetails/:id", async (req, res) => {
  const id = req.params.id;
  const { state, staffId, comment, priority } = req.body;

  try {
    const issue = await IssueModel.findById(id)
      .populate("createdBy")
      .populate("assignedTo");

    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }

    const prevState = issue.state;
    const prevPriority = issue.priority;

    issue.state = state;
    issue.assignedTo = staffId;
    issue.comment = comment;
    issue.priority = priority;
    issue.updatedAt = new Date();

    await issue.save();

    if (state && state !== prevState && issue.createdBy?.email) {
      await notifyUserOnStateChange(issue.createdBy, issue);
    }

    if (priority && priority !== prevPriority && issue.assignedTo?.email) {
      await notifyStaffOnPriorityChange(issue.assignedTo, issue);
    }

    res.send({ issue, msg: "Issue details updated." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//Admin Login:
app.post("/adminLogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await AdminModel.findOne({ email: email });

    if (!admin) {
      return res.status(500).json({ error: "Admin not found." });
    }
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    res.status(200).json({ admin, message: "Success." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Update Staff Profile:
app.put("/updateStaffProfile/:email/", async (req, res) => {
  const name = req.body.name;
  const email = req.params.email;
  const password = req.body.password;
  const phoneNumber = req.body.phoneNumber;

  try {
    const staffToUpdate = await StaffModel.findOne({ email: email });

    if (!staffToUpdate) {
      return res.status(404).json({ error: "Staff not found" });
    }

    staffToUpdate.name = name;
    if (password !== staffToUpdate.password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      staffToUpdate.password = hashedPassword;
    } else {
      staffToUpdate.password = password;
    }

    staffToUpdate.phoneNumber = phoneNumber;

    await staffToUpdate.save();
    res.send({ staff: staffToUpdate, msg: "Updated." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = ENV.Port || 3001;
app.listen(port, () => {
  console.log(`You are connected: ${port}`);
});
