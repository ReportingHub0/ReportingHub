import * as ENV from "../config.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: ENV.EMAIL_USER,
    pass: ENV.EMAIL_PASS,
  },
});

export const notifyUserOnStateChange = async (user, issue) => {
  const subject = `Your Issue Status Has Been Updated`;
  const text = `Your reported issue "${issue.title}" has been updated to state: ${issue.state}.`;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h3 style="color: #007bff;">Issue Status Updated</h3>
      <p><strong>Title:</strong> ${issue.title}</p>
      <p><strong>New State:</strong> ${issue.state}</p>
      <hr />
      <p style="font-size: 0.9em; color: #777;">
        This is an automated message from the <strong>Reporting Hub System</strong>.<br />
        Contact us at <a href="mailto:${ENV.EMAIL_USER}">${ENV.EMAIL_USER}</a> if you have any questions.
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Reporting Hub" <${ENV.EMAIL_USER}>`,
    to: user.email,
    subject,
    text,
    html,
  });
};

export const notifyStaffOnPriorityChange = async (staff, issue) => {
  const subject = `Issue Priority Has Been Updated`;
  const text = `The issue "${issue.title}" has been updated to priority: ${issue.priority}.`;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h3 style="color: #007bff;">Issue Priority Updated</h3>
      <p><strong>Title:</strong> ${issue.title}</p>
      <p><strong>New Priority:</strong> ${issue.priority}</p>
      <hr />
      <p style="font-size: 0.9em; color: #777;">
        This is an automated message from the <strong>Reporting Hub System</strong>.<br />
        Contact us at <a href="mailto:${ENV.EMAIL_USER}">${ENV.EMAIL_USER}</a>.
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Reporting Hub" <${ENV.EMAIL_USER}>`,
    to: staff.email,
    subject,
    text,
    html,
  });
};
