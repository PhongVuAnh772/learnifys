import { supabase } from "@/supabase";

interface CreateAccountParams {
    email: string;
    password: string;
    fullName: string;
    dob: string; // Ngày sinh
    gender: 'male' | 'female' | 'other';
    role: 'student' | 'teacher' | 'admin' | 'parent'; // Vai trò người dùng
}

const createAccount = async ({ email, password, fullName, dob, gender, role }: CreateAccountParams) => {
    try {
        // Mã hóa mật khẩu trước khi lưu (giả sử bạn có hàm mã hóa)
        const passwordHash = await hashPassword(password);

        const { data, error } = await supabase
            .from('users')
            .insert([
                {
                    email,
                    password_hash: passwordHash,
                    full_name: fullName,
                    dob,
                    gender,
                    role,
                    status: 'active', // Mặc định trạng thái là 'active'
                }
            ]);

        if (error) {
            throw new Error(error.message);
        }

        console.log('Account created successfully:', data);
        return data;
    } catch (error) {
        console.error('Error creating account:', error);
        throw new Error('Failed to create account');
    }
};

// Giả sử bạn có hàm mã hóa mật khẩu:
const hashPassword = async (password: string) => {
    // Ví dụ về mã hóa mật khẩu, bạn có thể sử dụng thư viện bcrypt hoặc crypto để mã hóa mật khẩu
    return password; // Placeholder, thay thế bằng mã hóa thực tế
};

interface UpdateAccountParams {
    userId: string; // ID người dùng
    fullName?: string;
    dob?: string;
    gender?: 'male' | 'female' | 'other';
    role?: 'student' | 'teacher' | 'admin' | 'parent';
    status?: 'active' | 'inactive';
}

const updateAccount = async ({ userId, fullName, dob, gender, role, status }: UpdateAccountParams) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .update({
                full_name: fullName,
                dob,
                gender,
                role,
                status,
            })
            .eq('id', userId);

        if (error) {
            throw new Error(error.message);
        }

        console.log('Account updated successfully:', data);
        return data;
    } catch (error) {
        console.error('Error updating account:', error);
        throw new Error('Failed to update account');
    }
};
const deleteAccount = async (userId: string) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .delete()
            .eq('id', userId);

        if (error) {
            throw new Error(error.message);
        }

        console.log('Account deleted successfully:', data);
        return data;
    } catch (error) {
        console.error('Error deleting account:', error);
        throw new Error('Failed to delete account');
    }
};
const getAccountInfo = async (userId: string) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId);

        if (error) {
            throw new Error(error.message);
        }

        console.log('Account info:', data);
        return data;
    } catch (error) {
        console.error('Error fetching account info:', error);
        throw new Error('Failed to fetch account info');
    }
};
