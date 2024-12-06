import { supabase } from "@/supabase";

type MeetingRecordData = Record<string, any>; // Dữ liệu truyền vào cho insert/upsert/update

// Hàm chèn một bản ghi vào bảng `meeting_records`
const insertMeetingRecord = async (data: MeetingRecordData) => {
    const { data: insertedData, error } = await supabase
        .from('meeting_records')
        .insert([data]) // Chèn một bản ghi
        .select(); // Trả về bản ghi đã chèn

    return { data: insertedData, error };
};

// Hàm chèn nhiều bản ghi vào bảng `meeting_records`
const insertManyMeetingRecords = async (dataArray: MeetingRecordData[]) => {
    const { data: insertedData, error } = await supabase
        .from('meeting_records')
        .insert(dataArray) // Chèn nhiều bản ghi
        .select(); // Trả về các bản ghi đã chèn

    return { data: insertedData, error };
};

// Hàm upsert một hoặc nhiều bản ghi (chèn hoặc cập nhật nếu đã tồn tại)
const upsertMeetingRecords = async (dataArray: MeetingRecordData[]) => {
    const { data: upsertedData, error } = await supabase
        .from('meeting_records')
        .upsert(dataArray) // Chèn hoặc cập nhật
        .select(); // Trả về các bản ghi đã chèn hoặc cập nhật

    return { data: upsertedData, error };
};

// Hàm cập nhật một hoặc nhiều bản ghi dựa trên điều kiện lọc
const updateMeetingRecord = async (
    data: MeetingRecordData,
    filters: Record<string, any>
) => {
    let query = supabase
        .from('meeting_records')
        .update(data); // Dữ liệu cần cập nhật

    // Áp dụng các điều kiện lọc
    for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value); // Mặc định sử dụng `eq` để lọc
    }

    const { data: updatedData, error } = await query.select(); // Trả về bản ghi đã cập nhật
    return { data: updatedData, error };
};

export {
    insertMeetingRecord,
    insertManyMeetingRecords,
    upsertMeetingRecords,
    updateMeetingRecord,
};
