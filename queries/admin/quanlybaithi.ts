import { supabase } from "@/supabase";

interface ExamParams {
  name: string;
  description: string;
  start_time: string; // Thời gian bắt đầu bài thi (ISO String)
  end_time: string;   // Thời gian kết thúc bài thi (ISO String)
  class_id: string;   // ID lớp học
  teacher_id: string; // ID giáo viên
}

const createExam = async (params: ExamParams) => {
  const { name, description, start_time, end_time, class_id, teacher_id } = params;

  try {
    const { data, error } = await supabase
      .from('exams')
      .insert([
        {
          name,
          description,
          start_time,
          end_time,
          class_id,
          teacher_id,
        }
      ]);

    if (error) {
      throw new Error(error.message);
    }

    console.log('Exam created successfully:', data);
    return data; // Trả về bài thi mới tạo
  } catch (error) {
    console.error('Error creating exam:', error);
    throw new Error('Failed to create exam');
  }
};

interface ExamQuestionParams {
    exam_id: string;      // ID bài thi
    question_id: string;  // ID câu hỏi từ ngân hàng câu hỏi
    order: number;        // Thứ tự câu hỏi trong bài thi
  }
  
  const addQuestionsToExam = async (examQuestions: ExamQuestionParams[]) => {
    try {
      const { data, error } = await supabase
        .from('exam_questions')
        .insert(examQuestions);
  
      if (error) {
        throw new Error(error.message);
      }
  
      console.log('Questions added to exam successfully:', data);
      return data; // Trả về các câu hỏi đã được thêm vào bài thi
    } catch (error) {
      console.error('Error adding questions to exam:', error);
      throw new Error('Failed to add questions to exam');
    }
  };

  const assignExamToStudents = async (exam_id: string, student_ids: string[]) => {
    try {
      // Giao bài thi cho học sinh
      const { data, error } = await supabase
        .from('student_exam_submissions')
        .upsert(
          student_ids.map((student_id) => ({
            exam_id,
            student_id,
            start_time: new Date().toISOString(),
          }))
        );
  
      if (error) {
        throw new Error(error.message);
      }
  
      console.log('Exam assigned to students successfully:', data);
      return data; // Trả về các bài thi đã được giao cho học sinh
    } catch (error) {
      console.error('Error assigning exam to students:', error);
      throw new Error('Failed to assign exam to students');
    }
  };

  interface SubmitExamParams {
    exam_id: string;
    student_id: string;
    answers: any; // Câu trả lời của học sinh dưới dạng JSON
    end_time: string; // Thời gian kết thúc làm bài (ISO String)
  }
  
  const submitExam = async (params: SubmitExamParams) => {
    const { exam_id, student_id, answers, end_time } = params;
  
    try {
      const { data, error } = await supabase
        .from('student_exam_submissions')
        .upsert([
          {
            exam_id,
            student_id,
            answers,
            end_time,
            submitted_at: new Date().toISOString(),
          }
        ]);
  
      if (error) {
        throw new Error(error.message);
      }
  
      console.log('Exam submitted successfully:', data);
      return data; // Trả về bài thi đã nộp
    } catch (error) {
      console.error('Error submitting exam:', error);
      throw new Error('Failed to submit exam');
    }
  };

  const gradeExam = async (examSubmissionId: string, score: number) => {
    try {
      const { data, error } = await supabase
        .from('student_exam_submissions')
        .update({ score })
        .eq('id', examSubmissionId);
  
      if (error) {
        throw new Error(error.message);
      }
  
      console.log('Exam graded successfully:', data);
      return data; // Trả về bài thi đã được chấm điểm
    } catch (error) {
      console.error('Error grading exam:', error);
      throw new Error('Failed to grade exam');
    }
  };

  const getExamResults = async (exam_id: string) => {
    try {
      const { data, error } = await supabase
        .from('student_exam_submissions')
        .select('*')
        .eq('exam_id', exam_id);
  
      if (error) {
        throw new Error(error.message);
      }
  
      console.log('Exam results:', data);
      return data; // Trả về kết quả bài thi của học sinh
    } catch (error) {
      console.error('Error getting exam results:', error);
      throw new Error('Failed to get exam results');
    }
  };

  

// Ví dụ 

// const examData = await createExam({
//     name: 'Math 101 - Final Exam',
//     description: 'This is the final exam for Math 101',
//     start_time: '2024-12-15T09:00:00Z',
//     end_time: '2024-12-15T12:00:00Z',
//     class_id: 'uuid-class-1',
//     teacher_id: 'uuid-teacher-1',
//   });

// await addQuestionsToExam([
//     { exam_id: examData[0].id, question_id: 'uuid-question-1', order: 1 },
//     { exam_id: examData[0].id, question_id: 'uuid-question-2', order: 2 },
//   ]);
  
  
// await assignExamToStudents(examData[0].id, ['uuid-student-1', 'uuid-student-2']);


// await submitExam({
//     exam_id: examData[0].id,
//     student_id: 'uuid-student-1',
//     answers: { '1': 'A', '2': 'B' }, // Các câu trả lời của học sinh
//     end_time: '2024-12-15T11:45:00Z',
//   });
  
// await gradeExam('uuid-exam-submission-1', 90);

// const results = await getExamResults(examData[0].id);
// console.log(results);
