import { supabase } from "@/supabase";

type DeleteFilters = Record<string, any>; // Bộ lọc cho điều kiện xóa

// Xóa một hoặc nhiều bản ghi trong bảng `classrooms` dựa trên điều kiện lọc
const deleteClassroom = async (filters: DeleteFilters) => {
    let query = supabase.from('classrooms').delete();

    // Áp dụng điều kiện lọc
    for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value);
    }

    const { error } = await query;
    return { error };
};

export { deleteClassroom };
