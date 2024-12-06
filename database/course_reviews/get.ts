import { supabase } from "@/supabase";

type QueryParams = {
    columns?: string; // Cột cần select
    filters?: Record<string, any>; // Bộ lọc thông thường (dạng key-value)
    arrayFilters?: Record<string, { contains?: any[]; containedBy?: any[] }>; // Bộ lọc cho cột dạng mảng
};

// Lấy tất cả các bản ghi trong bảng `course_reviews`
const getAllCourseReviews = async (params: QueryParams = {}) => {
    const { columns = '*', filters = {} } = params;

    let query = supabase.from('course_reviews').select(columns);

    // Áp dụng các điều kiện lọc
    for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value);
    }

    const { data: courseReviews, error } = await query;
    return { courseReviews, error };
};

// Lấy bản ghi trong `course_reviews` với các cột cụ thể và bảng tham chiếu
const getSpecificCourseReviews = async (params: QueryParams = {}) => {
    const {
        columns = 'id, course_id, reviewer_id, rating, comment, created_at',
        filters = {},
    } = params;

    let query = supabase.from('course_reviews').select(columns);

    // Áp dụng bộ lọc
    for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value);
    }

    const { data: courseReviews, error } = await query;
    return { courseReviews, error };
};

// Lấy `course_reviews` với điều kiện lọc phức tạp
const getCourseReviewsWithFilter = async (params: QueryParams = {}) => {
    const { columns = '*', filters = {}, arrayFilters = {} } = params;

    let query = supabase.from('course_reviews').select(columns);

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

    const { data: courseReviews, error } = await query;
    return { courseReviews, error };
};

export {
    getAllCourseReviews,
    getSpecificCourseReviews,
    getCourseReviewsWithFilter,
};
