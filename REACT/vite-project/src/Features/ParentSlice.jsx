import React from "react";
import { useDispatch } from "react-redux";
import { Password, Phone } from "@mui/icons-material";
import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

// כתובת ה-API של השרת
const API_URL = "https://localhost:7137/api/Parent";

// שליפת כל ההורים
export const fetchAllParentsAsync = createAsyncThunk(
  "parent/fetchAllParentsAsync",
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
//שליפת הורה לפי מזהה
export const fetchParentByIdAsync = createAsyncThunk(
  "parent/fetchParentByIdAsync",
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
// שליפת הורה לפי מייל וסיסמא
export const fetchParentByEmailAndPasswordAsync = createAsyncThunk(
  "parent/fetchParentByEmailAndPasswordAsync",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },

      });

      return response.data; // הנתונים שיחזרו מהשרת
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// הוספת הורה (SignUp)
export const SignUpParentAsync = createAsyncThunk(
  "parent/SignUpParentAsync",
  async (parentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, parentData);

      return response.data; // הנתונים שיחזרו מהשרת
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// עדכון פרטי הורה
export const updateParentAsync = createAsyncThunk(
  "parent/updateParentAsync",
  async (parentData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${parentData.id}`, parentData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },

      });

      return response.data; // הנתונים שיחזרו מהשרת
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  parents: [],
  currentParent: null,
  currentParentManager: null,
};
export const parentSlice = createSlice({
  name: "parent",
  initialState,
  reducers: {
    setCurrentParentManager(state, action) {
      state.currentParentManager = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllParentsAsync.pending, (state) => {
        state.status1 = "loading";
      })
      .addCase(fetchAllParentsAsync.fulfilled, (state, action) => {
        state.parents = action.payload;
        state.status1 = "succeeded";
      })
      .addCase(fetchAllParentsAsync.rejected, (state, action) => {
        state.status1 = "failed";
        state.error = action.payload;
      })
      .addCase(SignUpParentAsync.pending, (state) => {
        state.status1 = "loading";
      })
      .addCase(SignUpParentAsync.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
        state.status1 = "succeeded";
      })
      .addCase(SignUpParentAsync.rejected, (state, action) => {
        state.status1 = "failed";
        state.error = action.payload;
      })
      .addCase(updateParentAsync.pending, (state) => {
        state.status1 = "loading";
      })
      .addCase(updateParentAsync.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
        state.status1 = "succeeded";
      })
      .addCase(updateParentAsync.rejected, (state, action) => {
        state.status1 = "failed";
        state.error = action.payload;
      })
      .addCase(fetchParentByIdAsync.pending, (state) => {
        state.status1 = "loading";
      })
      .addCase(fetchParentByIdAsync.fulfilled, (state, action) => {
        state.currentParent = action.payload;
        state.status1 = "succeeded";
      })
      .addCase(fetchParentByIdAsync.rejected, (state, action) => {
        state.status1 = "failed";
        state.error = action.payload;
      })
  },
});
export const {
  setCurrentParentManager
} = parentSlice.actions;
export default parentSlice.reducer;
