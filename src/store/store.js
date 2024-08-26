import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { forgotPasswordReducer } from "./slices/forgotPasswordSlice";
import { userReducer } from "./slices/userSlice";
import { friendReducer } from "./slices/friendSlice";
import { creatorMeetingReducer } from "./slices/creatorMeetingSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        forgotPassword: forgotPasswordReducer,
        user: userReducer,
        friends: friendReducer,
        creatorMeeting: creatorMeetingReducer
    }
});

export default store;