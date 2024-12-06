import { supabase } from "@/supabase";

type InsertData = Record<string, any>; // Dữ liệu dạng key-value
type UpsertData = Record<string, any>; // Tương tự như InsertData

// Hàm chèn một assignment
const insertAssignment = async (data: InsertData) => {
    const { data: insertedData, error } = await supabase
        .from('assignments')
        .insert([data]) // Chèn một bản ghi
        .select(); // Trả về bản ghi đã chèn

    return { data: insertedData, error };
};

// Hàm chèn nhiều assignments
const insertManyAssignment = async (dataArray: InsertData[]) => {
    const { data: insertedData, error } = await supabase
        .from('assignments')
        .insert(dataArray) // Chèn nhiều bản ghi
        .select(); // Trả về các bản ghi đã chèn

    return { data: insertedData, error };
};

// Hàm upsert nhiều assignments (chèn hoặc cập nhật nếu đã tồn tại)
const upsertManyAssignment = async (dataArray: UpsertData[]) => {
    const { data: upsertedData, error } = await supabase
        .from('assignments')
        .upsert(dataArray) // Chèn hoặc cập nhật
        .select(); // Trả về các bản ghi đã chèn hoặc cập nhật

    return { data: upsertedData, error };
};

// Hàm cập nhật một hoặc nhiều bản ghi
const updateRowAssignment = async (data: UpsertData, filters: Record<string, any>) => {
    let query = supabase
        .from('assignments')
        .update(data); // Dữ liệu cần cập nhật

    // Áp dụng bộ lọc để chỉ định bản ghi cần cập nhật
    for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value);
    }

    const { data: updatedData, error } = await query.select(); // Trả về bản ghi đã cập nhật
    return { data: updatedData, error };
};

export {
    insertAssignment,
    insertManyAssignment,
    upsertManyAssignment,
    updateRowAssignment
};
