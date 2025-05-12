import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../student/axios";

// ------------------------ Interfaces ------------------------
export interface Question {
  id: number;
  questionPrompt: string;
  answer: string;
  options: string[];
}

export interface ExamItem {
  id: number;
  name: string;
  subject: string;
  date: string;
  duration: number;
  questions: Question[];
}

interface QuestionState {
  questions: Question[];
  exams: ExamItem | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// ------------------------ Initial State ------------------------
const initialState: QuestionState = {
  questions: [],
  exams: null,
  status: "idle",
  error: null,
};

// ------------------------ Thunks ------------------------

// GET /get-all-question
export const fetchAllQuestions = createAsyncThunk(
  "question/fetchAllQuestions",
  async () => {
    const response = await axiosInstance.get("/get-all-question");
    if (response.data.result) {
      return response.data.data;
    }
    return [];
  }
);

export const deleteOneQuestion = createAsyncThunk(
  "question/deleteOneQuestion",
  async (id: number) => {
    await axiosInstance.delete("/delete-one-question", {
      params: { questionId: id },
    });
    return id;
  }
);

// GET /get-exam-by-id?examId=...
export const fetchExamById = createAsyncThunk(
  "question/fetchExamById",
  async (id: number) => {
    const response = await axiosInstance.get("/get-exam-by-id", {
      params: { examId: id },
    });
    return response.data.data;
  }
);

// PUT /update-one-exam
export const updateExam = createAsyncThunk(
  "question/updateExam",
  async (exam: ExamItem) => {
    const response = await axiosInstance.put("/update-one-exam", exam);
    return response.data.data;
  }
);

// ------------------------ Slice ------------------------
const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all questions
      .addCase(fetchAllQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions = action.payload;
      })
      .addCase(fetchAllQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch questions";
      })

      // Delete one question
      .addCase(deleteOneQuestion.fulfilled, (state, action) => {
        state.questions = state.questions.filter(
          (question) => question.id !== action.payload
        );
      })

      // Fetch exam by ID
      .addCase(fetchExamById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExamById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.exams = action.payload;
      })
      .addCase(fetchExamById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch exam";
      })

      .addCase(updateExam.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateExam.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.exams = action.payload;
      })
      .addCase(updateExam.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to update exam";
      });
  },
});

export default questionSlice.reducer;
