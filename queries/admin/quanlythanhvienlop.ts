import { supabase } from "@/supabase";

interface AddStudentToClassParams {
    class_id: string;
    student_id: string;
}

const addStudentToClass = async ({ class_id, student_id }: AddStudentToClassParams) => {
    try {
        const { data, error } = await supabase
            .from('class_members')
            .insert([
                {
                    class_id,
                    student_id,
                    status: 'active', // Trạng thái học sinh khi mới thêm vào lớp
                    role: 'student', // Vai trò mặc định là 'student'
                }
            ]);

        if (error) {
            throw new Error(error.message);
        }

        console.log('Student added to class successfully:', data);
        return data;
    } catch (error) {
        console.error('Error adding student to class:', error);
        throw new Error('Failed to add student to class');
    }
};
const removeStudentFromClass = async ({ class_id, student_id }: AddStudentToClassParams) => {
    try {
        const { data, error } = await supabase
            .from('class_members')
            .delete()
            .eq('class_id', class_id)
            .eq('student_id', student_id);

        if (error) {
            throw new Error(error.message);
        }

        console.log('Student removed from class successfully:', data);
        return data;
    } catch (error) {
        console.error('Error removing student from class:', error);
        throw new Error('Failed to remove student from class');
    }
};

const getStudentsInClass = async (class_id: string) => {
    try {
        const { data, error } = await supabase
            .from('class_members')
            .select('student_id, students(*)')
            .eq('class_id', class_id);

        if (error) {
            throw new Error(error.message);
        }

        console.log('Students in class:', data);
        return data; // Trả về danh sách học sinh trong lớp
    } catch (error) {
        console.error('Error getting students in class:', error);
        throw new Error('Failed to get students in class');
    }
};

interface UpdateStudentInClassParams {
    class_id: string;
    student_id: string;
    role?: 'student' | 'monitor'; // Cập nhật vai trò
    status?: 'active' | 'inactive'; // Cập nhật trạng thái học sinh
}

const updateStudentInClass = async ({
    class_id,
    student_id,
    role,
    status
}: UpdateStudentInClassParams) => {
    try {
        const { data, error } = await supabase
            .from('class_members')
            .update({
                role,
                status
            })
            .eq('class_id', class_id)
            .eq('student_id', student_id);

        if (error) {
            throw new Error(error.message);
        }

        console.log('Student in class updated successfully:', data);
        return data;
    } catch (error) {
        console.error('Error updating student in class:', error);
        throw new Error('Failed to update student in class');
    }
};
