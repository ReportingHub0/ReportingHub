import * as ENV from "../config.js";
import nodemailer from "nodemailer";
import StaffModel from "../Models/StaffModel.js";
import IssueModel from "../Models/IssueModel.js";
import express from "express";

const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: ENV.EMAIL_USER,
    pass: ENV.EMAIL_PASS,
  },
});

const notifyHelpDesk = async (issue) => {
  try {
    const helpDeskStaff = await StaffModel.find({ role: "HelpDesk" });

    const emails = helpDeskStaff.map((staff) => staff.email);
    if (emails.length === 0) return;

    const mailOptions = {
      from: `"Reporting Hub" <${ENV.EMAIL_USER}>`,
      to: emails,
      subject: `New Issue Reported: ${issue.title}`,
      text: `
    New Issue Reported
    
    Title: ${issue.title}
    Category: ${issue.category}
    Description: ${issue.description}
    Building: ${issue.building}
    Reported At: ${new Date(issue.createdAt).toLocaleString()}
    
    --
    
    This is an automated message from the Reporting Hub system.
    For questions, please contact us at ${ENV.EMAIL_USER}.
      `,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #0066cc;"> New Issue Reported</h2>
          <p><strong>Title:</strong> ${issue.title}</p>
          <p><strong>Category:</strong> ${issue.category}</p>
          <p><strong>Description:</strong> ${issue.description}</p>
          <p><strong>Building:</strong> ${issue.building}</p>
          <p><strong>Reported At:</strong> ${new Date(
            issue.createdAt
          ).toLocaleString()}</p>
          <hr />
          <p style="font-size: 0.9em; color: #777;">
            This is an automated message from the <strong>Reporting Hub System</strong>.<br />
            For questions or support, please contact us at <a href="mailto:${
              ENV.EMAIL_USER
            }">${ENV.EMAIL_USER}</a>.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Notification email sent to help desk.");
  } catch (error) {
    console.error("Error sending help desk notification:", error);
  }
};

export default notifyHelpDesk;
