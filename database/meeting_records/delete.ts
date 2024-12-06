import { supabase } from "@/supabase";

type DeleteFilters = Record<string, any>; // Bộ lọc cho điều kiện xóa

// Xóa một hoặc nhiều bản ghi trong bảng `meeting_records` dựa trên điều kiện lọc
const deleteMeetingRecord = async (filters: DeleteFilters) => {
    let query = supabase.from('meeting_records').delete();

    // Áp dụng điều kiện lọc
    for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value); // Mặc định sử dụng `eq` để lọc
    }

    const { error } = await query;
    return { error };
};

export { deleteMeetingRecord };
