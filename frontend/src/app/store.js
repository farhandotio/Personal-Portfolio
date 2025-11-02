import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counters/counterSlice";
import authReducer from "./features/auth/authSlice";

const store = configureStore({
  reducer: {
    counters: counterReducer,
    auth: authReducer,
  },
});

export default store;
