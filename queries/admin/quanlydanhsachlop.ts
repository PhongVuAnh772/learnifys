import { supabase } from "@/supabase";

interface AddClassParams {
    class_name: string;
    description: string;
    start_date: string; // Định dạng YYYY-MM-DD
    end_date: string; // Định dạng YYYY-MM-DD
    teacher_id: string; // ID giảng viên phụ trách
}

const addClass = async ({ class_name, description, start_date, end_date, teacher_id }: AddClassParams) => {
    try {
        const { data, error } = await supabase
            .from('classes')
            .insert([
                {
                    class_name,
                    description,
                    start_date,
                    end_date,
                    teacher_id
                }
            ]);

        if (error) {
            throw new Error(error.message);
        }

        console.log('Class added successfully:', data);
        return data;
    } catch (error) {
        console.error('Error adding class:', error);
        throw new Error('Failed to add class');
    }
};

interface UpdateClassParams {
    class_id: string;
    class_name?: string;
    description?: string;
    start_date?: string;
    end_date?: string;
    teacher_id?: string;
}

const updateClass = async ({ class_id, class_name, description, start_date, end_date, teacher_id }: UpdateClassParams) => {
    try {
        const { data, error } = await supabase
            .from('classes')
            .update({
                class_name,
                description,
                start_date,
                end_date,
                teacher_id
            })
            .eq('id', class_id);

        if (error) {
            throw new Error(error.message);
        }

        console.log('Class updated successfully:', data);
        return data;
    } catch (error) {
        console.error('Error updating class:', error);
        throw new Error('Failed to update class');
    }
};

const deleteClass = async (class_id: string) => {
    try {
        const { data, error } = await supabase
            .from('classes')
            .delete()
            .eq('id', class_id);

        if (error) {
            throw new Error(error.message);
        }

        console.log('Class deleted successfully:', data);
        return data;
    } catch (error) {
        console.error('Error deleting class:', error);
        throw new Error('Failed to delete class');
    }
};

const getClasses = async () => {
    try {
        const { data, error } = await supabase
            .from('classes')
            .select('*'); // Lấy tất cả lớp học

        if (error) {
            throw new Error(error.message);
        }

        console.log('Classes:', data);
        return data; // Trả về danh sách lớp học
    } catch (error) {
        console.error('Error getting classes:', error);
        throw new Error('Failed to get classes');
    }
};
