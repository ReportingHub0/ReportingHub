import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config";

const initialState = {
  user: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData) => {
    try {
      //sends a POST request to the server along the request body object
      const response = await axios.post(`${ENV.SERVER_URL}/registerUser`, {
        id: userData.id,
        name: userData.name,
        role: userData.role,
        email: userData.email,
        password: userData.password,
        phoneNumber: userData.phoneNumber,
      });
      console.log(response);
      const user = response.data.user; //retrieve the response from the server
      return user; //return the response from the server as payload to the thunk
    } catch (error) {
      console.log(error);
    }
  }
);

export const login = createAsyncThunk("users/login", async (userData) => {
  try {
    const response = await axios.post(`${ENV.SERVER_URL}/login`, {
      email: userData.email,
      password: userData.password,
    });
    const user = response.data.user;
    return user;
  } catch (error) {
    const errorMessage = "Invalid credentials";
    alert(errorMessage);
    throw new Error(errorMessage);
  }
});

export const logout = createAsyncThunk("users/logout", async () => {
  try {
    // Send a request to your server to log the user out
    const response = await axios.post(`${ENV.SERVER_URL}/logout`);
  } catch (error) {
    console.log(error);
  }
});

export const updateUserProfile = createAsyncThunk(
  "users/updateUserProfile",
  async (userData) => {
    try {
      const response = await axios.put(
        `${ENV.SERVER_URL}/updateUserProfile/${userData.email}`,
        {
          name: userData.name,
          password: userData.password,
          phoneNumber: userData.phoneNumber,
        }
      );
      console.log(response);
      const user = response.data.user;
      return user;
    } catch (error) {
      console.log(error);
    }
  }
);

//View Users
export const viewUsers = createAsyncThunk("users/viewUsers", async () => {
  try {
    const response = await axios.get(`${ENV.SERVER_URL}/viewUsers`);
    console.log(response.data);
    return response.data.users;
  } catch (error) {
    console.log(error);
  }
});

//update User Info
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ userData, originalEmail }) => {
    try {
      const response = await axios.put(
        `${ENV.SERVER_URL}/updateUser/${originalEmail}`,
        {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          password: userData.password,
          phoneNumber: userData.phoneNumber,
          role: userData.role,
        }
      );
      console.log(response);
      const user = response.data.user;
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

//Delete User Info
export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  try {
    const response = await axios.delete(`${ENV.SERVER_URL}/deleteUser/${id}`);
    return id;
  } catch (error) {
    console.log(error);
  }
});

export const userSlice = createSlice({
  name: "users", //name of the state
  initialState, // initial value of the state
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    //Asynchronous actions that update the state directly,
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = {};
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(updateUserProfile.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(viewUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(viewUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(viewUsers.rejected, (state, action) => {
        state.status = "failed";
        state.isError = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.user = state.user.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { reset } = userSlice.actions; //export the function

export default userSlice.reducer;
