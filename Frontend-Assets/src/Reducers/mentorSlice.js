import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  mentors: [],
  loading: false,
};

export const getData = createAsyncThunk("getData", async () => {
  const res = await fetch(
    "https://mocki.io/v1/efb92edf-570f-4a1e-aeba-8991c3fca8c5"
  );

  const data = await res.json();
  return data.mentors;
});

const mentorSlice = createSlice({
  name: "mentors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.loading = false;
        state.mentors = action.payload;
      })
      .addCase(getData.rejected, (state, action,error) => {
        state.loading = false;
        state.error = action.payload
      });
  },
});

export default mentorSlice.reducer;