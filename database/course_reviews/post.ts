import { supabase } from "@/supabase";

type CourseReviewData = Record<string, any>; // Dữ liệu truyền vào cho insert/upsert/update

// Hàm chèn một bản ghi vào bảng `course_reviews`
const insertCourseReview = async (data: CourseReviewData) => {
    const { data: insertedData, error } = await supabase
        .from('course_reviews')
        .insert([data]) // Chèn một bản ghi
        .select(); // Trả về bản ghi đã chèn

    return { data: insertedData, error };
};

// Hàm chèn nhiều bản ghi vào bảng `course_reviews`
const insertManyCourseReviews = async (dataArray: CourseReviewData[]) => {
    const { data: insertedData, error } = await supabase
        .from('course_reviews')
        .insert(dataArray) // Chèn nhiều bản ghi
        .select(); // Trả về các bản ghi đã chèn

    return { data: insertedData, error };
};

// Hàm upsert một hoặc nhiều bản ghi (chèn hoặc cập nhật nếu đã tồn tại)
const upsertCourseReviews = async (dataArray: CourseReviewData[]) => {
    const { data: upsertedData, error } = await supabase
        .from('course_reviews')
        .upsert(dataArray) // Chèn hoặc cập nhật
        .select(); // Trả về các bản ghi đã chèn hoặc cập nhật

    return { data: upsertedData, error };
};

// Hàm cập nhật một hoặc nhiều bản ghi dựa trên điều kiện lọc
const updateCourseReview = async (
    data: CourseReviewData,
    filters: Record<string, any>
) => {
    let query = supabase
        .from('course_reviews')
        .update(data); // Dữ liệu cần cập nhật

    // Áp dụng các điều kiện lọc
    for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value); // Mặc định sử dụng `eq` để lọc
    }

    const { data: updatedData, error } = await query.select(); // Trả về bản ghi đã cập nhật
    return { data: updatedData, error };
};

export {
    insertCourseReview,
    insertManyCourseReviews,
    upsertCourseReviews,
    updateCourseReview,
};
