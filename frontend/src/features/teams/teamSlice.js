import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMyTeams } from "./teamsAPI";

export const fetchMyTeamsThunk = createAsyncThunk(
  "team/fetchMyTeams",
  async (token, thunkAPI) => {
    try {
      const data = await fetchMyTeams(token);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch teams"
      );
    }
  }
);

const teamSlice = createSlice({
  name: "team",
  initialState: {
    teams: [],
    currentTeam: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentTeam: (state, action) => {
      state.currentTeam = action.payload;
    },

    clearCurrentTeam: (state) => {
      state.currentTeam = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyTeamsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyTeamsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload;
        if (!state.currentTeam && action.payload.length > 0) {
          state.currentTeam = action.payload[0];
        }
      })
      .addCase(fetchMyTeamsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentTeam } = teamSlice.actions;
export default teamSlice.reducer;
