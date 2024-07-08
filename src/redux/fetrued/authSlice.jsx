import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiPost } from "../../services/services";
import { API_URL, TOKEN_KEY, USER_ROUTE } from "../../constant/url";

export const signUpRequest = createAsyncThunk(
  "auth/signUpRequest",
  async (bodyData, thunkAPI) => {
    try {
      const { data } = await apiPost(USER_ROUTE, bodyData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const signInRequest = createAsyncThunk(
  "auth/signInRequest",
  async (bodyData, thunkAPI) => {
    try {
      const { data } = await apiPost(USER_ROUTE + "login", bodyData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: false,
  status: false,
  auth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      // --> SIGNUP REQUEST
      // PANDING
      .addCase(signUpRequest.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      // FULLFILD
      .addCase(signUpRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload?._id) {
          state.status = true;
        }
      })
      // REJECTED
      .addCase(signUpRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // --> SIGNIN REQUEST
      // PANDING
      .addCase(signInRequest.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      // FULLFILD
      .addCase(signInRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload?.token) {
          localStorage.setItem(TOKEN_KEY, action.payload.token);
          state.status = true;
          state.auth = true;
          console.log(action.payload.token);
        }
      })
      // REJECTED
      .addCase(signInRequest.rejected, (state, action) => {
        state.loading = false;
        // console.log(action.payload);
        state.error = action.payload;
      });
  },
  reducers: {
    resetStatus: (state) => {
      state.status = false;
    },
    resetAuth: (state) => {
      state.auth = false;
    },
  },
});

export const { resetStatus, resetAuth } = authSlice.actions;
export default authSlice.reducer;
