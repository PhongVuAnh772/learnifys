import { supabase } from "@/supabase";

type QueryParams = {
    columns?: string; // Cột cần select
    filters?: Record<string, any>; // Bộ lọc thông thường (dạng key-value)
    arrayFilters?: Record<string, { contains?: any[]; containedBy?: any[] }>; // Bộ lọc cho cột dạng mảng
};

// Lấy tất cả các bản ghi trong bảng `class_materials`
const getAllClassMaterials = async (params: QueryParams = {}) => {
    const { columns = '*', filters = {} } = params;

    let query = supabase.from('class_materials').select(columns);

    // Áp dụng các điều kiện lọc
    for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value);
    }

    const { data: classMaterials, error } = await query;
    return { classMaterials, error };
};

// Lấy bản ghi trong `class_materials` với các cột cụ thể và bảng tham chiếu
const getSpecificClassMaterials = async (params: QueryParams = {}) => {
    const { columns = 'id, class_id, material_name, material_type', filters = {} } = params;

    let query = supabase.from('class_materials').select(columns);

    // Áp dụng bộ lọc
    for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value);
    }

    const { data: classMaterials, error } = await query;
    return { classMaterials, error };
};

// Lấy `class_materials` với điều kiện lọc phức tạp
const getClassMaterialsWithFilter = async (params: QueryParams = {}) => {
    const { columns = '*', filters = {}, arrayFilters = {} } = params;

    let query = supabase.from('class_materials').select(columns);

    // Áp dụng bộ lọc thông thường
    for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value);
    }

    // Áp dụng bộ lọc cho cột dạng mảng
    for (const [key, condition] of Object.entries(arrayFilters)) {
        if (condition.contains) {
            query = query.contains(key, condition.contains);
        }
        if (condition.containedBy) {
            query = query.containedBy(key, condition.containedBy);
        }
    }

    const { data: classMaterials, error } = await query;
    return { classMaterials, error };
};

export { getAllClassMaterials, getSpecificClassMaterials, getClassMaterialsWithFilter };
