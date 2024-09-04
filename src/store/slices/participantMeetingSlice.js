import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../api/axios";
import { toast } from "react-toastify";


const initialState = {
    upcomingMeetings: [],
    cancelledMeetings: [],
    inProgressMeetings: [],
    completedMeetings: [],
    };

export const getUpcomingMeetings = createAsyncThunk(
    "/meetings/participant/upcoming",
    async () => {
        try{
            // toast.info("Fetching Upcoming Meetings");
            const response = await instance.get(`/meetings/participant/upcoming`);
            // toast.success("Upcoming Meetings Fetched Successfully");
            return response.data;
        }
        catch(error){
            toast.error(error?.response?.data?.message);
            console.log(error?.response?.data);
            throw error?.response?.data;
        }
    }
);

export const getCancelledMeetings = createAsyncThunk(
    "/meetings/participant/cancelled",
    async () => {
        try{
            // toast.info("Fetching Cancelled Meetings");
            const response = await instance.get(`/meetings/participant/cancelled`);
            // toast.success("Cancelled Meetings Fetched Successfully");
            return response.data;
        }
        catch(error){
            toast.error(error?.response?.data?.message);
            console.log(error?.response?.data);
            throw error?.response?.data;
        }
    }
);

export const getInProgressMeetings = createAsyncThunk(
    "/meetings/participant/in-progress",
    async () => {
        try{
            // toast.info("Fetching In Progress Meetings");
            const response = await instance.get(`/meetings/participant/in-progress`);
            // toast.success("In Progress Meetings Fetched Successfully");
            return response.data;
        }
        catch(error){
            toast.error(error?.response?.data?.message);
            console.log(error?.response?.data);
            throw error?.response?.data;
        }
    }
);


export const getCompletedMeetings = createAsyncThunk(
    "/meetings/participant/completed",
    async () => {
        try{
            // toast.info("Fetching Completed Meetings");
            const response = await instance.get(`/meetings/participant/completed`);
            // toast.success("Completed Meetings Fetched Successfully");
            return response.data;
        }
        catch(error){
            toast.error(error?.response?.data?.message);
            console.log(error?.response?.data);
            throw error?.response?.data;
        }
    }
);


export const jointMeeting = createAsyncThunk(
    "participantMeeting/jointMeeting",
    async (meetingId) => {
        try{
            // toast.info("Joining Meeting...");
            const response = await instance.get(`meetings/participants/join/${meetingId}`);
            // toast.success("Meeting Joined Successfully");
            return response.data;
        }
        catch(error){
            toast.error(error?.response?.data?.message);
            console.log(error?.response?.data);
            throw error?.response?.data;
        }
    }
);

export const getMeetingByIdAndStatus = createAsyncThunk(
    "/meeting/getByIdAndStatus",
    async ({ meetingId, status }) => {
      try {
        // toast.info("Fetching meeting...");
        const response = await instance.get(
          `/meetings/participant/${status}/${meetingId}`
        );
        // toast.success("Meeting fetched successfully");
        return response.data;
      } catch (error) {
        toast.error(error?.response?.data?.message);
        console.log(error?.response?.data);
        throw error?.response?.data;
      }
    }
  );

const participantMeetingSlice = createSlice({
    name: "participantMeeting",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUpcomingMeetings.fulfilled, (state, action) => {
            if(action.payload?.success){
                state.upcomingMeetings = action.payload?.data;
            }
        });
        builder.addCase(getCancelledMeetings.fulfilled, (state, action) => {
            if(action.payload?.success){
                state.cancelledMeetings = action.payload?.data;
            }
        });
        builder.addCase(getInProgressMeetings.fulfilled, (state, action) => {
            if(action.payload?.success){
                state.inProgressMeetings = action.payload?.data;
            }
        });
        builder.addCase(getCompletedMeetings.fulfilled, (state, action) => {
           if(action.payload?.success){
               state.completedMeetings = action.payload?.data;
           }
        });
    }
});

export const participantMeetingReducer = participantMeetingSlice.reducer;


    