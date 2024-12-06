import { supabase } from "@/supabase";

// Hàm xóa assignment với tham số
const deleteAssignment = async (filters: Record<string, any>) => {
    let query = supabase
        .from('assignments')
        .delete();

    // Áp dụng các điều kiện xóa từ filters
    for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value); // Mặc định sử dụng toán tử `eq`
    }

    const { error } = await query;

    return { error };
};

export { deleteAssignment };
