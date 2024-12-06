import { supabase } from "@/supabase";

type NotificationData = {
    user_id: string;
    message: string;
    read: boolean;
    created_at?: string;
};

// Hàm chèn một bản ghi vào bảng `notifications`
const insertNotification = async (data: NotificationData) => {
    const { data: insertedData, error } = await supabase
        .from('notifications')
        .insert([data]) // Chèn một bản ghi
        .select(); // Trả về bản ghi đã chèn

    return { insertedData, error };
};

// Hàm chèn nhiều bản ghi vào bảng `notifications`
const insertManyNotifications = async (dataArray: NotificationData[]) => {
    const { data: insertedData, error } = await supabase
        .from('notifications')
        .insert(dataArray) // Chèn nhiều bản ghi
        .select(); // Trả về các bản ghi đã chèn

    return { insertedData, error };
};

// Hàm upsert (chèn hoặc cập nhật) bản ghi vào bảng `notifications`
const upsertNotifications = async (dataArray: NotificationData[]) => {
    const { data: upsertedData, error } = await supabase
        .from('notifications')
        .upsert(dataArray) // Chèn hoặc cập nhật bản ghi
        .select(); // Trả về các bản ghi đã chèn hoặc cập nhật

    return { upsertedData, error };
};

export { insertNotification, insertManyNotifications, upsertNotifications };
