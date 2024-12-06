import { supabase } from "@/supabase";

type QueryParams = {
    columns?: string; // Cột cần select
    filters?: Record<string, any>; // Bộ lọc thông thường (dạng key-value)
    arrayFilters?: Record<string, { contains?: any[]; containedBy?: any[] }>; // Bộ lọc cho cột dạng mảng
};

// Lấy tất cả các bản ghi trong bảng `quizzes`
const getAllQuizzes = async (params: QueryParams = {}) => {
    const { columns = '*', filters = {} } = params;

    let query = supabase.from('quizzes').select(columns);

    // Áp dụng các điều kiện lọc
    for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value);
    }

    const { data: quizzes, error } = await query;
    return { quizzes, error };
};

// Lấy bản ghi trong `quizzes` với các cột cụ thể và bảng tham chiếu
const getSpecificQuizzes = async (params: QueryParams = {}) => {
    const {
        columns = 'id, quiz_title, duration, created_at, course_id',
        filters = {},
    } = params;

    let query = supabase.from('quizzes').select(columns);

    // Áp dụng bộ lọc
    for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value);
    }

    const { data: quizzes, error } = await query;
    return { quizzes, error };
};

// Lấy `quizzes` với điều kiện lọc phức tạp
const getQuizzesWithFilter = async (params: QueryParams = {}) => {
    const { columns = '*', filters = {}, arrayFilters = {} } = params;

    let query = supabase.from('quizzes').select(columns);

    // Áp dụng bộ lọc thông thường
    for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value);
    }

    // Áp dụng bộ lọc cho cột dạng mảng
    for (const [key, condition] of Object.entries(arrayFilters)) {
        if (condition.contains) {
            query = query.contains(key, condition.contains);
        }
        if (condition.containedBy) {
            query = query.containedBy(key, condition.containedBy);
        }
    }

    const { data: quizzes, error } = await query;
    return { quizzes, error };
};

export { getAllQuizzes, getSpecificQuizzes, getQuizzesWithFilter };
