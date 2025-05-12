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

interface AssignmentsTabProps {
  classId: string;
}

const AssignmentsTab: React.FC<AssignmentsTabProps> = ({ classId }) => {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `/get-list-assignments-of-class?classId=${classId}`
      );
      setAssignments(res.data.data || []);
    } catch (err) {
      console.error("Lỗi khi lấy bài tập:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [classId]);

  const renderItem = ({ item }: any) => {
    const isSubmitted = item.isSubmitted;
    const deadline = item.deadline
      ? moment(item.deadline).format("DD/MM/YYYY HH:mm")
      : "Không rõ";
    const statusText = isSubmitted ? "✅ Đã nộp" : "🕒 Chưa nộp";

    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.title || "Bài tập không tên"}</Text>
        <Text style={styles.desc}>{item.description || "Không có mô tả"}</Text>
        <Text style={styles.detail}>Hạn nộp: {deadline}</Text>
        <Text style={styles.status}>{statusText}</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Làm bài</Text>
        </TouchableOpacity>
      </View>
    );
  };

  console.log(assignments, "assignments");

  return (
    <FlatList
      data={assignments}
      refreshing={loading}
      onRefresh={fetchAssignments}
      renderItem={renderItem}
      keyExtractor={(item) => item.id?.toString()}
      contentContainerStyle={{ padding: 16 }}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📂</Text>
          <Text style={styles.emptyText}>Không có bài tập nào</Text>
        </View>
      }
    />
  );
};

export default AssignmentsTab;

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
    color: "#777",
  },
  status: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "600",
    color: "#007AFF",
  },
  button: {
    marginTop: 12,
    backgroundColor: "#2196F3",
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
