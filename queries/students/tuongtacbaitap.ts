import { supabase } from "@/supabase";

interface Assignment {
    title: string;
    description: string;
    due_date: string; // Ngày hết hạn nộp bài
    max_marks: number;
    course_id: string; // ID khóa học
    created_by: string; // ID giáo viên tạo bài tập
}

const createAssignment = async (assignment: Assignment) => {
    try {
        const { data, error } = await supabase
            .from("assignments")
            .insert([assignment]);

        if (error) {
            throw new Error(error.message);
        }

        console.log("Assignment created successfully:", data);
        return data;  // Trả về bài tập đã tạo
    } catch (error) {
        console.error("Error creating assignment:", error);
        throw new Error("Failed to create assignment.");
    }
};
interface AssignmentSubmission {
    assignment_id: string; // ID bài tập
    student_id: string;    // ID học sinh
    file_url: string;      // Đường dẫn tệp bài nộp
}

const submitAssignment = async (submission: AssignmentSubmission) => {
    try {
        const { data, error } = await supabase
            .from("assignments_submissions")
            .insert([submission]);

        if (error) {
            throw new Error(error.message);
        }

        console.log("Assignment submitted successfully:", data);
        return data;  // Trả về thông tin bài nộp
    } catch (error) {
        console.error("Error submitting assignment:", error);
        throw new Error("Failed to submit assignment.");
    }
};
interface AssignmentFeedback {
    submission_id: string;  // ID bài nộp
    grade: number;          // Điểm bài nộp
    feedback: string;       // Phản hồi của giáo viên
}

const gradeAssignment = async (feedback: AssignmentFeedback) => {
    try {
        const { data, error } = await supabase
            .from("assignments_feedback")
            .insert([feedback]);

        if (error) {
            throw new Error(error.message);
        }

        console.log("Assignment graded successfully:", data);
        return data;  // Trả về thông tin điểm và phản hồi
    } catch (error) {
        console.error("Error grading assignment:", error);
        throw new Error("Failed to grade assignment.");
    }
};
const trackAssignmentSubmission = async (assignmentId: string, studentId: string) => {
    try {
        const { data, error } = await supabase
            .from("assignments_submissions")
            .select("*")
            .eq("assignment_id", assignmentId)
            .eq("student_id", studentId)
            .single();

        if (error) {
            throw new Error(error.message);
        }

        console.log("Submission status:", data);
        return data;  // Trả về tình trạng nộp bài
    } catch (error) {
        console.error("Error tracking submission:", error);
        throw new Error("Failed to track assignment submission.");
    }
};
const notifyAssignmentResult = async (submissionId: string) => {
    try {
        const { data: feedback, error } = await supabase
            .from("assignments_feedback")
            .select("*")
            .eq("submission_id", submissionId)
            .single();

        if (error) {
            throw new Error(error.message);
        }

        console.log("Assignment result notification:", feedback);
        // Thực hiện gửi thông báo kết quả (qua email, hệ thống thông báo, v.v.)
    } catch (error) {
        console.error("Error notifying assignment result:", error);
    }
};
