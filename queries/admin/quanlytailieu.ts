import { supabase } from "@/supabase";

interface DocumentParams {
    name: string;
    type: string;
    description: string;
    file_url: string; // Đường dẫn đến tài liệu
    class_id: string; // ID lớp học
    teacher_id: string; // ID giáo viên
}

const addDocument = async (params: DocumentParams) => {
    const { name, type, description, file_url, class_id, teacher_id } = params;

    try {
        const { data, error } = await supabase
            .from('documents')
            .insert([
                {
                    name,
                    type,
                    description,
                    file_url,
                    class_id,
                    teacher_id,
                }
            ]);

        if (error) {
            throw new Error(error.message);
        }

        console.log('Document added successfully:', data);
        return data; // Trả về tài liệu vừa được thêm
    } catch (error) {
        console.error('Error adding document:', error);
        throw new Error('Failed to add document');
    }
};

const updateDocument = async (documentId: string, updatedParams: Partial<DocumentParams>) => {
    const { name, type, description, file_url, class_id, teacher_id } = updatedParams;

    try {
        const { data, error } = await supabase
            .from('documents')
            .update({
                name,
                type,
                description,
                file_url,
                class_id,
                teacher_id,
            })
            .eq('id', documentId);

        if (error) {
            throw new Error(error.message);
        }

        console.log('Document updated successfully:', data);
        return data; // Trả về tài liệu đã được cập nhật
    } catch (error) {
        console.error('Error updating document:', error);
        throw new Error('Failed to update document');
    }
};

const deleteDocument = async (documentId: string) => {
    try {
        const { data, error } = await supabase
            .from('documents')
            .delete()
            .eq('id', documentId);

        if (error) {
            throw new Error(error.message);
        }

        console.log('Document deleted successfully:', data);
        return data; // Trả về tài liệu đã xóa
    } catch (error) {
        console.error('Error deleting document:', error);
        throw new Error('Failed to delete document');
    }
};

interface SearchDocumentsParams {
    searchText?: string; // Tìm kiếm theo tên tài liệu
    classId?: string;    // Tìm tài liệu theo lớp học
    teacherId?: string;  // Tìm tài liệu theo giáo viên
    type?: string;       // Tìm theo loại tài liệu
}

const searchDocuments = async (params: SearchDocumentsParams) => {
    const { searchText, classId, teacherId, type } = params;

    try {
        let query = supabase.from('documents').select('*');

        if (searchText) {
            query = query.ilike('name', `%${searchText}%`); // Tìm kiếm tên tài liệu
        }

        if (classId) {
            query = query.eq('class_id', classId); // Tìm tài liệu theo lớp học
        }

        if (teacherId) {
            query = query.eq('teacher_id', teacherId); // Tìm tài liệu theo giáo viên
        }

        if (type) {
            query = query.eq('type', type); // Tìm tài liệu theo loại
        }

        const { data, error } = await query;

        if (error) {
            throw new Error(error.message);
        }

        console.log('Documents found:', data);
        return data; // Trả về các tài liệu tìm được
    } catch (error) {
        console.error('Error searching documents:', error);
    }
}

// const documents = await searchDocuments({
//     searchText: 'Math 101', // Tìm tài liệu có chứa "Math 101"
//     classId: 'uuid-class-1', // Tìm tài liệu trong lớp học "Math 101"
//     type: 'Lecture', // Tìm tài liệu loại "Lecture"
//   });

