import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./fetrued/authSlice";
import userReducer from "./fetrued/userSlice";

const store = configureStore({
  reducer: {
    authReducer,
    userReducer,
  },
});

export default store;
