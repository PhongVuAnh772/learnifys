import { supabase } from "@/supabase";

interface Exam {
    name: string;
    start_time: string;  // Thời gian bắt đầu (ISO format)
    end_time: string;    // Thời gian kết thúc (ISO format)
    total_marks: number;
    description?: string;
}

const createExam = async (exam: Exam) => {
    try {
        const { data, error } = await supabase
            .from("exams")
            .insert([exam]);

        if (error) {
            throw new Error(error.message);
        }

        console.log("Exam created successfully:", data);
        return data;  // Trả về bài thi đã tạo
    } catch (error) {
        console.error("Error creating exam:", error);
        throw new Error("Failed to create exam.");
    }
};
interface ExamParticipant {
    exam_id: string;        // ID bài thi
    student_id: string;     // ID học sinh
}

const registerForExam = async (examParticipant: ExamParticipant) => {
    try {
        const { data, error } = await supabase
            .from("exam_participants")
            .insert([examParticipant]);

        if (error) {
            throw new Error(error.message);
        }

        console.log("Student registered for exam:", data);
        return data;  // Trả về thông tin đăng ký của học sinh
    } catch (error) {
        console.error("Error registering for exam:", error);
        throw new Error("Failed to register for exam.");
    }
};
interface ExamAnswer {
    exam_participant_id: string;
    question_id: string;
    answer_text: string;  // Trả lời tự luận
    selected_option_id?: string; // Đối với câu hỏi trắc nghiệm
}

const saveExamAnswer = async (examAnswer: ExamAnswer) => {
    try {
        const { data, error } = await supabase
            .from("exam_answers")
            .insert([examAnswer]);

        if (error) {
            throw new Error(error.message);
        }

        console.log("Answer saved successfully:", data);
        return data;  // Trả về câu trả lời đã lưu
    } catch (error) {
        console.error("Error saving exam answer:", error);
        throw new Error("Failed to save exam answer.");
    }
};
const gradeExam = async (examParticipantId: string) => {
    try {
        // Lấy tất cả các câu trả lời của học sinh
        const { data: answers, error } = await supabase
            .from("exam_answers")
            .select("*")
            .eq("exam_participant_id", examParticipantId);

        if (error) {
            throw new Error(error.message);
        }

        // Tính điểm tổng cộng dựa trên các câu trả lời đúng
        let totalMarks = 0;
        let obtainedMarks = 0;

        for (const answer of answers) {
            const { data: question, error: questionError } = await supabase
                .from("questions")
                .select("*")
                .eq("id", answer.question_id)
                .single();

            if (questionError) {
                throw new Error(questionError.message);
            }

            // Cộng điểm cho câu trả lời đúng
            if (answer.is_correct) {
                obtainedMarks += question.marks;
            }
            totalMarks += question.marks;
        }

        // Lưu kết quả thi
        const { data: result, error: resultError } = await supabase
            .from("exam_results")
            .insert([
                {
                    exam_participant_id: examParticipantId,
                    total_marks: totalMarks,
                    obtained_marks: obtainedMarks,
                    result_status: obtainedMarks >= totalMarks * 0.5 ? "pass" : "fail",
                },
            ]);

        if (resultError) {
            throw new Error(resultError.message);
        }

        console.log("Exam graded successfully:", result);
        return result;  // Trả về kết quả thi đã chấm
    } catch (error) {
        console.error("Error grading exam:", error);
        throw new Error("Failed to grade exam.");
    }
};
const notifyExamResult = async (examParticipantId: string) => {
    try {
        // Lấy kết quả bài thi của học sinh
        const { data: result, error } = await supabase
            .from("exam_results")
            .select("*")
            .eq("exam_participant_id", examParticipantId)
            .single();

        if (error) {
            throw new Error(error.message);
        }

        // Gửi thông báo kết quả cho học sinh
        console.log("Notification sent: ", result);
        // Thực hiện gửi thông báo kết quả (qua email, hệ thống thông báo, v.v.)
    } catch (error) {
        console.error("Error notifying exam result:", error);
    }
};
