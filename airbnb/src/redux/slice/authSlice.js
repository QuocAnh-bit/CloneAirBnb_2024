import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "@/api/authApi";
import { setLocalStorage } from "@/utils/localStorage";

export const getProfile = createAsyncThunk("getProfile", async () => {
  const profile = await authApi.profileApi();
  console.log(profile);
  return profile.data;
});

export const postLogin = createAsyncThunk("postLogin", async (body) => {
  const getToken = await authApi.postLogin(body);
  setLocalStorage("token", getToken.data);
  console.log(getToken);
  return getToken;
});

export const postRegister = createAsyncThunk("registerApi", async (body) => {
  const register = await authApi.registerApi(body);
  console.log(register);
  return register;
});

export const authGoogle = createAsyncThunk("authGoogle", async (query) => {
  const getToken = await authApi.authGoogleCallBack(query);
  setLocalStorage("token", getToken.data);
  return getToken;
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    msg: null,
    user: null,
    err: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(postLogin.pending, (state) => {
        console.log("pending");
        state.loading = true;
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(postLogin.rejected, (state, action) => {
        state.loading = false;
        // state.err = action.error.message;
        console.log(action);
      })
      .addCase(postRegister.pending, (state) => {
        console.log("pending");
      })
      .addCase(postRegister.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(postRegister.rejected, (state) => {
        console.log("error");
      })
      .addCase(authGoogle.pending, (state) => {
        console.log("pending");
      })
      .addCase(authGoogle.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(authGoogle.rejected, (state) => {
        console.log("error");
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        console.log("pending");
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getProfile.rejected, (state) => {
        state.loading = false;
        console.log("error");
      });
  },
});
