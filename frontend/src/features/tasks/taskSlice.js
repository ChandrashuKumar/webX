import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createTask, fetchTasksByTeam, updateTask } from "./taskAPI";

export const createTaskThunk = createAsyncThunk(
  "tasks/createTask",
  async ({ token, taskData }, thunkAPI) => {
    try {
      const task = await createTask(token, taskData);
      return task;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to create task"
      );
    }
  }
);

export const updateTaskThunk = createAsyncThunk(
  "tasks/updateTask",
  async ({ token, taskId, taskData }, thunkAPI) => {
    try {
      const updated = await updateTask(token, taskId, taskData);
      return updated;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update task"
      );
    }
  }
);

export const fetchTasksByTeamThunk = createAsyncThunk(
  "tasks/fetchTasksByTeam",
  async ({ token, teamId }, thunkAPI) => {
    try {
      const tasks = await fetchTasksByTeam(token, teamId);
      return tasks;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch tasks"
      );
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksByTeamThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasksByTeamThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasksByTeamThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTaskThunk.fulfilled, (state, action) => {
        state.tasks.push(action.payload); // Optimistically add the created task
      })
      .addCase(updateTaskThunk.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) state.tasks[index] = action.payload;
      });
  },
});

export default taskSlice.reducer;
