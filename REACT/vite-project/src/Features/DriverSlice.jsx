
import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// כתובת ה-API של השרת
const API_URL = "https://localhost:7137/api/Driver";

// שליפת כל הנהגים
export const fetchDriversAsync = createAsyncThunk(
  "driver/fetchDriversAsync",
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
//שליפת נהג לפי מזהה
export const fetchDriverByIdAsync = createAsyncThunk(
  "driver/fetchDriverByIdAsync",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },

      });
      return response.data; // הנתונים שיחזרו מהשרת
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// הוספת נהג חדש
export const addDriverAsync = createAsyncThunk(
  "driver/addDriverAsync",
  async (driverData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, driverData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },

      });

      return response.data; // הנתונים שיחזרו מהשרת
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// עדכון פרטי נהג
export const updateDriverAsync = createAsyncThunk(
  "driver/updateDriverAsync",
  async (id, driverData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, driverData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },

      });

      return response.data; // הנתונים שיחזרו מהשרת
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// שליחת הודעה להורים
export const sendMessageToParentsAsync = createAsyncThunk(
  "driver/sendMessageToParentsAsync",
  async (messeges, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/messege`, messeges, {
      });
alert("ההודעה נשלחה בהצלחה!")
      return response.data; // הנתונים שיחזרו מהשרת
    } catch (error) {
      alert("אין אפשרות כרגע לשלוח הודעות!")
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  drivers: [],
  currentDriver: null
};
export const driverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    setCurrentDriver(state, action) {
      state.currentDriver = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDriversAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDriversAsync.fulfilled, (state, action) => {
        state.drivers = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchDriversAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addDriverAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addDriverAsync.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
        state.status = "succeeded";
      })
      .addCase(addDriverAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateDriverAsync.pending, (state) => {
        state.status1 = "loading";
      })
      .addCase(updateDriverAsync.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
        state.status1 = "succeeded";
      })
      .addCase(updateDriverAsync.rejected, (state, action) => {
        state.status1 = "failed";
        state.error = action.payload;
      })
      .addCase(fetchDriverByIdAsync.pending, (state) => {
        state.status1 = "loading";
      })
      .addCase(fetchDriverByIdAsync.fulfilled, (state, action) => {
        state.currentDriver = action.payload;
        state.status1 = "succeeded";
      })
      .addCase(fetchDriverByIdAsync.rejected, (state, action) => {
        state.status1 = "failed";
        state.error = action.payload;
      })
      .addCase(sendMessageToParentsAsync.pending, (state) => {
        state.status2 = "loading";
      })
      .addCase(sendMessageToParentsAsync.fulfilled, (state, action) => {
        state.messageResponse = action.payload;
        state.status2 = "succeeded";
      })
      .addCase(sendMessageToParentsAsync.rejected, (state, action) => {
        state.status2 = "failed";
        state.error = action.payload;
      })
  },
});
export const { setCurrentDriver } = driverSlice.actions;
export default driverSlice.reducer;
