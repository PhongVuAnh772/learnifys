import { supabase } from "@/supabase";

interface AssignmentParams {
    name: string;
    description: string;
    due_date: string;  // Thời gian hết hạn nộp bài (ISO String)
    class_id: string;  // ID lớp học
    teacher_id: string; // ID giáo viên
}

const createAssignment = async (params: AssignmentParams) => {
    const { name, description, due_date, class_id, teacher_id } = params;

    try {
        const { data, error } = await supabase
            .from('assignments')
            .insert([
                {
                    name,
                    description,
                    due_date,
                    class_id,
                    teacher_id,
                }
            ]);

        if (error) {
            throw new Error(error.message);
        }

        console.log('Assignment created successfully:', data);
        return data; // Trả về bài tập mới tạo
    } catch (error) {
        console.error('Error creating assignment:', error);
        throw new Error('Failed to create assignment');
    }
};

const assignAssignmentToStudents = async (assignment_id: string, student_ids: string[]) => {
    try {
        const { data, error } = await supabase
            .from('student_assignment_submissions')
            .upsert(
                student_ids.map((student_id) => ({
                    assignment_id,
                    student_id,
                    submission_date: null, // Học sinh chưa nộp bài, để null
                }))
            );

        if (error) {
            throw new Error(error.message);
        }

        console.log('Assignment assigned to students successfully:', data);
        return data; // Trả về các bài tập đã được giao cho học sinh
    } catch (error) {
        console.error('Error assigning assignment to students:', error);
        throw new Error('Failed to assign assignment to students');
    }
};

interface SubmitAssignmentParams {
    assignment_id: string;
    student_id: string;
    answers: any; // Câu trả lời của học sinh dưới dạng JSON
    submission_date: string; // Thời gian học sinh nộp bài (ISO String)
}

const submitAssignment = async (params: SubmitAssignmentParams) => {
    const { assignment_id, student_id, answers, submission_date } = params;

    try {
        const { data, error } = await supabase
            .from('student_assignment_submissions')
            .upsert([
                {
                    assignment_id,
                    student_id,
                    answers,
                    submission_date,
                }
            ]);

        if (error) {
            throw new Error(error.message);
        }

        console.log('Assignment submitted successfully:', data);
        return data; // Trả về bài nộp của học sinh
    } catch (error) {
        console.error('Error submitting assignment:', error);
        throw new Error('Failed to submit assignment');
    }
};

const gradeAssignment = async (submission_id: string, score: number, feedback: string) => {
    try {
        const { data, error } = await supabase
            .from('student_assignment_submissions')
            .update({ score, feedback })
            .eq('id', submission_id);

        if (error) {
            throw new Error(error.message);
        }

        console.log('Assignment graded successfully:', data);
        return data; // Trả về bài tập đã được chấm điểm
    } catch (error) {
        console.error('Error grading assignment:', error);
        throw new Error('Failed to grade assignment');
    }
};

const getAssignmentResults = async (assignment_id: string) => {
    try {
        const { data, error } = await supabase
            .from('student_assignment_submissions')
            .select('*')
            .eq('assignment_id', assignment_id);

        if (error) {
            throw new Error(error.message);
        }

        console.log('Assignment results:', data);
        return data; // Trả về kết quả bài tập của học sinh
    } catch (error) {
        console.error('Error getting assignment results:', error);
        throw new Error('Failed to get assignment results');
    }
};


