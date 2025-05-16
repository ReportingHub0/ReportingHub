import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  building: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  assignedIssues: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Issues",
    },
  ],
  role: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const StaffModel = mongoose.model("Staff", StaffSchema);

export default StaffModel;
