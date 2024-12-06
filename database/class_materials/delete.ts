import { supabase } from "@/supabase";

type DeleteFilters = Record<string, any>; // Bộ lọc cho điều kiện xóa

// Xóa một hoặc nhiều bản ghi trong bảng `class_materials` dựa trên điều kiện lọc
const deleteClassMaterial = async (filters: DeleteFilters) => {
    let query = supabase.from('class_materials').delete();

    // Áp dụng điều kiện lọc
    for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value);
    }

    const { error } = await query;
    return { error };
};

export { deleteClassMaterial };
