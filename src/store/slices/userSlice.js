import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../api/axios";
import { toast } from "react-toastify";

const initialState = {
    user:null,
};
export const updateUser = createAsyncThunk(
    "/user/update",
    async (data) => {
        try {
            // toast.info("Updating user...");
            const response = await instance.put("/users/update", data);
            // toast.success("User updated successfully");
            return response.data;
        }
        catch (error) {
            toast.error(error?.response?.data?.message);
            return error?.response?.data;
        }
    }
);


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    

});

export const userReducer = userSlice.reducer;