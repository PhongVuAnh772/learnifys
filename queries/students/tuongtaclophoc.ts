import { supabase } from "@/supabase";

interface AddStudentToClassParams {
    classId: string;
    studentId: string;
}

const addStudentToClass = async ({ classId, studentId }: AddStudentToClassParams) => {
    try {
        const { data, error } = await supabase
            .from('students_in_classes')
            .insert([{ class_id: classId, student_id: studentId }]);

        if (error) {
            throw new Error(error.message);
        }

        console.log("Student added to class successfully:", data);
        return data;  // Trả về thông tin học sinh đã được thêm vào lớp
    } catch (error) {
        console.error("Error adding student to class:", error);
        throw new Error("Failed to add student to class.");
    }
};
interface Assignment {
    classId: string;
    title: string;
    description: string;
    dueDate: string;
}

const assignHomework = async (assignment: Assignment) => {
    try {
        const { data, error } = await supabase
            .from('assignments')
            .insert([assignment]);

        if (error) {
            throw new Error(error.message);
        }

        console.log("Assignment created successfully:", data);
        return data;  // Trả về thông tin bài tập đã giao
    } catch (error) {
        console.error("Error assigning homework:", error);
        throw new Error("Failed to assign homework.");
    }
};
interface Notification {
    classId: string;
    title: string;
    content: string;
}

const sendNotification = async (notification: Notification) => {
    try {
        const { data, error } = await supabase
            .from('notifications')
            .insert([notification]);

        if (error) {
            throw new Error(error.message);
        }

        console.log("Notification sent successfully:", data);
        return data;  // Trả về thông tin thông báo
    } catch (error) {
        console.error("Error sending notification:", error);
        throw new Error("Failed to send notification.");
    }
};
interface Message {
    senderId: string;
    receiverId: string;
    content: string;
}

const sendMessage = async (message: Message) => {
    try {
        const { data, error } = await supabase
            .from('messages')
            .insert([message]);

        if (error) {
            throw new Error(error.message);
        }

        console.log("Message sent successfully:", data);
        return data;  // Trả về tin nhắn đã gửi
    } catch (error) {
        console.error("Error sending message:", error);
        throw new Error("Failed to send message.");
    }
};
