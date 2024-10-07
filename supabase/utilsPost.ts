import { supabase } from ".";

interface RoleType {
  role: "teacher" | "student" | "parent" | "guest";
}

export const insertUser = async (
  user: any,
  email: string,
  password: string,
  role: RoleType
) => {
  await supabase.from("users").insert([
    {
      id: user.id,
      email: email,
      password: password,
      role: role,
    },
  ]);
};

export const insertAssignments = async (
  courseId: string,
  title: string,
  description?: string,
  dueDate?: Date
) => {
  const { data, error } = await supabase.from("assignments").insert([
    {
      course_id: courseId,
      title: title,
      description: description,
      due_date: dueDate,
    },
  ]);

  if (error) {
    console.error("Error inserting assignment:", error.message);
    return null;
  } else {
    console.log("Assignment inserted successfully:", data);
    return data;
  }
};

export const insertAttendance = async (
  courseId: string,
  studentId: string,
  attendanceDate: Date,
  status: "present" | "absent" | "late"
) => {
  const { data, error } = await supabase.from("attendance").insert([
    {
      course_id: courseId,
      student_id: studentId,
      attendance_date: attendanceDate,
      status: status,
    },
  ]);

  if (error) {
    console.error("Error inserting attendance:", error.message);
    return null;
  } else {
    console.log("Attendance inserted successfully:", data);
    return data;
  }
};

export const insertCertificate = async (
  courseId: string,
  studentId: string,
  issuedAt: Date,
  certificateUrl: string
) => {
  const { data, error } = await supabase.from("certificates").insert([
    {
      course_id: courseId,
      student_id: studentId,
      issued_at: issuedAt,
      certificate_url: certificateUrl,
    },
  ]);

  if (error) {
    console.error("Error inserting certificate:", error.message);
    return null; // Hoặc xử lý lỗi tùy ý
  } else {
    console.log("Certificate inserted successfully:", data);
    return data; // Trả về dữ liệu chứng chỉ vừa chèn
  }
};

export const insertCourseReview = async (
  courseId: string,
  studentId: string,
  rating: number,
  reviewText?: string
) => {
  // Kiểm tra xem rating có hợp lệ không (1 đến 5)
  if (rating < 1 || rating > 5) {
    console.error("Rating must be between 1 and 5.");
    return null;
  }

  const { data, error } = await supabase.from("course_reviews").insert([
    {
      course_id: courseId,
      student_id: studentId,
      rating: rating,
      review_text: reviewText,
    },
  ]);

  if (error) {
    console.error("Error inserting course review:", error.message);
    return null; // Hoặc xử lý lỗi tùy ý
  } else {
    console.log("Course review inserted successfully:", data);
    return data; // Trả về dữ liệu đánh giá vừa chèn
  }
};

export const insertCourse = async (
  title: string,
  teacherId: string,
  description?: string
) => {
  const { data, error } = await supabase.from("courses").insert([
    {
      title: title,
      description: description,
      teacher_id: teacherId,
    },
  ]);

  if (error) {
    console.error("Error inserting course:", error.message);
    return null; // Hoặc xử lý lỗi tùy ý
  } else {
    console.log("Course inserted successfully:", data);
    return data; // Trả về dữ liệu khóa học vừa chèn
  }
};

export const insertDiscussionComment = async (
  discussionId: string,
  commentText: string,
  userId: string
) => {
  const { data, error } = await supabase.from("discussion_comments").insert([
    {
      discussion_id: discussionId,
      comment_text: commentText,
      user_id: userId,
    },
  ]);

  if (error) {
    console.error("Error inserting discussion comment:", error.message);
    return null; // Hoặc xử lý lỗi tùy ý
  } else {
    console.log("Discussion comment inserted successfully:", data);
    return data; // Trả về dữ liệu bình luận vừa chèn
  }
};

export const insertDiscussion = async (
  courseId: string,
  title: string,
  createdBy: string
) => {
  const { data, error } = await supabase.from("discussions").insert([
    {
      course_id: courseId,
      title: title,
      created_by: createdBy,
    },
  ]);

  if (error) {
    console.error("Error inserting discussion:", error.message);
    return null; // Hoặc xử lý lỗi tùy ý
  } else {
    console.log("Discussion inserted successfully:", data);
    return data; // Trả về dữ liệu cuộc thảo luận vừa chèn
  }
};

export const insertEnrollment = async (
  courseId: string,
  studentId: string,
  enrolledAt: Date = new Date()
) => {
  const { data, error } = await supabase.from("enrollments").insert([
    {
      course_id: courseId,
      student_id: studentId,
      enrolled_at: enrolledAt,
    },
  ]);

  if (error) {
    console.error("Error inserting enrollment:", error.message);
    return null; // Hoặc xử lý lỗi tùy ý
  } else {
    console.log("Enrollment inserted successfully:", data);
    return data; // Trả về dữ liệu ghi danh vừa chèn
  }
};

export const insertGuestAccess = async (
  guestId: string,
  courseId: string,
  accessGrantedAt: Date = new Date()
) => {
  const { data, error } = await supabase.from("guest_access").insert([
    {
      guest_id: guestId,
      course_id: courseId,
      access_granted_at: accessGrantedAt,
    },
  ]);

  if (error) {
    console.error("Error inserting guest access:", error.message);
    return null; // Hoặc xử lý lỗi tùy ý
  } else {
    console.log("Guest access inserted successfully:", data);
    return data; // Trả về dữ liệu quyền truy cập vừa chèn
  }
};

export const insertMeetingAgenda = async (
  meetingId: string,
  agendaItem: string,
  createdAt: Date = new Date()
) => {
  const { data, error } = await supabase.from("meeting_agenda").insert([
    {
      meeting_id: meetingId,
      agenda_item: agendaItem,
      created_at: createdAt,
    },
  ]);

  if (error) {
    console.error("Error inserting meeting agenda:", error.message);
    return null; // Hoặc xử lý lỗi tùy ý
  } else {
    console.log("Meeting agenda inserted successfully:", data);
    return data; // Trả về dữ liệu mục chương trình vừa chèn
  }
};

export const insertMeetingRecord = async (
  meetingId: string,
  recordUrl: string,
  createdAt: Date = new Date()
) => {
  const { data, error } = await supabase.from("meeting_records").insert([
    {
      meeting_id: meetingId,
      record_url: recordUrl,
      created_at: createdAt,
    },
  ]);

  if (error) {
    console.error("Error inserting meeting record:", error.message);
    return null; // Hoặc xử lý lỗi tùy ý
  } else {
    console.log("Meeting record inserted successfully:", data);
    return data; // Trả về dữ liệu bản ghi cuộc họp vừa chèn
  }
};

export const insertNotification = async (
  userId: string,
  message: string,
  isRead: boolean = false
) => {
  const { data, error } = await supabase.from("notifications").insert([
    {
      user_id: userId,
      message: message,
      is_read: isRead,
    },
  ]);

  if (error) {
    console.error("Error inserting notification:", error.message);
    return null; // Hoặc xử lý lỗi tùy ý
  } else {
    console.log("Notification inserted successfully:", data);
    return data; // Trả về dữ liệu thông báo vừa chèn
  }
};

export const insertParentStudentRelation = async (
  parentId: string,
  studentId: string,
  relationship: string
) => {
  const { data, error } = await supabase.from("parents_students").insert([
    {
      parent_id: parentId,
      student_id: studentId,
      relationship: relationship,
    },
  ]);

  if (error) {
    console.error("Error inserting parent-student relation:", error.message);
    return null; // Hoặc xử lý lỗi tùy ý
  } else {
    console.log("Parent-student relation inserted successfully:", data);
    return data; // Trả về dữ liệu mối quan hệ vừa chèn
  }
};

export const insertPaymentRecord = async (
  studentId: string,
  courseId: string,
  amount: number,
  paymentDate: Date = new Date()
) => {
  const { data, error } = await supabase.from("payment_records").insert([
    {
      student_id: studentId,
      course_id: courseId,
      amount: amount,
      payment_date: paymentDate,
    },
  ]);

  if (error) {
    console.error("Error inserting payment record:", error.message);
    return null; // Hoặc xử lý lỗi tùy ý
  } else {
    console.log("Payment record inserted successfully:", data);
    return data; // Trả về dữ liệu bản ghi thanh toán vừa chèn
  }
};

export const insertSubmission = async (
  assignmentId: string,
  studentId: string,
  grade: number | null = null,
  submittedAt: Date = new Date()
) => {
  const { data, error } = await supabase.from("submissions").insert([
    {
      assignment_id: assignmentId,
      student_id: studentId,
      grade: grade,
      submitted_at: submittedAt,
    },
  ]);

  if (error) {
    console.error("Error inserting submission:", error.message);
    return null; // Hoặc xử lý lỗi tùy ý
  } else {
    console.log("Submission inserted successfully:", data);
    return data; // Trả về dữ liệu bài nộp vừa chèn
  }
};

export const insertQuiz = async (
  courseId: string,
  title: string,
  description?: string,
  createdAt: Date = new Date()
) => {
  const { data, error } = await supabase.from("quizzes").insert([
    {
      course_id: courseId,
      title: title,
      description: description,
      created_at: createdAt,
    },
  ]);

  if (error) {
    console.error("Error inserting quiz:", error.message);
    return null; // Hoặc xử lý lỗi tùy ý
  } else {
    console.log("Quiz inserted successfully:", data);
    return data; // Trả về dữ liệu quiz vừa chèn
  }
};

export const insertQuizSubmission = async (
  quizId: string,
  studentId: string,
  score: number,
  submittedAt: Date = new Date()
) => {
  const { data, error } = await supabase.from("quiz_submissions").insert([
    {
      quiz_id: quizId,
      student_id: studentId,
      score: score,
      submitted_at: submittedAt,
    },
  ]);

  if (error) {
    console.error("Error inserting quiz submission:", error.message);
    return null; // Hoặc xử lý lỗi tùy ý
  } else {
    console.log("Quiz submission inserted successfully:", data);
    return data; // Trả về dữ liệu bài nộp quiz vừa chèn
  }
};

export const insertQuizQuestion = async (
  quizId: string,
  questionText: string,
  questionType: "multiple_choice" | "true_false" | "short_answer",
  createdAt: Date = new Date()
) => {
  const { data, error } = await supabase.from("quiz_questions").insert([
    {
      quiz_id: quizId,
      question_text: questionText,
      question_type: questionType,
      created_at: createdAt,
    },
  ]);

  if (error) {
    console.error("Error inserting quiz question:", error.message);
    return null; // Hoặc xử lý lỗi tùy ý
  } else {
    console.log("Quiz question inserted successfully:", data);
    return data; // Trả về dữ liệu câu hỏi vừa chèn
  }
};

export const insertQuizOption = async (
  questionId: string,
  optionText: string,
  isCorrect: boolean = false
) => {
  const { data, error } = await supabase.from("quiz_options").insert([
    {
      question_id: questionId,
      option_text: optionText,
      is_correct: isCorrect,
    },
  ]);

  if (error) {
    console.error("Error inserting quiz option:", error.message);
    return null; // Hoặc xử lý lỗi tùy ý
  } else {
    console.log("Quiz option inserted successfully:", data);
    return data; // Trả về dữ liệu tùy chọn vừa chèn
  }
};
