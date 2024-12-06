import { supabase } from "@/supabase";
import bcrypt from "bcryptjs";

interface RegisterUserParams {
    email: string;
    password: string;
    fullName: string;
    dob: string; // YYYY-MM-DD
    gender: 'male' | 'female' | 'other';
    role: string; // role của người dùng, ví dụ 'student' hoặc 'admin'
}

// Mã hóa mật khẩu
const hashPassword = async (password: string) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

// Đăng ký người dùng mới
const registerUser = async (params: RegisterUserParams) => {
    const { email, password, fullName, dob, gender, role } = params;

    try {
        // Mã hóa mật khẩu trước khi lưu
        const hashedPassword = await hashPassword(password);

        // Kiểm tra xem vai trò có tồn tại trong bảng `roles`
        const { data: roles, error: rolesError } = await supabase
            .from("roles")
            .select("id")
            .eq("name", role)
            .single();

        if (rolesError || !roles) {
            throw new Error("Invalid role.");
        }

        // Thêm người dùng vào bảng `users`
        const { data, error } = await supabase
            .from("users")
            .insert([
                {
                    email,
                    password_hash: hashedPassword,
                    full_name: fullName,
                    dob,
                    gender,
                    role_id: roles.id,
                },
            ]);

        if (error) {
            throw new Error(error.message);
        }

        return data; // Trả về người dùng mới đăng ký
    } catch (error) {
        console.error("Error registering user:", error);
        throw new Error("Failed to register user.");
    }
};

const loginUser = async (email: string, password: string) => {
    try {
        // Kiểm tra email trong bảng `users`
        const { data, error } = await supabase
            .from("users")
            .select("id, password_hash")
            .eq("email", email)
            .single();

        if (error || !data) {
            throw new Error("Invalid email or password.");
        }

        // So sánh mật khẩu đã mã hóa
        const isPasswordCorrect = await bcrypt.compare(password, data.password_hash);
        if (!isPasswordCorrect) {
            throw new Error("Invalid email or password.");
        }

        // Đăng nhập thành công, tạo session hoặc JWT
        const { session, error: sessionError } = await supabase.auth.api.setAuth(data.id);
        if (sessionError) {
            throw new Error("Error creating session.");
        }

        return session;
    } catch (error) {
        console.error("Error logging in:", error);
        throw new Error("Login failed.");
    }
};

const updateUser = async (userId: string, updatedParams: Partial<RegisterUserParams>) => {
    const { fullName, dob, gender, role } = updatedParams;

    try {
        // Cập nhật thông tin người dùng
        const { data, error } = await supabase
            .from("users")
            .update({
                full_name: fullName,
                dob,
                gender,
                role_id: role, // Cập nhật vai trò mới nếu có
            })
            .eq("id", userId);

        if (error) {
            throw new Error(error.message);
        }

        return data; // Trả về người dùng đã cập nhật
    } catch (error) {
        console.error("Error updating user:", error);
        throw new Error("Failed to update user.");
    }
};

const deleteUser = async (userId: string) => {
    try {
        // Xóa người dùng khỏi bảng `users`
        const { error } = await supabase
            .from("users")
            .delete()
            .eq("id", userId);

        if (error) {
            throw new Error(error.message);
        }

        console.log("User deleted successfully.");
    } catch (error) {
        console.error("Error deleting user:", error);
        throw new Error("Failed to delete user.");
    }
};
