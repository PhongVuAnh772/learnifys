import { supabase } from "@/supabase";

// Định nghĩa kiểu dữ liệu câu hỏi và lựa chọn câu hỏi
interface Question {
  question_text: string;
  question_type: 'multiple_choice' | 'true_false' | 'short_answer';
  difficulty_level?: 'easy' | 'medium' | 'hard';
  category_id?: string; // ID của thể loại câu hỏi
}

interface QuestionOption {
  question_id: string; // ID câu hỏi
  option_text: string;  // Nội dung lựa chọn
  is_correct: boolean;  // Lựa chọn đúng hay không
}

// Hàm thêm câu hỏi
const addQuestion = async (question: Question, options?: QuestionOption[]) => {
  const { question_text, question_type, difficulty_level, category_id } = question;

  try {
    // Bước 1: Thêm câu hỏi vào bảng `question_bank`
    const { data: questionData, error: questionError } = await supabase
      .from('question_bank')
      .insert([
        {
          question_text,
          question_type,
          difficulty_level,
          category_id,
        },
      ])
      .select('id'); // Trả về ID câu hỏi mới thêm

    if (questionError) {
      throw new Error(questionError.message);
    }

    const questionId = questionData[0].id;

    // Bước 2: Nếu câu hỏi là trắc nghiệm, thêm các lựa chọn trả lời
    if (question_type === 'multiple_choice' && options) {
      const optionsData = options.map((option) => ({
        question_id: questionId,
        option_text: option.option_text,
        is_correct: option.is_correct,
      }));

      const { error: optionsError } = await supabase
        .from('question_options')
        .insert(optionsData);

      if (optionsError) {
        throw new Error(optionsError.message);
      }
    }

    console.log('Question added successfully');
    return questionData[0]; // Trả về câu hỏi đã thêm

  } catch (error) {
    console.error('Error adding question:', error);
    throw new Error('Failed to add question');
  }
};

// Hàm cập nhật câu hỏi
const updateQuestion = async (questionId: string, updatedQuestion: Question, updatedOptions?: QuestionOption[]) => {
  const { question_text, question_type, difficulty_level, category_id } = updatedQuestion;

  try {
    // Bước 1: Cập nhật câu hỏi trong bảng `question_bank`
    const { error: questionError } = await supabase
      .from('question_bank')
      .update({
        question_text,
        question_type,
        difficulty_level,
        category_id,
      })
      .eq('id', questionId);

    if (questionError) {
      throw new Error(questionError.message);
    }

    // Bước 2: Cập nhật các lựa chọn (nếu câu hỏi là trắc nghiệm)
    if (question_type === 'multiple_choice' && updatedOptions) {
      // Xóa các lựa chọn cũ
      await supabase
        .from('question_options')
        .delete()
        .eq('question_id', questionId);

      // Thêm các lựa chọn mới
      const optionsData = updatedOptions.map((option) => ({
        question_id: questionId,
        option_text: option.option_text,
        is_correct: option.is_correct,
      }));

      const { error: optionsError } = await supabase
        .from('question_options')
        .insert(optionsData);

      if (optionsError) {
        throw new Error(optionsError.message);
      }
    }

    console.log('Question updated successfully');
  } catch (error) {
    console.error('Error updating question:', error);
    throw new Error('Failed to update question');
  }
};

// Hàm tìm kiếm câu hỏi
const searchQuestions = async (searchText: string) => {
  try {
    const { data, error } = await supabase
      .from('question_bank')
      .select('*')
      .ilike('question_text', `%${searchText}%`); // Tìm kiếm câu hỏi có chứa searchText

    if (error) {
      throw new Error(error.message);
    }

    console.log('Found questions:', data);
    return data; // Trả về các câu hỏi tìm được
  } catch (error) {
    console.error('Error searching questions:', error);
    throw new Error('Failed to search questions');
  }
};

// Hàm xóa câu hỏi
const deleteQuestion = async (questionId: string) => {
  try {
    // Bước 1: Xóa các lựa chọn câu hỏi
    await supabase
      .from('question_options')
      .delete()
      .eq('question_id', questionId);

    // Bước 2: Xóa câu hỏi
    const { error } = await supabase
      .from('question_bank')
      .delete()
      .eq('id', questionId);

    if (error) {
      throw new Error(error.message);
    }

    console.log('Question deleted successfully');
  } catch (error) {
    console.error('Error deleting question:', error);
    throw new Error('Failed to delete question');
  }
};

export { addQuestion, updateQuestion, searchQuestions, deleteQuestion };
