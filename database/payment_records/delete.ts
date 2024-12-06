import { supabase } from "@/supabase";

type DeleteFilters = Record<string, any>; // Bộ lọc cho điều kiện xóa

// Xóa một bản ghi trong bảng `payment_records` dựa trên điều kiện lọc
const deletePaymentRecord = async (filters: DeleteFilters) => {
    let query = supabase.from('payment_records').delete();

    // Áp dụng điều kiện lọc
    for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value); // Mặc định sử dụng `eq` để lọc
    }

    const { error } = await query;
    return { error };
};

// Xóa nhiều bản ghi trong bảng `payment_records` dựa trên điều kiện lọc
const deleteManyPaymentRecords = async (filters: DeleteFilters) => {
    let query = supabase.from('payment_records').delete();

    // Áp dụng điều kiện lọc
    for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value); // Mặc định sử dụng `eq` để lọc
    }

    const { error } = await query;
    return { error };
};

export { deletePaymentRecord, deleteManyPaymentRecords };
