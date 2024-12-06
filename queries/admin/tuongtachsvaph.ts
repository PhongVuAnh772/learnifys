import { supabase } from "@/supabase";

interface Message {
    sender_id: string;  // ID người gửi (học sinh hoặc phụ huynh)
    receiver_id: string;  // ID người nhận (học sinh, phụ huynh hoặc giáo viên)
    message_text: string;  // Nội dung tin nhắn
}

const sendMessage = async (message: Message) => {
    try {
        const { data, error } = await supabase
            .from("messages")
            .insert([
                {
                    sender_id: message.sender_id,
                    receiver_id: message.receiver_id,
                    message_text: message.message_text,
                },
            ]);

        if (error) {
            throw new Error(error.message);
        }

        console.log("Message sent successfully:", data);
        return data;  // Trả về tin nhắn đã được gửi
    } catch (error) {
        console.error("Error sending message:", error);
        throw new Error("Failed to send message.");
    }
};

interface Notification {
    student_id: string;  // ID học sinh
    parent_id: string;   // ID phụ huynh
    notification_text: string;  // Nội dung thông báo
    type: string; // Loại thông báo (ví dụ: 'exam', 'progress')
}

const sendNotification = async (notification: Notification) => {
    try {
        const { data, error } = await supabase
            .from("notifications")
            .insert([
                {
                    student_id: notification.student_id,
                    parent_id: notification.parent_id,
                    notification_text: notification.notification_text,
                    type: notification.type,
                },
            ]);

        if (error) {
            throw new Error(error.message);
        }

        console.log("Notification sent successfully:", data);
        return data;  // Trả về thông báo đã được gửi
    } catch (error) {
        console.error("Error sending notification:", error);
        throw new Error("Failed to send notification.");
    }
};

const getStudentProgress = async (studentId: string) => {
    try {
        const { data, error } = await supabase
            .from("students")
            .select("progress")  // Giả sử bảng có một trường `progress` lưu trữ thông tin tiến độ
            .eq("id", studentId);

        if (error) {
            throw new Error(error.message);
        }

        console.log("Student progress:", data);
        return data;  // Trả về tiến độ học tập của học sinh
    } catch (error) {
        console.error("Error retrieving student progress:", error);
        throw new Error("Failed to retrieve student progress.");
    }
};
