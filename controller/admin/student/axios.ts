import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://127.0.0.1:5000/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
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

export const fetchAllUsers = () => axiosInstance.get("/get-all-users");
export const deleteUserById = (id: number) =>
  axiosInstance.delete(`/delete-user-by-id`, { data: { id } });
export const createNewUserByAdmin = (data: any) =>
  axiosInstance.post("/post-new-user-by-admin", data);
export const updateOneUserByAdmin = (id: number, data: any) =>
  axiosInstance.put(`/update-one-user-by-admin`, { id, ...data });
export const getAllClasses = () => axiosInstance.get("/get-all-class");
export const createNewClass = (data: any) =>
  axiosInstance.post("/create-new-class", data);
export const updateClass = (id: number, data: any) =>
  axiosInstance.put(`/update-class`, { id, ...data });
export const deleteOneClass = (id: number) =>
  axiosInstance.delete(`/delete-one-class?classId=${id}`);
export const fetchAllQuestions = () => axiosInstance.get("/get-all-question");
export const createOneQuestion = (data: any) =>
  axiosInstance.post("/create-one-question", data);
export const updateOneQuestion = (id: number, data: any) =>
  axiosInstance.put(`/update-one-question`, { id, ...data });
export const deleteOneQuestion = (id: number) =>
  axiosInstance.delete(`/delete-one-question`, { data: { id } });
export const fetchAllExams = () => axiosInstance.get("/get-all-exam");
export const searchClassByName = (name: string) =>
  axiosInstance.get(`/search-class-by-name`, { params: { name } });
export const getQuestionsTeacher = () =>
  axiosInstance.get("/get-question-tearcher");

export default axiosInstance;
