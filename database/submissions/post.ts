import { supabase } from "@/supabase";

type SubmissionData = Record<string, any>; // Dữ liệu truyền vào cho insert/upsert/update

// Hàm chèn một bản ghi vào bảng `submissions`
const insertSubmission = async (data: SubmissionData) => {
    const { data: insertedData, error } = await supabase
        .from('submissions')
        .insert([data]) // Chèn một bản ghi
        .select(); // Trả về bản ghi đã chèn

    return { data: insertedData, error };
};

// Hàm chèn nhiều bản ghi vào bảng `submissions`
const insertManySubmissions = async (dataArray: SubmissionData[]) => {
    const { data: insertedData, error } = await supabase
        .from('submissions')
        .insert(dataArray) // Chèn nhiều bản ghi
        .select(); // Trả về các bản ghi đã chèn

    return { data: insertedData, error };
};

// Hàm upsert một hoặc nhiều bản ghi (chèn hoặc cập nhật nếu đã tồn tại)
const upsertSubmissions = async (dataArray: SubmissionData[]) => {
    const { data: upsertedData, error } = await supabase
        .from('submissions')
        .upsert(dataArray) // Chèn hoặc cập nhật
        .select(); // Trả về các bản ghi đã chèn hoặc cập nhật

    return { data: upsertedData, error };
};

// Hàm cập nhật một hoặc nhiều bản ghi dựa trên điều kiện lọc
const updateSubmission = async (
    data: SubmissionData,
    filters: Record<string, any>
) => {
    let query = supabase
        .from('submissions')
        .update(data); // Dữ liệu cần cập nhật

    // Áp dụng các điều kiện lọc
    for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value); // Mặc định sử dụng `eq` để lọc
    }

    const { data: updatedData, error } = await query.select(); // Trả về bản ghi đã cập nhật
    return { data: updatedData, error };
};

export {
    insertSubmission,
    insertManySubmissions,
    upsertSubmissions,
    updateSubmission,
};
