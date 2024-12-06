import { supabase } from "@/supabase";

type QueryParams = {
    columns?: string; // Cột cần select
    filters?: Record<string, any>; // Bộ lọc thông thường (dạng key-value)
    arrayFilters?: Record<string, { contains?: any[]; containedBy?: any[] }>; // Bộ lọc cho cột dạng mảng
};

// Lấy tất cả các bản ghi trong bảng `submissions`
const getAllSubmissions = async (params: QueryParams = {}) => {
    const { columns = '*', filters = {} } = params;

    let query = supabase.from('submissions').select(columns);

    // Áp dụng các điều kiện lọc
    for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value);
    }

    const { data: submissions, error } = await query;
    return { submissions, error };
};

// Lấy bản ghi trong `submissions` với các cột cụ thể và bảng tham chiếu
const getSpecificSubmissions = async (params: QueryParams = {}) => {
    const {
        columns = 'id, student_id, quiz_id, submitted_at, grade',
        filters = {},
    } = params;

    let query = supabase.from('submissions').select(columns);

    // Áp dụng bộ lọc
    for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value);
    }

    const { data: submissions, error } = await query;
    return { submissions, error };
};

// Lấy `submissions` với điều kiện lọc phức tạp
const getSubmissionsWithFilter = async (params: QueryParams = {}) => {
    const { columns = '*', filters = {}, arrayFilters = {} } = params;

    let query = supabase.from('submissions').select(columns);

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

    const { data: submissions, error } = await query;
    return { submissions, error };
};

export { getAllSubmissions, getSpecificSubmissions, getSubmissionsWithFilter };
