import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { forgotPasswordReducer } from "./slices/forgotPasswordSlice";
import { userReducer } from "./slices/userSlice";
import { friendReducer } from "./slices/friendSlice";
import { creatorMeetingReducer } from "./slices/creatorMeetingSlice";
import { participantMeetingReducer } from "./slices/participantMeetingSlice";
import { socketReducer } from "./slices/socketSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        forgotPassword: forgotPasswordReducer,
        user: userReducer,
        friends: friendReducer,
        creatorMeeting: creatorMeetingReducer,
        participantMeeting: participantMeetingReducer,
        socket: socketReducer,
    },
    devTools: import.meta.env.MODE !== "production",
});

export default store;