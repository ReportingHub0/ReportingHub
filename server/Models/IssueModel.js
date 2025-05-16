import mongoose from "mongoose";

const IssueSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  building: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    default: "Pending",
  },
  priority: {
    type: String,
    default: "Low",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  comment: {
    type: String,
    default: "",
  },
});

const IssueModel = mongoose.model("Issues", IssueSchema);

export default IssueModel;
