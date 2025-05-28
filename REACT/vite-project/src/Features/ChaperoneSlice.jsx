import React from "react";
import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { Email } from "@mui/icons-material";
import axios from "axios";

// כתובת ה-API
const API_URL = "https://localhost:7137/api/Chaperone";

//  שליפת כל המלווים מהשרת
export const fetchChaperones = createAsyncThunk(
    "chaperone/fetchChaperones",
    async () => {
        try {
            const response = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },

            });
            return response.data;
        } catch (error) {
            console.error("Error fetching chaperones:", error);
            throw error;
        }
    }
);

export const addChaperone = createAsyncThunk(
    "child/addChildAsync",
    async (chaperoneData, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL, chaperoneData, {
                headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },

            });

            return response.data; // הנתונים שיחזרו מהשרת
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


//  עדכון מלווה קיים
export const updateChaperone = createAsyncThunk(
    "chaperone/updateChaperone",
    async ( {id, updatedData} ) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, updatedData,{
                headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },

            });
            return response.data;
        } catch (error) {
            console.error("Error updating chaperone:", error);
            throw error;
        }
    }
);

const initialState = {
    chaperones: [],
    currentChaperone: {
        id: "",
        name: "",
        phone: "",
        email: "",
        address: "",
        status: true,
    },
};
export const chaperoneSlice = createSlice({
    name: "chaperone",
    initialState,
    reducers: {
        setCurrent: (state, action) => {
            state.currentChaperone = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addChaperone.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addChaperone.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.chaperones.push(action.payload);
            })
            .addCase(addChaperone.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchChaperones.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchChaperones.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.chaperones = action.payload;
            })
            .addCase(fetchChaperones.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});
export const { setCurrent } = chaperoneSlice.actions;

export default chaperoneSlice.reducer;
