import { supabase } from "@/supabase";

type DeleteFilters = Record<string, any>; // Bộ lọc cho điều kiện xóa

// Xóa một hoặc nhiều bản ghi trong bảng `discussions` dựa trên điều kiện lọc
const deleteDiscussion = async (filters: DeleteFilters) => {
    let query = supabase.from('discussions').delete();

    // Áp dụng điều kiện lọc
    for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value); // Mặc định sử dụng `eq` để lọc
    }

    const { error } = await query;
    return { error };
};

export { deleteDiscussion };
