// teacherApiService.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000/api";

const API = axios.create({
  baseURL: API_BASE_URL,
});

API.interceptors.request.use(async (config) => {
  const userData = await AsyncStorage.getItem("userData");

  if (userData) {
    const parsedUserData = JSON.parse(userData);
    const token = parsedUserData?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

// ========== CLASS ==========
export const fetchTeacherClasses = () =>
  API.get("/get-list-classes-by-teacher");
export const createClass = (formData: FormData) =>
  API.post("/create-new-class-by-teacher", formData);
export const updateClass = (formData: FormData) =>
  API.put("/update-infor-of-class-by-teacher", formData);
export const deleteClass = (params: any) =>
  API.delete("/delete-class-by-teacher", { params });
export const getClassDetail = (params: any) =>
  API.get("/get-infor-of-class-by-teacher", { params });

// ========== STUDENT ==========
export const addStudentToClass = (body: any) =>
  API.post("/add-new-student-to-class-by-teacher", body);
export const removeStudentFromClass = (params: any) =>
  API.delete("/delete-student-of-class-by-teacher", { params });

// ========== QUESTION ==========
export const fetchQuestions = () => API.get("/get-questions-by-teacher");
export const createQuestion = (body: any) =>
  API.post("/create-new-question-by-teacher", body);
export const updateQuestion = (body: any) =>
  API.put("/update-question-by-teacher", body);
export const deleteQuestion = (params: any) =>
  API.delete("/delete-question-by-teacher", { params });

// ========== EXAM ==========
export const createExam = (body: any) =>
  API.post("/create-new-exam-by-teacher", body);
export const updateExam = (body: any) =>
  API.put("/update-one-exam-by-teacher", body);
export const assignInvigilator = (body: any) =>
  API.put("/update-one-exam-invigilator-by-teacher", body);
export const deleteExam = (params: any) =>
  API.delete("/delete-one-exam-by-teacher", { params });
export const openExam = (body: any) => API.put("/open-exam-by-teacher", body);
export const fetchInvigilatorExams = () =>
  API.get("/get-list-exam-of-invigilator-by-teacher");

// ========== DOCUMENT ==========
export const uploadDocuments = (formData: FormData) =>
  API.post("/post-new-documents-by-teacher", formData);
export const deleteDocument = (params: any) =>
  API.delete("/delete-one-documents-by-documentId", { params });

// ========== VIDEO ROOM ==========
export const createVideoRoom = (body: any) =>
  API.post("/create-room-video-by-teacher", body);

export const teacherApi = {
  fetchTeacherClasses,
  createClass,
  updateClass,
  deleteClass,
  getClassDetail,
  addStudentToClass,
  removeStudentFromClass,
  fetchQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  createExam,
  updateExam,
  assignInvigilator,
  deleteExam,
  openExam,
  fetchInvigilatorExams,
  uploadDocuments,
  deleteDocument,
  createVideoRoom,
};
