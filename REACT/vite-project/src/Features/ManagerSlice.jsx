
import React from "react";
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { Password, Phone } from "@mui/icons-material";
import axios from "axios";

// כתובת ה-API של השרת
const API_URL = "https://localhost:7137/api/Manager";

// שליפת כל המנהלים
export const fetchManagersAsync = createAsyncThunk(
    "manager/fetchManagersAsync",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },

            });

            return response.data; // הנתונים שיחזרו מהשרת
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
// עדכון פרטי מנהל
export const updateManagerAsync = createAsyncThunk(
    "manager/updateManagerAsync",
    async (managerData, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/${managerData.id}`, managerData, {
                headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },

            });

            return response.data; // הנתונים שיחזרו מהשרת
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const initialState = {
    managers:[],
};
export const managerSlice = createSlice({
    name: "manager",
    initialState,
    reducers: {    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchManagersAsync.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchManagersAsync.fulfilled, (state, action) => {
            state.managers = action.payload;
            state.status = "succeeded";
        })
        .addCase(fetchManagersAsync.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })
            .addCase(updateManagerAsync.pending, (state) => {
                state.status1 = "loading";
            })
            .addCase(updateManagerAsync.fulfilled, (state, action) => {
                Object.assign(state, action.payload);
                state.status1 = "succeeded";
            })
            .addCase(updateManagerAsync.rejected, (state, action) => {
                state.status1 = "failed";
                state.error = action.payload;
            })
    },
});
export const {

} = managerSlice.actions;
export default managerSlice.reducer;
