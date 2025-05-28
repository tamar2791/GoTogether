import React from "react";
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { Phone } from "@mui/icons-material";
import axios from "axios";

// כתובת ה-API של השרת
const API_URL = "https://localhost:7137/api/EducationalInstitution";

// שליפת כל המוסדות מהשרת
export const fetchAllEdusAsync = createAsyncThunk(
  "edu/fetchAllEdusAsync",
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
// הוספת מוסד חינוכי חדש
export const addEduAsync = createAsyncThunk(
  "edu/addEduAsync",
  async (eduData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, eduData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },

      });

      return response.data; // הנתונים שיחזרו מהשרת
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// עדכון פרטי מוסד חינוכי
export const updateEduAsync = createAsyncThunk(
  "edu/updateEduAsync",
  async (eduData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${eduData.id}`, eduData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },

      });

      return response.data; // הנתונים שיחזרו מהשרת
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  edus:[]
};
export const eduSlice = createSlice({
  name: "edu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchAllEdusAsync.pending, (state) => {
      state.status1 = "loading";
    })
    .addCase(fetchAllEdusAsync.fulfilled, (state, action) => {
      state.edus = action.payload;
      state.status1 = "succeeded";
    })
    .addCase(fetchAllEdusAsync.rejected, (state, action) => {
      state.status1 = "failed";
      state.error = action.payload;
    })
      .addCase(addEduAsync.pending, (state) => {
        state.status1 = "loading";
      })
      .addCase(addEduAsync.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
        state.status1 = "succeeded";
      })
      .addCase(addEduAsync.rejected, (state, action) => {
        state.status1 = "failed";
        state.error = action.payload;
      })
      .addCase(updateEduAsync.pending, (state) => {
        state.status1 = "loading";
      })
      .addCase(updateEduAsync.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
        state.status1 = "succeeded";
      })
      .addCase(updateEduAsync.rejected, (state, action) => {
        state.status1 = "failed";
        state.error = action.payload;
      })
  },
});
export const {  } = eduSlice.actions;
export default eduSlice.reducer;
