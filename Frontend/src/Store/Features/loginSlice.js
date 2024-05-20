import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async ({ username, password = null }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", {
        username,
        password,
      });
      return username;
    } catch (error) {
      console.log(rejectWithValue(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);
const initialState = {
  isLoggedIn: false,
  error:"",
  userDropdownOpen: false,
  username: "",
  loginStatus: "",
  rememberMe: false,
  profilepic:
    'data:image/svg+xml,<svg width= "35" height="35" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" ><rect width="32" height="32" rx="16" fill="%23DB4444" /><path d="M21 23V21.3333C21 20.4493 20.691 19.6014 20.1408 18.9763C19.5907 18.3512 18.8446 18 18.0667 18H12.9333C12.1554 18 11.4093 18.3512 10.8592 18.9763C10.309 19.6014 10 20.4493 10 21.3333V23" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M16 15C17.6569 15 19 13.6569 19 12C19 10.3431 17.6569 9 16 9C14.3431 9 13 10.3431 13 12C13 13.6569 14.3431 15 16 15Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>',
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
    setRememberMe: (state) => {
      state.rememberMe = !state.rememberMe;
    },

    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setProfilePic: (state, action) => {
      state.profilepic = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },

    // OpenUserDropdown: (state) => {
    //     state.userDropdownOpen = true;
    //   },
    //   CloseUserDropdown:(state)=>{
    //     state.userDropdownOpen = false;
    //   },
    toggleUserDropdown: (state, action) => {
      state.userDropdownOpen = !state.userDropdownOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.username=action.payload;
        state.loginStatus = "success";
        // if (state.rememberMe) {
        //   Cookies.set("loggedIn", true, { expires: 1 }); // Cookie expires in 1 day
        //   Cookies.set("username", username, { expires: 1 }); // Cookie expires in 1 day
        //   Cookies.set(
        //     "profilePic",
        //     'data:image/svg+xml,<svg width= "35" height="35" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" ><rect width="32" height="32" rx="16" fill="%23DB4444" /><path d="M21 23V21.3333C21 20.4493 20.691 19.6014 20.1408 18.9763C19.5907 18.3512 18.8446 18 18.0667 18H12.9333C12.1554 18 11.4093 18.3512 10.8592 18.9763C10.309 19.6014 10 20.4493 10 21.3333V23" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M16 15C17.6569 15 19 13.6569 19 12C19 10.3431 17.6569 9 16 9C14.3431 9 13 10.3431 13 12C13 13.6569 14.3431 15 16 15Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>',
        //     { expires: 1 }
        //   ); // Cookie expires in 1 day
        // }
        // // dispatch(setUsername(email));
        // navigate("/home");
        // dispatch(sendEmail({ email }));
      })
      .addCase(loginUser.rejected, (state,action  ) => {
        state.isLoggedIn = false;
        state.loginStatus = "rejected";
        state.error=action.payload
      })
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = "pending";
      });
  },
});

export const {
  login,
  setRememberMe,
  setError,
  logout,
  toggleUserDropdown,
  setProfilePic,
  setUsername,
} = loginSlice.actions;
export default loginSlice.reducer;
