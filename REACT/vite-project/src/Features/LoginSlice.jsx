import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Password, Phone } from "@mui/icons-material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";

// כתובת ה-API של השרת
const API_URL = "https://localhost:7137/api/Algorithm/login";

// פונקציית התחברות
export const loginAsync = createAsyncThunk(
    "manager/loginAsync",
    async (loginData, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL, loginData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const token = response.data; // השרת מחזיר את הטוקן ישירות

            if (!token) {
                throw new Error("התחברות נכשלה: הטוקן לא נמצא בתשובה מהשרת");
            }

            localStorage.setItem("authToken", token); // שמירת הטוקן בלוקל סטורג'

            // חילוץ ה־role מהטוקן
            const decoded = jwtDecode(token); // פענוח הטוקן
            const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || "unknown";
            return { token, role,decoded }; // החזרת הטוקן והתפקיד מה־Thunk
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const initialState = {
    currentUser: {},
};
export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.status = "succeeded";
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.status2 = "failed";
                state.error = action.payload;
            })
    },
});
export const {

} = loginSlice.actions;
export default loginSlice.reducer;
