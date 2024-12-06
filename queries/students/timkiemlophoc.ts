import { supabase } from "@/supabase";

interface SearchClassesParams {
    searchText?: string; // Tên lớp học
    teacherId?: string; // ID giáo viên
    courseId?: string;  // ID khóa học
    startDate?: string; // Ngày bắt đầu (YYYY-MM-DD)
    endDate?: string;   // Ngày kết thúc (YYYY-MM-DD)
}

const searchClasses = async (params: SearchClassesParams) => {
    const { searchText, teacherId, courseId, startDate, endDate } = params;

    try {
        // Bắt đầu truy vấn bảng `classes`
        let query = supabase.from('classes').select('*');

        // Tìm kiếm theo tên lớp học
        if (searchText) {
            query = query.ilike('name', `%${searchText}%`);
        }

        // Tìm lớp học theo giáo viên phụ trách
        if (teacherId) {
            query = query.eq('teacher_id', teacherId);
        }

        // Tìm lớp học theo khóa học
        if (courseId) {
            query = query.eq('course_id', courseId);
        }

        // Tìm lớp học theo ngày bắt đầu
        if (startDate) {
            query = query.gte('start_date', startDate);
        }

        // Tìm lớp học theo ngày kết thúc
        if (endDate) {
            query = query.lte('end_date', endDate);
        }

        // Thực hiện truy vấn
        const { data, error } = await query;

        if (error) {
            throw new Error(error.message);
        }

        console.log('Classes found:', data);
        return data; // Trả về danh sách các lớp học tìm được
    } catch (error) {
        console.error('Error searching classes:', error);
        throw new Error('Failed to search classes');
    }
};

// Ví dụ sử dụng hàm tìm kiếm lớp học
const exampleSearch = async () => {
    const searchParams: SearchClassesParams = {
        searchText: 'Math',  // Tìm các lớp học có tên chứa từ "Math"
        teacherId: 'uuid-teacher-1', // Tìm lớp học của giáo viên có ID "uuid-teacher-1"
        courseId: 'uuid-course-1',  // Tìm lớp học thuộc khóa học "uuid-course-1"
        startDate: '2024-01-01',   // Tìm lớp học bắt đầu từ ngày 01-01-2024
        endDate: '2024-12-31',     // Tìm lớp học kết thúc trước ngày 31-12-2024
    };

    try {
        const result = await searchClasses(searchParams);
        console.log('Search results:', result);
    } catch (error) {
        console.error('Search failed:', error);
    }
};
