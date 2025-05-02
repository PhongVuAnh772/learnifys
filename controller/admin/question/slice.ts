import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Định nghĩa kiểu dữ liệu cho câu hỏi
interface Question {
  id: number;
  questionText: string;
  correctAnswer: string;
  options: string[];
}

// Định nghĩa trạng thái của slice
interface QuestionState {
  questions: Question[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface ExamItem {
  id: number;
  name: string;
  subject: string;
  date: string;
  duration: number;
  questions: Question[];
}

// Trạng thái ban đầu
const initialState: QuestionState = {
  questions: [],
  status: "idle",
  error: null,
};

// Hàm async để fetch tất cả các câu hỏi
export const fetchAllQuestions = createAsyncThunk(
  "question/fetchAllQuestions",
  async () => {
    const response = await axios.get("https://your-api.com/questions");
    return response.data;
  }
);

// Hàm async để xóa một câu hỏi
export const deleteOneQuestion = createAsyncThunk(
  "question/deleteOneQuestion",
  async (id: number) => {
    await axios.delete(`https://your-api.com/questions/${id}`);
    return id;
  }
);

export const fetchExamById = createAsyncThunk(
  "exam/fetchExamById",
  async (id: number) => {
    const response = await axios.get(`https://your-api.com/exams/${id}`);
    return response.data;
  }
);

// Thực hiện cập nhật bài thi
export const updateExam = createAsyncThunk(
  "exam/updateExam",
  async (exam: ExamItem) => {
    const response = await axios.put(
      `https://your-api.com/exams/${exam.id}`,
      exam
    );
    return response.data;
  }
);

// Tạo slice cho câu hỏi
const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions = action.payload;
      })
      .addCase(fetchAllQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(deleteOneQuestion.fulfilled, (state, action) => {
        state.questions = state.questions.filter(
          (question) => question.id !== action.payload
        );
      });
  },
});

// Export slice reducer để sử dụng trong store
export default questionSlice.reducer;
