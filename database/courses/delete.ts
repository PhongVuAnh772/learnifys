import { supabase } from "@/supabase";

type DeleteFilters = Record<string, any>; // Bộ lọc cho điều kiện xóa

// Xóa một hoặc nhiều bản ghi trong bảng `courses` dựa trên điều kiện lọc
const deleteCourse = async (filters: DeleteFilters) => {
    let query = supabase.from('courses').delete();

    // Áp dụng điều kiện lọc
    for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value);
    }

    const { error } = await query;
    return { error };
};

export { deleteCourse };
