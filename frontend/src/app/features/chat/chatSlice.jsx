// chatSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  messages: [],
  user: null, // client or admin
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    toggleChat: (state) => {
      state.isOpen = !state.isOpen;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { toggleChat, addMessage, setUser } = chatSlice.actions;
export default chatSlice.reducer;
