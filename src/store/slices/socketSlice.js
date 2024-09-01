import { createSlice } from "@reduxjs/toolkit";
// import { createAsyncThunk } from "@reduxjs/toolkit";
import socket from "../../api/socketIoClient";
// import { toast } from "react-toastify";

//  make to connect with web socket

const initialState = {
  isConnected: false,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    connect(state) {
      if (state.isConnected) {
        return;
      }
      socket.connect();
      state.isConnected = true;
    },
    disconnect(state) {
      if (!state.isConnected) {
        return;
      }
      socket.disconnect();
      state.isConnected = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase("/auth/login/fulfilled", (state) => {
      socket.connect();
      state.isConnected = true;
    });
    builder.addCase("/auth/logout/fulfilled", (state) => {
      socket.disconnect();
      state.isConnected = false;
    });
  },
});

export const { connect, disconnect } = socketSlice.actions;

export const socketReducer = socketSlice.reducer;
