import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../api/axios";
import { toast } from "react-toastify";

const initialState = {
    friends: [],
    receivedfriendRequests: [],
    sentFriendRequests: [],
    nonFriends: [],
};

// get friends
export const getFriends = createAsyncThunk(
    "/friends",
    async () => {
        try {
            // toast.info("Fetching friends...");
            const response = await instance.get("/friends");
            // toast.success("Friends fetched successfully");
            return response.data;
        }
        catch (error) {
            toast.error(error?.response?.data?.message);
            console.log(error?.response?.data);
            throw error?.response?.data;
        }
    }
);

// unfriend
export const unfriend = createAsyncThunk(
    "/friend/unfriend",
    async (_id) => {
        try {
            // toast.info("Unfriending...");
            const response = await instance.delete(`/friends/unfriend/${_id}`);
            // toast.success("Unfriended successfully");
            return response.data;
        }
        catch (error) {
            toast.error(error?.response?.data?.message);
            console.log(error?.response?.data);
            throw error?.response?.data;
        }
    }
);

// get received friend requests
export const getReceivedFriendRequests = createAsyncThunk(
    "/friendRequests/received",
    async () => {
        try {
            // toast.info("Fetching received friend requests...");
            const response = await instance.get("/friendRequests/received");
            // toast.success("Received friend requests fetched successfully");
            return response.data;
        }
        catch (error) {
            toast.error(error?.response?.data?.message);
            console.log(error?.response?.data);
            throw error?.response?.data;
        }
    }
);

// send friend request
export const sendFriendRequest = createAsyncThunk(
    "/friendRequests/send",
    async (_id) => {
        try {
            // toast.info("Sending friend request...");
            const response = await instance.post(`/friendRequests/send/${_id}`);
            // toast.success("Friend request sent successfully");
            return response.data;
        }
        catch (error) {
            toast.error(error?.response?.data?.message);
            console.log(error?.response?.data);
            throw error?.response?.data;
        }
    }
);

// cancel friend request
export const cancelFriendRequest = createAsyncThunk(
    "/friendRequests/cancel",
    async (_id) => {
        try {
            // toast.info("Cancelling friend request...");
            const response = await instance.delete(`/friendRequests/cancel/${_id}`);
            // toast.success("Friend request cancelled successfully");
            return response.data;
        }
        catch (error) {
            toast.error(error?.response?.data?.message);
            console.log(error?.response?.data);
            throw error?.response?.data;
        }
    }
);

// get sent friend requests
export const getSentFriendRequests = createAsyncThunk(
    "/friendRequests/sent",
    async () => {
        try {
            // toast.info("Fetching sent friend requests...");
            const response = await instance.get("/friendRequests/sent");
            // toast.success("Sent friend requests fetched successfully");
            return response.data;
        }
        catch (error) {
            toast.error(error?.response?.data?.message);
            console.log(error?.response?.data);
            throw error?.response?.data;
        }
    }
);

// accept friend request
export const acceptFriendRequest = createAsyncThunk(
    "/friendRequests/accept",
    async (_id) => {
        try {
            const response = await instance.post(`/friendRequests/accept/${_id}`);
            return response.data;
        }
        catch (error) {
            toast.error(error?.response?.data?.message);
            throw error?.response?.data;
        }
    }
);

// reject friend request
export const rejectFriendRequest = createAsyncThunk(
    "/friendRequests/reject",
    async (_id) => {
        try {
            const response = await instance.post(`/friendRequests/reject/${_id}`);
            return response.data;
        }
        catch (error) {
            toast.error(error?.response?.data?.message);
            throw error?.response?.data;
        }
    }
);

// get non friends
export const getNonFriends = createAsyncThunk(
    "/users/all",
    async () => {
        try {
            // toast.info("Fetching non friends...");
            const response = await instance.get("/users/all");
            // toast.success("Non friends fetched successfully");
            console.log(response.data);
            return response.data;
        }
        catch (error) {
            toast.error(error?.response?.data?.message);
            throw error?.response?.data;
        }
    }
);

const friendSlice = createSlice({
    name: "friends",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFriends.fulfilled, (state, action) => {
            if(action?.payload?.success){
            state.friends = action.payload?.data?.friends;
            }
        });
        builder.addCase(unfriend.fulfilled, (state, action) => {
            if(action?.payload?.success){
            state.friends = state.friends.filter((friend) => friend._id !== action?.payload?.data?._id);
            }
        });
        builder.addCase(getReceivedFriendRequests.fulfilled, (state, action) => {
            if(action?.payload?.success){
            state.receivedfriendRequests = action?.payload?.data?.map((request) => request?.sender);
            }
        });
        builder.addCase(sendFriendRequest.fulfilled, (state, action) => {
            if(action?.payload?.success){
                state.nonFriends = state.nonFriends.filter((friend) => friend._id !== action.payload?.data?.receiver);
            }

        });
        builder.addCase(cancelFriendRequest.fulfilled, (state, action) => {
            if(action?.payload?.success){
                state.sentFriendRequests = state.sentFriendRequests.filter((request) => request._id !== action.payload.data.receiver);
               
            }
        });
        builder.addCase(getSentFriendRequests.fulfilled, (state, action) => {
            if(action?.payload?.success){
            state.sentFriendRequests = action?.payload?.data.map((request) => request?.receiver);
            }
        });
        builder.addCase(acceptFriendRequest.fulfilled, (state, action) => {
           if(action?.payload?.success){
            state.receivedfriendRequests = state.receivedfriendRequests.filter((request) => request._id !== action.payload?.data?.sender);
            
           }
        });
        builder.addCase(rejectFriendRequest.fulfilled, (state, action) => {
            if(action?.payload?.success){
            state.receivedfriendRequests = state.receivedfriendRequests.filter((request) => request._id !== action.payload?.data?.sender);
           
            }
        });
        builder.addCase(getNonFriends.fulfilled, (state, action) => {
            if(action?.payload?.success){
               
                state.nonFriends = action.payload?.data;
            }
        });
    }
});

export const friendReducer = friendSlice.reducer;
