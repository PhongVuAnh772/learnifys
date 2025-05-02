import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { teacherApi } from "./axios";

// Types
interface ClassItem {
  id: string;
  name: string;
  [key: string]: any;
}

interface TeacherState {
  classes: ClassItem[];
  loading: boolean;
  error: string | null;
}

const initialState: TeacherState = {
  classes: [],
  loading: false,
  error: null,
};

// Async actions
export const fetchTeacherClasses = createAsyncThunk(
  "teacher/fetchTeacherClasses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await teacherApi.fetchTeacherClasses();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteClass = createAsyncThunk(
  "teacher/deleteClass",
  async (params: { classId: string }, { rejectWithValue }) => {
    try {
      await teacherApi.deleteClass(params);
      return params.classId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchTeacherClasses
      .addCase(fetchTeacherClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTeacherClasses.fulfilled,
        (state, action: PayloadAction<ClassItem[]>) => {
          state.loading = false;
          state.classes = action.payload;
        }
      )
      .addCase(fetchTeacherClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // deleteClass
      .addCase(
        deleteClass.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.classes = state.classes.filter(
            (cls) => cls.id !== action.payload
          );
        }
      );
  },
});

export default teacherSlice.reducer;
