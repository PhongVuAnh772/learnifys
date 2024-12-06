import { supabase } from "@/supabase";

type GuestAccessData = {
    user_id: string;
    access_granted: boolean;
    created_at?: string;
};

// Hàm chèn một bản ghi vào bảng `guest_access`
const insertGuestAccess = async (data: GuestAccessData) => {
    const { data: insertedData, error } = await supabase
        .from('guest_access')
        .insert([data]) // Chèn một bản ghi
        .select(); // Trả về bản ghi đã chèn

    return { insertedData, error };
};

// Hàm chèn nhiều bản ghi vào bảng `guest_access`
const insertManyGuestAccess = async (dataArray: GuestAccessData[]) => {
    const { data: insertedData, error } = await supabase
        .from('guest_access')
        .insert(dataArray) // Chèn nhiều bản ghi
        .select(); // Trả về các bản ghi đã chèn

    return { insertedData, error };
};

// Hàm upsert (chèn hoặc cập nhật) bản ghi vào bảng `guest_access`
const upsertGuestAccess = async (dataArray: GuestAccessData[]) => {
    const { data: upsertedData, error } = await supabase
        .from('guest_access')
        .upsert(dataArray) // Chèn hoặc cập nhật bản ghi
        .select(); // Trả về các bản ghi đã chèn hoặc cập nhật

    return { upsertedData, error };
};

export { insertGuestAccess, insertManyGuestAccess, upsertGuestAccess };
