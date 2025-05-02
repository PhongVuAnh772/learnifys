import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as adminAPI from "./axios";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  genderId: string; // ví dụ: "M" hoặc "F"
  roleId: "ADMIN" | "TEACHER" | "STUDENT" | "PARENTS";
  image?: string; // nếu có ảnh đại diện
}

// Thunk để fetch tất cả người dùng với xử lý lỗi
export const fetchAllUsers = createAsyncThunk<User[]>(
  "admin/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminAPI.fetchAllUsers();
      return response.data;
    } catch (error) {
      return rejectWithValue("Lỗi khi tải người dùng.");
    }
  }
);

// Thunk để xóa người dùng với xử lý lỗi
export const deleteUserById = createAsyncThunk<number, number>(
  "admin/deleteUserById",
  async (id: number, { rejectWithValue }) => {
    try {
      await adminAPI.deleteUserById(id);
      return id; // Trả về id đã xóa
    } catch (error) {
      return rejectWithValue("Lỗi khi xóa người dùng.");
    }
  }
);

// Thunk để tạo người dùng mới với xử lý lỗi
export const createNewUserByAdmin = createAsyncThunk<User, any>(
  "admin/createNewUserByAdmin",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await adminAPI.createNewUserByAdmin(data);
      console.log(response.data, "dfdfdfdfdfdfdf");
      return response.data;
    } catch (error) {
      return rejectWithValue("Lỗi khi tạo người dùng.");
    }
  }
);

// Thunk để cập nhật thông tin người dùng với xử lý lỗi
export const updateOneUserByAdmin = createAsyncThunk<
  User,
  { id: number; data: any }
>("admin/updateOneUserByAdmin", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await adminAPI.updateOneUserByAdmin(id, data);
    return response.data;
  } catch (error) {
    return rejectWithValue("Lỗi khi cập nhật người dùng.");
  }
});

// Thunk: Lấy tất cả lớp học
export const fetchAllClasses = createAsyncThunk<any[]>(
  "admin/fetchAllClasses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getAllClasses();
      return response.data;
    } catch (error) {
      return rejectWithValue("Lỗi khi tải danh sách lớp học.");
    }
  }
);

// Thunk: Tạo lớp học
export const createNewClass = createAsyncThunk<any, any>(
  "admin/createNewClass",
  async (data, { rejectWithValue }) => {
    try {
      const response = await adminAPI.createNewClass(data);
      return response.data;
    } catch (error) {
      return rejectWithValue("Lỗi khi tạo lớp học.");
    }
  }
);

// Thunk: Cập nhật lớp học
export const updateClass = createAsyncThunk<any, { id: number; data: any }>(
  "admin/updateClass",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await adminAPI.updateClass(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue("Lỗi khi cập nhật lớp học.");
    }
  }
);

// Thunk: Xoá lớp học
export const deleteOneClass = createAsyncThunk<number, number>(
  "admin/deleteOneClass",
  async (id, { rejectWithValue }) => {
    try {
      await adminAPI.deleteOneClass(id);
      return id;
    } catch (error) {
      return rejectWithValue("Lỗi khi xoá lớp học.");
    }
  }
);

interface AdminState {
  users: User[];
  classes: any[];
  questions: any[];
  exams: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [] as User[],
    classes: [],
    questions: [],
    exams: [],
    status: "idle", // idle, loading, succeeded, failed
    error: null,
  } as AdminState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all users
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string; // Set the error message
      })
      // Delete user by id
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.error = action.payload as string; // Set the error message
      })
      // Create new user by admin
      .addCase(createNewUserByAdmin.fulfilled, (state, action) => {
        if (Array.isArray(state.users)) {
          state.users = [...state.users, action.payload];
        } else {
          console.error("state.users is not an array:", state.users);
          state.users = [action.payload];
        }
      })
      .addCase(createNewUserByAdmin.rejected, (state, action) => {
        state.error = action.payload as string; // Set the error message
      })
      // Update user by admin
      .addCase(updateOneUserByAdmin.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateOneUserByAdmin.rejected, (state, action) => {
        state.error = action.payload as string; // Set the error message
      })
      // Class
      .addCase(fetchAllClasses.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllClasses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.classes = action.payload;
      })
      .addCase(fetchAllClasses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(createNewClass.fulfilled, (state, action) => {
        state.classes.push(action.payload);
      })
      .addCase(createNewClass.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateClass.fulfilled, (state, action) => {
        const index = state.classes.findIndex(
          (cls: any) => cls.id === action.payload.id
        );
        if (index !== -1) {
          state.classes[index] = action.payload;
        }
      })
      .addCase(updateClass.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteOneClass.fulfilled, (state, action) => {
        state.classes = state.classes.filter(
          (cls: any) => cls.id !== action.payload
        );
      })
      .addCase(deleteOneClass.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default adminSlice.reducer;
