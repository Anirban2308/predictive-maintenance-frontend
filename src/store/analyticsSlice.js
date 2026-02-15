import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Agentapi from "../Agentapi";

export const fetchAnalytics = createAsyncThunk(
  "analytics/fetch",
  async () => {
    const res = await Agentapi.get("/analytics/full");
    return res.data;
  }
);

const analyticsSlice = createSlice({
  name: "analytics",
  initialState: {
    sensors: {},
    violations: [],
    timeline: [],
    loading: true,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.sensors = action.payload.sensors;
        state.violations = action.payload.violations;
        state.timeline = action.payload.timeline;
      });
  },
});

export default analyticsSlice.reducer;
