import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Agentapi from '../Agentapi';

/* ---------------------------------------
   FETCH APPOINTMENTS
---------------------------------------- */
export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await Agentapi.get('/appointments');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ---------------------------------------
   UPDATE APPOINTMENT STATUS
---------------------------------------- */
export const updateAppointmentStatus = createAsyncThunk(
  'appointments/updateAppointmentStatus',
  async ({ appointmentId, status }, { rejectWithValue }) => {
    try {
      const response = await Agentapi.patch(
        `/appointments/${appointmentId}`,
        { status }
      );
      return response.data; // updated appointment
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ---------------------------------------
   SLICE
---------------------------------------- */
const appointmentSlice = createSlice({
  name: 'appointments',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* -------- Fetch -------- */
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* -------- Update Status -------- */
      .addCase(updateAppointmentStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
        state.loading = false;

        const updated = action.payload;
        const index = state.data.findIndex(
          (a) => a._id === updated._id
        );

        if (index !== -1) {
          state.data[index] = updated;
        }
      })
      .addCase(updateAppointmentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default appointmentSlice.reducer;
