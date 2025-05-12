import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axiosInstance from "@/controller/admin/student/axios";
import moment from "moment";

interface ExamsTabProps {
  classId: string;
}

const ExamsTab: React.FC<ExamsTabProps> = ({ classId }) => {
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchExams = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `/get-list-exams-of-class?classId=${classId}`
      );
      setExams(res.data?.data || []);
    } catch (error) {
      console.error("Lỗi khi lấy bài thi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, [classId]);

  const renderItem = ({ item }: any) => {
    const status = item.isFinished ? "✅ Đã thi" : "🕒 Chưa thi";
    const score = item.score ?? "Chưa có";
    const duration = item.duration ? `${item.duration} phút` : "Không rõ";
    const examTime = item.timeStart
      ? moment(item.timeStart).format("HH:mm DD/MM/YYYY")
      : "Chưa rõ";

    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.title || "Bài thi không tên"}</Text>
        <Text style={styles.desc}>Thời gian bắt đầu: {examTime}</Text>
        <Text style={styles.detail}>Thời lượng: {duration}</Text>
        <Text style={styles.detail}>Trạng thái: {status}</Text>
        <Text style={styles.detail}>Điểm: {score}</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            {item.isFinished ? "Xem kết quả" : "Vào thi"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={exams}
      refreshing={loading}
      onRefresh={fetchExams}
      keyExtractor={(item) => item.id?.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 16 }}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📂</Text>
          <Text style={styles.emptyText}>Không có bài thi nào</Text>
        </View>
      }
    />
  );
};

export default ExamsTab;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  desc: {
    marginVertical: 6,
    fontSize: 14,
    color: "#444",
  },
  detail: {
    fontSize: 13,
    color: "#555",
    marginTop: 2,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
