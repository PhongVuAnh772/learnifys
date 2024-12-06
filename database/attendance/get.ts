import { supabase } from "@/supabase";

// Kiểu dữ liệu cho tham số của hàm
type QueryParams = {
    columns?: string; // Cột cần select
    filters?: Record<string, any>; // Bộ lọc thông thường (dạng key-value)
    arrayFilters?: Record<string, { contains?: any[]; containedBy?: any[] }>; // Bộ lọc cho cột dạng mảng
};

// Lấy tất cả các bản ghi trong bảng `attendance`
const getAllAttendance = async (params: QueryParams = {}) => {
    const { columns = '*', filters = {} } = params;

    let query = supabase.from('attendance').select(columns);

    // Áp dụng các điều kiện lọc
    for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value); // Mặc định sử dụng `eq` để lọc
    }

    const { data: attendance, error } = await query;
    return { attendance, error };
};

// Lấy bản ghi trong `attendance` với các cột cụ thể và bảng tham chiếu
const getSpecificAttendance = async (params: QueryParams = {}) => {
    const { columns = 'id, user_id, date, status', filters = {} } = params;

    let query = supabase.from('attendance').select(columns);

    // Áp dụng bộ lọc
    for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value); // Mặc định sử dụng `eq`
    }

    const { data: attendance, error } = await query;
    return { attendance, error };
};

// Lấy `attendance` với điều kiện lọc phức tạp
const getAttendanceWithFilter = async (params: QueryParams = {}) => {
    const { columns = '*', filters = {}, arrayFilters = {} } = params;

    let query = supabase.from('attendance').select(columns);

    // Áp dụng bộ lọc thông thường
    for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value); // Sử dụng `eq` để lọc mặc định
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

    const { data: attendance, error } = await query;
    return { attendance, error };
};

export { getAllAttendance, getSpecificAttendance, getAttendanceWithFilter };
