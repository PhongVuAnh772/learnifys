import { supabase } from "@/supabase";
import bcrypt from 'bcryptjs';  // Để mã hóa mật khẩu trước khi lưu trữ

interface RegisterStudentParams {
    email: string;
    password: string;
    fullName: string;
    dob: string; // YYYY-MM-DD
    gender: 'male' | 'female' | 'other';
    courseIds: string[]; // Mảng các khóa học mà học sinh muốn ghi danh
}

// Hàm mã hóa mật khẩu
const hashPassword = async (password: string) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

// Hàm đăng ký học sinh và ghi danh vào khóa học
const registerStudent = async (params: RegisterStudentParams) => {
    const { email, password, fullName, dob, gender, courseIds } = params;

    // Kiểm tra dữ liệu đầu vào
    if (!email || !password || !fullName || !dob || !gender || !courseIds.length) {
        throw new Error("All fields are required.");
    }

    try {
        // Mã hóa mật khẩu trước khi gửi lên server
        const hashedPassword = await hashPassword(password);

        // Gọi hàm SQL register_student để thêm học sinh vào bảng users và ghi danh vào các khóa học
        const { data, error } = await supabase.rpc('register_student', {
            p_email: email,
            p_password: hashedPassword,
            p_full_name: fullName,
            p_dob: dob,
            p_gender: gender,
            p_course_ids: courseIds,
        });

        if (error) {
            console.error('Error registering student:', error);
            throw new Error(error.message);
        } else {
            console.log('Student registered successfully:', data);
            return data; // Trả về dữ liệu sau khi đăng ký thành công
        }
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while registering the student.');
    }
};

// Ví dụ sử dụng hàm đăng ký học sinh
const example = async () => {
    const studentData: RegisterStudentParams = {
        email: 'student@example.com',
        password: 'password123',
        fullName: 'Nguyen Van A',
        dob: '2005-05-15',
        gender: 'male',
        courseIds: ['uuid-course-1', 'uuid-course-2'], // Các khóa học học sinh cần ghi danh
    };

    try {
        const result = await registerStudent(studentData);
        console.log('Registration successful:', result);
    } catch (error) {
        console.error('Registration failed:', error);
    }
};
