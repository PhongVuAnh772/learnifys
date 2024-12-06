import { supabase } from "@/supabase";

type QueryParams = {
    columns?: string; // Cột cần select
    filters?: Record<string, any>; // Bộ lọc thông thường (dạng key-value)
    arrayFilters?: Record<string, { contains?: any[]; containedBy?: any[] }>; // Bộ lọc cho cột dạng mảng
};

// Lấy tất cả các bản ghi trong bảng `meeting_records`
const getAllMeetingRecords = async (params: QueryParams = {}) => {
    const { columns = '*', filters = {} } = params;

    let query = supabase.from('meeting_records').select(columns);

    // Áp dụng các điều kiện lọc
    for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value);
    }

    const { data: meetingRecords, error } = await query;
    return { meetingRecords, error };
};

// Lấy bản ghi trong `meeting_records` với các cột cụ thể và bảng tham chiếu
const getSpecificMeetingRecords = async (params: QueryParams = {}) => {
    const {
        columns = 'id, meeting_date, meeting_time, duration, topic',
        filters = {},
    } = params;

    let query = supabase.from('meeting_records').select(columns);

    // Áp dụng bộ lọc
    for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value);
    }

    const { data: meetingRecords, error } = await query;
    return { meetingRecords, error };
};

// Lấy `meeting_records` với điều kiện lọc phức tạp
const getMeetingRecordsWithFilter = async (params: QueryParams = {}) => {
    const { columns = '*', filters = {}, arrayFilters = {} } = params;

    let query = supabase.from('meeting_records').select(columns);

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

    const { data: meetingRecords, error } = await query;
    return { meetingRecords, error };
};

export { getAllMeetingRecords, getSpecificMeetingRecords, getMeetingRecordsWithFilter };
