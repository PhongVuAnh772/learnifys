import { supabase } from "@/supabase";

type PaymentRecordData = {
    user_id: string;
    amount: number;
    payment_method: string;
    created_at?: string;
};

// Hàm chèn một bản ghi vào bảng `payment_records`
const insertPaymentRecord = async (data: PaymentRecordData) => {
    const { data: insertedData, error } = await supabase
        .from('payment_records')
        .insert([data]) // Chèn một bản ghi
        .select(); // Trả về bản ghi đã chèn

    return { insertedData, error };
};

// Hàm chèn nhiều bản ghi vào bảng `payment_records`
const insertManyPaymentRecords = async (dataArray: PaymentRecordData[]) => {
    const { data: insertedData, error } = await supabase
        .from('payment_records')
        .insert(dataArray) // Chèn nhiều bản ghi
        .select(); // Trả về các bản ghi đã chèn

    return { insertedData, error };
};

// Hàm upsert (chèn hoặc cập nhật) bản ghi vào bảng `payment_records`
const upsertPaymentRecords = async (dataArray: PaymentRecordData[]) => {
    const { data: upsertedData, error } = await supabase
        .from('payment_records')
        .upsert(dataArray) // Chèn hoặc cập nhật bản ghi
        .select(); // Trả về các bản ghi đã chèn hoặc cập nhật

    return { upsertedData, error };
};

export { insertPaymentRecord, insertManyPaymentRecords, upsertPaymentRecords };
