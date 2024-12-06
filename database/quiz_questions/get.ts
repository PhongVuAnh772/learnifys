import { supabase } from "@/supabase";

type QueryParams = {
    columns?: string; // Cột cần select
    filters?: Record<string, any>; // Bộ lọc thông thường (dạng key-value)
    arrayFilters?: Record<string, { contains?: any[]; containedBy?: any[] }>; // Bộ lọc cho cột dạng mảng
};

// Lấy tất cả các bản ghi trong bảng `quiz_questions`
const getAllQuizQuestions = async (params: QueryParams = {}) => {
    const { columns = '*', filters = {} } = params;

    let query = supabase.from('quiz_questions').select(columns);

    // Áp dụng các điều kiện lọc
    for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value);
    }

    const { data: quizQuestions, error } = await query;
    return { quizQuestions, error };
};

// Lấy bản ghi trong `quiz_questions` với các cột cụ thể và bảng tham chiếu
const getSpecificQuizQuestions = async (params: QueryParams = {}) => {
    const {
        columns = 'id, question_text, correct_answer, quiz_id, created_at',
        filters = {},
    } = params;

    let query = supabase.from('quiz_questions').select(columns);

    // Áp dụng bộ lọc
    for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value);
    }

    const { data: quizQuestions, error } = await query;
    return { quizQuestions, error };
};

// Lấy `quiz_questions` với điều kiện lọc phức tạp
const getQuizQuestionsWithFilter = async (params: QueryParams = {}) => {
    const { columns = '*', filters = {}, arrayFilters = {} } = params;

    let query = supabase.from('quiz_questions').select(columns);

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

    const { data: quizQuestions, error } = await query;
    return { quizQuestions, error };
};

export { getAllQuizQuestions, getSpecificQuizQuestions, getQuizQuestionsWithFilter };
