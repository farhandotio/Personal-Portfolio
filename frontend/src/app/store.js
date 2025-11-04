import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counters/counterSlice";
import authReducer from "./features/auth/authSlice";
import chatReducer from "./features/chat/chatSlice";
import orderReducer from "./features/order/orderSlice";

const store = configureStore({
  reducer: {
    counters: counterReducer,
    auth: authReducer,
    chat: chatReducer,
    order: orderReducer,
  },
});

export default store;
