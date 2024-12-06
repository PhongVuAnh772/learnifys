import { supabase } from "@/supabase";

interface Document {
    title: string;
    description: string;
    file_url: string;  // URL của tài liệu đã tải lên
    course_id: string; // ID khóa học liên quan
    uploaded_by: string; // ID giáo viên
}

const uploadDocument = async (document: Document) => {
    try {
        const { data, error } = await supabase
            .from("documents")
            .insert([document]);

        if (error) {
            throw new Error(error.message);
        }

        console.log("Document uploaded successfully:", data);
        return data;  // Trả về tài liệu đã tải lên
    } catch (error) {
        console.error("Error uploading document:", error);
        throw new Error("Failed to upload document.");
    }
};

interface DocumentAccess {
    document_id: string; // ID tài liệu
    student_id: string;  // ID học sinh
    access_type: 'view' | 'download';  // Quyền truy cập: xem hoặc tải về
}

const shareDocument = async (access: DocumentAccess) => {
    try {
        const { data, error } = await supabase
            .from("document_access")
            .insert([access]);

        if (error) {
            throw new Error(error.message);
        }

        console.log("Document shared successfully:", data);
        return data;  // Trả về thông tin chia sẻ tài liệu
    } catch (error) {
        console.error("Error sharing document:", error);
        throw new Error("Failed to share document.");
    }
};

const viewDocument = async (documentId: string, studentId: string) => {
    try {
        const { data, error } = await supabase
            .from("document_access")
            .select("*")
            .eq("document_id", documentId)
            .eq("student_id", studentId)
            .eq("access_type", "view")
            .single();

        if (error) {
            throw new Error(error.message);
        }

        console.log("Document viewed:", data);
        return data;  // Trả về thông tin quyền truy cập tài liệu
    } catch (error) {
        console.error("Error viewing document:", error);
        throw new Error("Failed to view document.");
    }
};

const downloadDocument = async (documentId: string, studentId: string) => {
    try {
        const { data, error } = await supabase
            .from("document_access")
            .select("*")
            .eq("document_id", documentId)
            .eq("student_id", studentId)
            .eq("access_type", "download")
            .single();

        if (error) {
            throw new Error(error.message);
        }

        console.log("Document downloaded:", data);
        return data;  // Trả về thông tin quyền tải về tài liệu
    } catch (error) {
        console.error("Error downloading document:", error);
        throw new Error("Failed to download document.");
    }
};

interface DocumentComment {
    document_id: string; // ID tài liệu
    student_id: string;  // ID học sinh (người bình luận)
    comment: string;     // Nội dung bình luận
}

const commentOnDocument = async (comment: DocumentComment) => {
    try {
        const { data, error } = await supabase
            .from("document_comments")
            .insert([comment]);

        if (error) {
            throw new Error(error.message);
        }

        console.log("Comment added successfully:", data);
        return data;  // Trả về bình luận đã thêm
    } catch (error) {
        console.error("Error commenting on document:", error);
        throw new Error("Failed to comment on document.");
    }
};
