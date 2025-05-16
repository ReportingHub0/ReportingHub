import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config";

const initialState = {
  staff: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const staffLogin = createAsyncThunk(
  "staff/staffLogin",
  async (staffData) => {
    try {
      const response = await axios.post(`${ENV.SERVER_URL}/staffLogin`, {
        email: staffData.email,
        password: staffData.password,
      });

      const staff = response.data.staff;

      return staff;
    } catch (error) {
      const errorMessage = "Invalid Details";
      alert(errorMessage);
      throw new Error(errorMessage);
    }
  }
);

export const logout = createAsyncThunk("/staff/logout", async () => {
  try {
    // Send a request to your server to log the staff out
    const response = await axios.post(`${ENV.SERVER_URL}/logout`);
  } catch (error) {
    console.log(error);
  }
});

export const addStaff = createAsyncThunk(
  "staff/addStaff",
  async (staffData) => {
    try {
      //sends a POST request to the server along the request body object
      const response = await axios.post(`${ENV.SERVER_URL}/addStaff`, {
        id: staffData.id,
        name: staffData.name,
        role: staffData.role,
        email: staffData.email,
        password: staffData.password,
        phoneNumber: staffData.phoneNumber,
        building: staffData.building,
      });
      console.log(response);
      const staff = response.data.staff; //retrieve the response from the server
      return staff; //return the response from the server as payload to the thunk
    } catch (error) {
      console.log(error);
    }
  }
);
//View Staff
export const viewStaff = createAsyncThunk("staff/viewStaff", async () => {
  try {
    const response = await axios.get(`${ENV.SERVER_URL}/viewStaff`);
    console.log(response.data);
    return response.data.staff;
  } catch (error) {
    console.log(error);
  }
});

//update Staff Info
export const updateStaff = createAsyncThunk(
  "staff/updateStaff",
  async ({ staffData, originalEmail }) => {
    try {
      const response = await axios.put(
        `${ENV.SERVER_URL}/updateStaff/${originalEmail}`,
        {
          id: staffData.id,
          name: staffData.name,
          email: staffData.email,
          password: staffData.password,
          phoneNumber: staffData.phoneNumber,
          role: staffData.role,
          building: staffData.building,
        }
      );
      console.log(response);
      const staff = response.data.staff;
      return staff;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

//Delete Staff Info
export const deleteStaff = createAsyncThunk("staff/deleteStaff", async (id) => {
  try {
    const response = await axios.delete(
      `${ENV.SERVER_URL}/deleteStaff/${id}`
    );
    return id;
  } catch (error) {
    console.log(error);
  }
});

export const updateStaffProfile = createAsyncThunk(
  "users/updateStaffProfile",
  async (staffData) => {
    try {
      const response = await axios.put(
        `${ENV.SERVER_URL}/updateStaffProfile/${staffData.email}`,
        {
          name: staffData.name,
          password: staffData.password,
          phoneNumber: staffData.phoneNumber,
        }
      );
      console.log(response);
      const staff = response.data.staff;
      return staff;
    } catch (error) {
      console.log(error);
    }
  }
);

export const staffSlice = createSlice({
  name: "staff", //name of the state
  initialState, // initial value of the state
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    //Asynchronous actions that update the state directly,
    builder
      .addCase(staffLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(staffLogin.fulfilled, (state, action) => {
        state.staff = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(staffLogin.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        // Clear staff data or perform additional cleanup if needed
        state.staff = {};
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(addStaff.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addStaff.fulfilled, (state, action) => {
        state.staff.push(action.payload);
        state.isLoading = true;
      })
      .addCase(addStaff.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(viewStaff.pending, (state) => {
        state.status = "loading";
      })
      .addCase(viewStaff.fulfilled, (state, action) => {
        console.log("Fetched staff from API:", action.payload);
        state.status = "succeeded";
        state.staff = action.payload;
      })
      .addCase(viewStaff.rejected, (state, action) => {
        state.status = "failed";
        state.isError = action.error.message;
      })
      .addCase(updateStaff.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        state.staff = action.payload;
        state.isLoading = false;
      })
      .addCase(updateStaff.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteStaff.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.staff = state.staff.filter(
          (staff) => staff._id !== action.payload
        );
      })
      .addCase(deleteStaff.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateStaffProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStaffProfile.fulfilled, (state, action) => {
        state.staff = action.payload;
        state.isLoading = false;
      })
      .addCase(updateStaffProfile.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reset } = staffSlice.actions; //export the function

export default staffSlice.reducer;
