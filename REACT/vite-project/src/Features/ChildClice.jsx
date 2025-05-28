import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCurrent } from "./ChaperoneSlice";

// כתובת ה-API של השרת
const API_URL = "https://localhost:7137/api/Child";
// שליפת כל הילדים מהשרת
export const fetchChildrenAsync = createAsyncThunk(
  "child/fetchChildrenAsync",
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
// הוספת ילד חדש לשרת
export const addChildAsync = createAsyncThunk(
  "child/addChildAsync",
  async (childData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, childData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },

      });

      return response.data; // הנתונים שיחזרו מהשרת
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// עדכון פרטי ילד בשרת
export const updateChildAsync = createAsyncThunk(
  "child/updateChildAsync",
  async (childData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/${childData.id}`,
        childData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },

        }
      );

      return response.data; // הנתונים שיחזרו מהשרת
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
const initialState = {
  children: [],
  currentChild: null,
};

export const childSlice = createSlice({
  name: "child",
  initialState,
  reducers: {
    setCurrentChild: (state, action) => {
      state.currentChild = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChildrenAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChildrenAsync.fulfilled, (state, action) => {
        state.children = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchChildrenAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addChildAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addChildAsync.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
        state.status = "succeeded";
      })
      .addCase(addChildAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateChildAsync.pending, (state) => {
        state.status1 = "loading";
      })
      .addCase(updateChildAsync.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
        state.status1 = "succeeded";
      })
      .addCase(updateChildAsync.rejected, (state, action) => {
        state.status1 = "failed";
        state.error = action.payload;
      });
  },
});

export const { setCurrentChild } = childSlice.actions;
export default childSlice.reducer;