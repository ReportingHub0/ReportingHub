import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config";
const initialState = {
  admin: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const adminLogin = createAsyncThunk(
  "admin/adminLogin",
  async (adminData) => {
    try {
      const response = await axios.post(`${ENV.SERVER_URL}/adminLogin`, {
        email: adminData.email,
        password: adminData.password,
      });
      const admin = response.data.admin;
      return admin;
    } catch (error) {
      const errorMessage = "Invalid credentials";
      alert(errorMessage);
      throw new Error(errorMessage);
    }
  }
);

export const logout = createAsyncThunk("admin/logout", async () => {
  try {
    // Send a request to your server to log the admin out
    const response = await axios.post(`${ENV.SERVER_URL}/logout`);
  } catch (error) {
    console.log(error);
  }
});

export const adminSlice = createSlice({
  name: "admin", //name of the state
  initialState, // initial value of the state
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    //Asynchronous actions that update the state directly,
    builder
      .addCase(adminLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.admin = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(adminLogin.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.admin = {};
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reset } = adminSlice.actions; //export the function

export default adminSlice.reducer;
