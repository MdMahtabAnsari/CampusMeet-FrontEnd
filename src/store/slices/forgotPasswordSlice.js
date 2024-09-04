import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../api/axios";
import { toast } from "react-toastify";

const initialState = {
    email: null,
};

export const generateOtp = createAsyncThunk(
    "/auth/forgot-password",
    async (data) => {
        try {
            // toast.info("Generating OTP...");
            const response = await instance.post("/otp/create", data);
            // toast.success("OTP sent successfully");
            return response?.data;
        }
        catch (error) {
            toast.error(error?.response?.data?.message);
            return error?.response?.data;
        }
    }
);

export const verifyOtp = createAsyncThunk(
    "/auth/forgot-password/otp",
    async (data) => {
        try {
            // toast.info("Verifying OTP...");
            const response = await instance.post("/otp/verify", data);
            // toast.success("OTP verified successfully");
            return response?.data;
        }
        catch (error) {
            toast.error(error?.response?.data?.message);
            return error?.response?.data;
        }
    }
);

export const resetPassword = createAsyncThunk(
    "/auth/forgot-password/new-password",
    async (data) => {
        try {
            // toast.info("Resetting password...");
            const response = await instance.post("/auth/resetPassword", data);
            // toast.success("Password reset successfully");
            return response?.data;
        }
        catch (error) {
            toast.error(error?.response?.data?.message);
            return error?.response?.data;
        }
    }
);

const forgotPasswordSlice = createSlice({
    name: "forgotPassword",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(generateOtp.fulfilled, (state, action) => {
            if (action?.payload?.success) {
                state.email = action?.payload?.data?.email;
            }
        }).addCase(verifyOtp.fulfilled, (state, action) => {
            if (action?.payload?.success) {
                state.email = action?.payload?.data?.email;
            }
        }
        ).addCase(resetPassword.fulfilled, (state, action) => {
            if (action?.payload?.success) {
                state.email = null;
            }
        });
        
    }

});


export const forgotPasswordReducer = forgotPasswordSlice.reducer;