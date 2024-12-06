import { supabase } from "@/supabase";

type UserData = Record<string, any>; // Dữ liệu truyền vào cho insert/upsert/update

// Hàm chèn một bản ghi vào bảng `users`
const insertUser = async (data: UserData) => {
    const { data: insertedData, error } = await supabase
        .from('users')
        .insert([data]) // Chèn một bản ghi
        .select(); // Trả về bản ghi đã chèn

    return { data: insertedData, error };
};

// Hàm chèn nhiều bản ghi vào bảng `users`
const insertManyUsers = async (dataArray: UserData[]) => {
    const { data: insertedData, error } = await supabase
        .from('users')
        .insert(dataArray) // Chèn nhiều bản ghi
        .select(); // Trả về các bản ghi đã chèn

    return { data: insertedData, error };
};

// Hàm upsert một hoặc nhiều bản ghi (chèn hoặc cập nhật nếu đã tồn tại)
const upsertUsers = async (dataArray: UserData[]) => {
    const { data: upsertedData, error } = await supabase
        .from('users')
        .upsert(dataArray) // Chèn hoặc cập nhật
        .select(); // Trả về các bản ghi đã chèn hoặc cập nhật

    return { data: upsertedData, error };
};

// Hàm cập nhật một hoặc nhiều bản ghi dựa trên điều kiện lọc
const updateUser = async (
    data: UserData,
    filters: Record<string, any>
) => {
    let query = supabase
        .from('users')
        .update(data); // Dữ liệu cần cập nhật

    // Áp dụng các điều kiện lọc
    for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value); // Mặc định sử dụng `eq` để lọc
    }

    const { data: updatedData, error } = await query.select(); // Trả về bản ghi đã cập nhật
    return { data: updatedData, error };
};

export {
    insertUser,
    insertManyUsers,
    upsertUsers,
    updateUser,
};
