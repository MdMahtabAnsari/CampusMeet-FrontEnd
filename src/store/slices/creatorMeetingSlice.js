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
  "/meetings/creator/upcoming",
  async () => {
    try {
      // toast.info("Fetching upcoming meetings...");
      const response = await instance.get("/meetings/creator/upcoming");
      // toast.success("Upcoming meetings fetched successfully");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data);
      throw error?.response?.data;
    }
  }
);

export const getCancelledMeetings = createAsyncThunk(
  "/meetings/creator/cancelled",
  async () => {
    try {
      // toast.info("Fetching cancelled meetings...");
      const response = await instance.get("/meetings/creator/cancelled");
      // toast.success("Cancelled meetings fetched successfully");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data);
      throw error?.response?.data;
    }
  }
);

export const getInProgressMeetings = createAsyncThunk(
  "/meetings/creator/inProgress",
  async () => {
    try {
      // toast.info("Fetching in progress meetings...");
      const response = await instance.get("/meetings/creator/in-progress");
      // toast.success("In progress meetings fetched successfully");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data);
      throw error?.response?.data;
    }
  }
);

export const getCompletedMeetings = createAsyncThunk(
  "/meetings/creator/completed",
  async () => {
    try {
      // toast.info("Fetching completed meetings...");
      const response = await instance.get("/meetings/creator/completed");
      // toast.success("Completed meetings fetched successfully");

      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data);
      throw error?.response?.data;
    }
  }
);

export const cancelMeeting = createAsyncThunk(
  "/meeting/update-status/cancelled",
  async (meetingId) => {
    try {
      // toast.info("Cancelling meeting...");
      const response = await instance.put(
        `/meetings/update-status/cancelled/${meetingId}`
      );
      // toast.success("Meeting cancelled successfully");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data);
      throw error?.response?.data;
    }
  }
);

export const completeMeeting = createAsyncThunk(
  "/meeting/update-status/complete",
  async (meetingId) => {
    try {
      // toast.info("Completing meeting...");
      const response = await instance.put(
        `/meetings/update-status/completed/${meetingId}`
      );
      // toast.success("Meeting completed successfully");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data);
      throw error?.response?.data;
    }
  }
);

export const jointMeeting = createAsyncThunk(
  "/meetings/creator/join",
  async (meetingId) => {
    try {
      // toast.info("Starting meeting...");
      const response = await instance.get(
        `/meetings/creator/join/${meetingId}`
      );
      // toast.success("Meeting started successfully");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data);
      throw error?.response?.data;
    }
  }
);

export const updateMeeting = createAsyncThunk(
  "/meeting/update",
  async ({ meetingId, meetingData }) => {
    try {
      // toast.info("Updating meeting...");
      const response = await instance.put(
        `/meetings/update/${meetingId}`,
        meetingData
      );
      // toast.success("Meeting updated successfully");
      return response.data;
    } catch (error) {
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
        `/meetings/creator/${status}/${meetingId}`
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

export const createMeeting = createAsyncThunk(
  "/meeting/create",
  async (meetingData) => {
    try {
      // toast.info("Creating meeting...");
      const response = await instance.post("/meetings/create", meetingData);
      // toast.success("Meeting created successfully");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data);
      throw error?.response?.data;
    }
  }
);

export const getMeetingById = createAsyncThunk(
  "/meeting/getById",
  async (meetingId) => {
    try {
      // toast.info("Fetching meeting...");
      const response = await instance.get(`/meetings/${meetingId}`);
      // toast.success("Meeting fetched successfully");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data);
      throw error?.response?.data;
    }
  }
);

const creatorMeetingSlice = createSlice({
  name: "creatorMeeting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUpcomingMeetings.fulfilled, (state, action) => {
      if (action.payload?.success) {
        state.upcomingMeetings = action.payload?.data;
      }
    });
    builder.addCase(getCancelledMeetings.fulfilled, (state, action) => {
      if (action.payload?.success) {
        state.cancelledMeetings = action.payload?.data;
      }
    });
    builder.addCase(getInProgressMeetings.fulfilled, (state, action) => {
      if (action.payload?.success) {
        state.inProgressMeetings = action.payload?.data;
      }
    });
    builder.addCase(getCompletedMeetings.fulfilled, (state, action) => {
      if (action.payload?.success) {
        state.completedMeetings = action.payload?.data;
      }
    });
    builder.addCase(cancelMeeting.fulfilled, (state, action) => {
      if (action.payload?.success) {
        state.upcomingMeetings = state.upcomingMeetings.filter(
          (meeting) => meeting._id !== action.payload?.data?._id
        );
      }
    });
    builder.addCase(completeMeeting.fulfilled, (state, action) => {
      if (action.payload?.success) {
        state.inProgressMeetings = state.inProgressMeetings.filter(
          (meeting) => meeting._id !== action.payload?.data?._id
        );
      }
    });
  },
});

export const creatorMeetingReducer = creatorMeetingSlice.reducer;
