import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config";

const initialState = {
  issues: [],
  isloading: false,
  issuccess: false,
  iserror: false,
  status: null,
};

export const reportIssue = createAsyncThunk(
  "issues/reportIssue",
  async (issueData) => {
    try {
      console.log(issueData);
      const response = await axios.post(`${ENV.SERVER_URL}/reportIssue`, {
        userId: issueData.userId,
        title: issueData.title,
        category: issueData.category,
        description: issueData.description,
        building: issueData.building,
      });
      console.log(response);
      return response.data.issue;
    } catch (error) {
      console.log(error);
    }
  }
);
//get Issues by user ID
export const userIssues = createAsyncThunk(
  "issues/userIssues",
  async (userId) => {
    try {
      const response = await axios.get(
        `${ENV.SERVER_URL}/userIssues/${userId}`
      );

      return response.data.userIssue;
    } catch (error) {
      console.log(error);
    }
  }
);

//view Issues
export const viewIssues = createAsyncThunk("issues/viewIssues", async () => {
  try {
    const response = await axios.get(`${ENV.SERVER_URL}/viewIssues`);
    return response.data.issues;
  } catch (error) {
    console.log(error);
  }
});

export const deleteIssue = createAsyncThunk(
  "issues/deleteIssue",
  async (id) => {
    try {
      const response = await axios.delete(
        `${ENV.SERVER_URL}/deleteIssue/${id}`
      );
      return id;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateIssue = createAsyncThunk(
  "issues/updateIssue",
  async ({ issueData, issue_id }) => {
    try {
      const response = await axios.put(
        `${ENV.SERVER_URL}/updateIssue/${issue_id}`,
        {
          title: issueData.title,
          category: issueData.category,
          description: issueData.description,
          building: issueData.building,
        }
      );

      console.log(response);
      const issue = response.data.issue;
      return issue;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateIssueDetails = createAsyncThunk(
  "issues/updateIssueDetails",
  async ({ id, state, staffId, comment, priority }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${ENV.SERVER_URL}/updateIssueDetails/${id}`,
        {
          state,
          staffId,
          comment,
          priority,
        }
      );
      console.log("Response from backend:", response.data);
      return response.data.issue;
    } catch (error) {
      console.log(error);
    }
  }
);

export const issueSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(reportIssue.pending, (state) => {
        state.status = "loading";
      })
      .addCase(reportIssue.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.issues.push(action.payload);
      })
      .addCase(reportIssue.rejected, (state, action) => {
        state.status = "failed";
        state.iserror = action.error.message;
      })
      .addCase(userIssues.pending, (state) => {
        state.status = "loading";
        state.isloading = true;
      })
      .addCase(userIssues.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.issues = action.payload;
      })
      .addCase(userIssues.rejected, (state, action) => {
        state.status = "failed";
        state.iserror = action.error.message;
      })
      .addCase(viewIssues.pending, (state) => {
        state.status = "loading";
        state.isloading = true;
      })
      .addCase(viewIssues.fulfilled, (state, action) => {
        console.log("Fetched issues from API:", action.payload);
        state.status = "succeeded";
        state.issues = action.payload;
      })
      .addCase(viewIssues.rejected, (state, action) => {
        state.status = "failed";
        state.iserror = action.error.message;
      })
      .addCase(deleteIssue.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteIssue.fulfilled, (state, action) => {
        state.issues = state.issues.filter(
          (issue) => issue._id !== action.payload
        );
      })
      .addCase(deleteIssue.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateIssue.pending, (state) => {
        state.isloading = true;
      })
      .addCase(updateIssue.fulfilled, (state, action) => {
        const updatedIssue = action.payload;
        if (updatedIssue && updatedIssue._id) {
          const index = state.issues.findIndex(
            (issue) => issue._id === updatedIssue._id
          );
          if (index !== -1) {
            state.issues[index] = updatedIssue;
          }
        }
        state.isloading = false;
      })
      .addCase(updateIssue.rejected, (state) => {
        state.isloading = false;
        state.iserror = true;
      })
      .addCase(updateIssueDetails.pending, (state) => {
        state.isloading = true;
      })
      .addCase(updateIssueDetails.fulfilled, (state, action) => {
        const updatedIssue = action.payload;
        if (updatedIssue && updatedIssue._id) {
          const index = state.issues.findIndex(
            (issue) => issue._id === updatedIssue._id
          );
          if (index !== -1) {
            state.issues[index] = updatedIssue;
          }
        }
      })
      .addCase(updateIssueDetails.rejected, (state, action) => {
        state.isloading = false;
        state.iserror = true;
      });
  },
});

export const { reset } = issueSlice.actions;
export default issueSlice.reducer;
