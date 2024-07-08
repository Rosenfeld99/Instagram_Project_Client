import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGet, apiMethod, apiPost } from "../../services/services";
import { API_URL, MODE, TOKEN_KEY, USER_ROUTE } from "../../constant/url";
import { toastMsg } from "../../components/animation/tostify";

export const getUserPersinale = createAsyncThunk(
  "user/getUserPersinale",
  async (_url, thunkAPI) => {
    console.log(_url);
    try {
      const { data } = await apiGet(USER_ROUTE + "userInfo");
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const getUserByuserName = createAsyncThunk(
  "user/getUserByuserName",
  async (userName, thunkAPI) => {
    // console.log(userName + " from silce");
    try {
      const { data } = await apiGet(
        USER_ROUTE + `getUserByUserName/${userName}/`
      );
      // console.log({data});
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const getSuggestedAccounts = createAsyncThunk(
  "user/getSuggestedAccounts",
  async (bodyData, thunkAPI) => {
    try {
      const { data } = await apiGet(USER_ROUTE + "suggestedAccounts");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const editUserInfo = createAsyncThunk(
  "user/editUserInfo",
  async (bodyData, thunkAPI) => {
    try {
      const data = await apiMethod(USER_ROUTE + "editInfo", "PUT", bodyData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const remodevImageProfile = createAsyncThunk(
  "user/remodevImageProfile",
  async (bodyData, thunkAPI) => {
    try {
      const data = await apiMethod(
        USER_ROUTE + "removeCurrentPhoto",
        "PATCH",
        {}
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const remodevPost = createAsyncThunk(
  "user/remodevPost",
  async (postId, thunkAPI) => {
    try {
      const _url = USER_ROUTE + "removePost/" + postId;
      const data = await apiMethod(_url, "PATCH", {});
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const getSinglePost = createAsyncThunk(
  "user/getSinglePost",
  async (ids, thunkAPI) => {
    try {
      const _url =
        USER_ROUTE + "getSinglePost/" + `${ids?.postId}/${ids?.userName}`;
      // console.log(_url);
      const { data } = await apiGet(_url);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const getUserFeed = createAsyncThunk(
  "user/getUserFeed",
  async (page, thunkAPI) => {
    try {
      const _url = USER_ROUTE + `getFeedUser?page=${page}`;
      const { data } = await apiGet(_url);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

const initialState = {
  userPersonale: null,
  userTest: null,
  usersSuggestedAccounts: [],
  userFeed: [],
  singlePost: {},
  loading: false,
  error: false,
  status: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      // --> GET USER PERSONALE <-- REQUEST
      // PANDING
      .addCase(getUserPersinale.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      // FULLFILD
      .addCase(getUserPersinale.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userPersonale = action.payload.user;
        state.userPersonale.storiesFollowing = action.payload.storiesFollowing;
        // console.log(state.userPersonale);
      })
      // REJECTED
      .addCase(getUserPersinale.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // --> GET SUGGESTED ACCOUNTS
      // PANDING
      .addCase(getSuggestedAccounts.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      // FULLFILD
      .addCase(getSuggestedAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload) {
          state.usersSuggestedAccounts = action.payload;
          console.log(state.usersSuggestedAccounts);
        }
      })
      // REJECTED
      .addCase(getSuggestedAccounts.rejected, (state, action) => {
        state.loading = false;
        // console.log(action.payload);
        state.error = action.payload;
      })
      // --> GET USER BY USERNAME
      // PANDING
      .addCase(getUserByuserName.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      // FULLFILD
      .addCase(getUserByuserName.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload) {
          state.userTest = action.payload;
          console.log(state.userTest);
          state.status = true;
        }
      })
      // REJECTED
      .addCase(getUserByuserName.rejected, (state, action) => {
        state.loading = false;
        // console.log(action.payload);
        state.error = action.payload;
      })
      // --> PUT USER -- UPDATE MODIFICOUNT ? 1 : 0
      // PANDING
      .addCase(editUserInfo.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      // FULLFILD
      .addCase(editUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload?.modifyCount === 1) {
          state.userTest = action.payload.user;
          state.userPersonale = action.payload.user;
          console.log(state.userTest);
          state.status = true;
          toastMsg("profile saved", "#444");
        }
      })
      // REJECTED
      .addCase(editUserInfo.rejected, (state, action) => {
        state.loading = false;
        // console.log(action.payload);
        state.error = action.payload;
      })
      // --> REMOVEED CURRENT PROFILE
      // PANDING
      .addCase(remodevImageProfile.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      // FULLFILD
      .addCase(remodevImageProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload?.user?._id) {
          state.userTest = action.payload.user;
          state.userPersonale = action.payload.user;
          console.log(state.userTest);
          state.status = true;
        }
      })
      // REJECTED
      .addCase(remodevImageProfile.rejected, (state, action) => {
        state.loading = false;
        // console.log(action.payload);
        state.error = action.payload;
      })
      // --> REMOVEED POST
      // PANDING
      .addCase(remodevPost.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      // FULLFILD
      .addCase(remodevPost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload?.user) {
          state.userTest = action.payload.user;
          state.userPersonale = action.payload.user;
          console.log(state.userTest);
          state.status = !state.status;
        }
      })
      // REJECTED
      .addCase(remodevPost.rejected, (state, action) => {
        state.loading = false;
        // console.log(action.payload);
        state.error = action.payload;
      })
      // --> SINGLE POST
      // PANDING
      .addCase(getSinglePost.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      // FULLFILD
      .addCase(getSinglePost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log(action.payload);
        if (action.payload?.singlePost?._id) {
          state.singlePost = action.payload?.singlePost;
          state.status = true;
        }
      })
      // REJECTED
      .addCase(getSinglePost.rejected, (state, action) => {
        state.loading = false;
        // console.log(action.payload);
        state.error = action.payload;
      })
      // --> FEED
      // PANDING
      .addCase(getUserFeed.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      // FULLFILD
      .addCase(getUserFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log(action.payload);
        if (action.payload?.feed) {
          state.userFeed = action.payload.feed;
          state.status = true;
          console.log(state.userFeed);
        }
      })
      // REJECTED
      .addCase(getUserFeed.rejected, (state, action) => {
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
    resetModifyCount: (state) => {
      state.modifyCount = false;
    },
    logOut: (state) => {
      state.userPersonale = null;
      localStorage.removeItem(TOKEN_KEY);
    },
    upDateStateUserPersonale: (state, action) => {
      console.log(action.payload);
      state.userPersonale = action.payload;
    },
    upDateSinglePost: (state, action) => {
      // console.log(action.payload);
      state.singlePost.isCurrentLiked = action.payload.isCurrentLiked;
      state.singlePost.likes = action.payload.likes;
    },
    upDateFeedGrid: (state, action) => {
      console.log(action.payload._id);
      console.log(state.userFeed);
      const gridItem = state.userFeed.feed.filter((item) => item._id === action.payload._id);
      console.log(gridItem);
      // gridItem.isCurrentLiked = action.payload.isCurrentLiked;
      // gridItem.likes = action.payload.likes;
    },
  },
});

export const {
  resetStatus,
  resetAuth,
  logOut,
  resetModifyCount,
  upDateStateUserPersonale,
  upDateSinglePost,
  upDateFeedGrid,
} = userSlice.actions;
export default userSlice.reducer;
