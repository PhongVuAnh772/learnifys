import { supabase } from "@/supabase";

type CourseData = Record<string, any>; // Dữ liệu truyền vào cho insert/upsert/update

// Hàm chèn một bản ghi vào bảng `courses`
const insertCourse = async (data: CourseData) => {
    const { data: insertedData, error } = await supabase
        .from('courses')
        .insert([data]) // Chèn một bản ghi
        .select(); // Trả về bản ghi đã chèn

    return { data: insertedData, error };
};

// Hàm chèn nhiều bản ghi vào bảng `courses`
const insertManyCourses = async (dataArray: CourseData[]) => {
    const { data: insertedData, error } = await supabase
        .from('courses')
        .insert(dataArray) // Chèn nhiều bản ghi
        .select(); // Trả về các bản ghi đã chèn

    return { data: insertedData, error };
};

// Hàm upsert một hoặc nhiều bản ghi (chèn hoặc cập nhật nếu đã tồn tại)
const upsertCourses = async (dataArray: CourseData[]) => {
    const { data: upsertedData, error } = await supabase
        .from('courses')
        .upsert(dataArray) // Chèn hoặc cập nhật
        .select(); // Trả về các bản ghi đã chèn hoặc cập nhật

    return { data: upsertedData, error };
};

// Hàm cập nhật một hoặc nhiều bản ghi dựa trên điều kiện lọc
const updateCourse = async (data: CourseData, filters: Record<string, any>) => {
    let query = supabase
        .from('courses')
        .update(data); // Dữ liệu cần cập nhật

    // Áp dụng các điều kiện lọc
    for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value); // Mặc định sử dụng `eq` để lọc
    }

    const { data: updatedData, error } = await query.select(); // Trả về bản ghi đã cập nhật
    return { data: updatedData, error };
};

export { insertCourse, insertManyCourses, upsertCourses, updateCourse };
