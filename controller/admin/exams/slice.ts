import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ExamItem } from "../question/slice";

// Định nghĩa kiểu dữ liệu cho bài thi
export interface Exam {
  id: number;
  name: string;
  subject: string;
  date: string;
  duration: string;
}

// Định nghĩa trạng thái của slice
interface ExamState {
  exams: ExamItem;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Trạng thái ban đầu
const initialState: ExamState = {
  exams: null,
  status: "idle",
  error: null,
};

// Hàm async để fetch tất cả các bài thi
export const fetchAllExams = createAsyncThunk(
  "exam/fetchAllExams",
  async () => {
    const response = await axios.get("https://your-api.com/exams");
    return response.data;
  }
);

// Hàm async để xóa một bài thi
export const deleteOneExam = createAsyncThunk(
  "exam/deleteOneExam",
  async (id: number) => {
    await axios.delete(`https://your-api.com/exams/${id}`);
    return id;
  }
);

// Tạo slice cho exam
const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllExams.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllExams.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.exams = action.payload;
      })
      .addCase(fetchAllExams.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

// Export slice reducer để sử dụng trong store
export default examSlice.reducer;
