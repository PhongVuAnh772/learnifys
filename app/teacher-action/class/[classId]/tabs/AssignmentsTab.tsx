import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import axiosInstance from "@/controller/admin/student/axios";
import moment from "moment";

interface AssignmentsTabProps {
  classId: string;
}

const AssignmentsTab: React.FC<AssignmentsTabProps> = ({ classId }) => {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [allQuestions, setAllQuestions] = useState<any[]>([]);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);

  const fetchQuestions = async () => {
    try {
      const res = await axiosInstance.get("/get-all-question");
      console.log(res.data);
      if (res.data.result) {
        setAllQuestions(res.data.data);
      }
    } catch (err) {
      console.error("Lỗi khi lấy danh sách câu hỏi:", err);
    }
  };

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

  const handleSaveAssignment = async () => {
    if (!title.trim() || selectedQuestionIds.length === 0) {
      Alert.alert("Lỗi", "Vui lòng nhập tiêu đề và chọn ít nhất một câu hỏi");
      return;
    }

    try {
      const now = new Date();
      const payload = {
        name: title,
        description,
        classId,
        dateFinish: now.toISOString(),
        timeLimit: 30,
        listQuestionId: selectedQuestionIds,
      };

      const res = editingId
        ? await axiosInstance.put(`/update-assignment/${editingId}`, payload)
        : await axiosInstance.post(
            "/create-new-assignment-by-teacher",
            payload
          );

      if (res.data?.result) {
        fetchAssignments();
        setModalVisible(false);
        setTitle("");
        setDescription("");
        setSelectedQuestionIds([]);
        setEditingId(null);
      } else {
        Alert.alert("Lỗi", res.data.messageVI || "Không thể lưu bài tập");
      }
    } catch (err) {
      Alert.alert("Lỗi", "Không thể kết nối đến máy chủ");
    }
  };

  const handleDeleteAssignment = async (id: string) => {
    Alert.alert("Xác nhận", "Bạn có chắc muốn xoá bài tập này?", [
      { text: "Huỷ" },
      {
        text: "Xoá",
        onPress: async () => {
          try {
            const res = await axiosInstance.delete(
              `/delete-assignment-by-teacher/assignmentId=${id}`
            );
            if (res.data?.result) {
              fetchAssignments();
            } else {
              Alert.alert("Lỗi", res.data.messageVI || "Không thể xoá bài tập");
            }
          } catch (err) {
            Alert.alert("Lỗi", "Không thể kết nối đến máy chủ");
          }
        },
      },
    ]);
  };

  useEffect(() => {
    fetchAssignments();
  }, [classId]);

  const renderItem = ({ item }: any) => {
    const deadline = item.deadline
      ? moment(item.deadline).format("DD/MM/YYYY HH:mm")
      : "Không rõ";

    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.title || "Bài tập không tên"}</Text>
        <Text style={styles.desc}>{item.description || "Không có mô tả"}</Text>
        <Text style={styles.detail}>🕒 Hạn nộp: {deadline}</Text>

        <View style={{ flexDirection: "row", marginTop: 10, gap: 10 }}>
          <TouchableOpacity
            onPress={() => {
              setTitle(item.title);
              setDescription(item.description);
              setEditingId(item.id);
              fetchQuestions();
              setModalVisible(true);
            }}
            style={[styles.button, { flex: 1 }]}
          >
            <Text style={styles.buttonText}>Chỉnh sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDeleteAssignment(item.id)}
            style={[styles.button, { backgroundColor: "red", flex: 1 }]}
          >
            <Text style={styles.buttonText}>Xoá</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
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
            <Text style={styles.emptyText}>Chưa có bài tập nào</Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          fetchQuestions();
          setTitle("");
          setDescription("");
          setSelectedQuestionIds([]);
          setEditingId(null);
          setModalVisible(true);
        }}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.sheetTitle}>Tạo / Chỉnh sửa bài tập</Text>
            <TextInput
              style={styles.input}
              placeholder="Tiêu đề bài tập"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Mô tả bài tập"
              multiline
              value={description}
              onChangeText={setDescription}
            />
            <View>
              {allQuestions.map((q) => (
                <TouchableOpacity
                  key={q.id}
                  onPress={() => {
                    setSelectedQuestionIds((prev) =>
                      prev.includes(q.id)
                        ? prev.filter((id) => id !== q.id)
                        : [...prev, q.id]
                    );
                  }}
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 10,
                    borderRadius: 8,
                    backgroundColor: selectedQuestionIds.includes(q.id)
                      ? "#D6EAFE"
                      : "#F2F2F2",
                    marginBottom: 6,
                  }}
                >
                  <Text
                    style={{
                      color: selectedQuestionIds.includes(q.id)
                        ? "#007AFF"
                        : "#333",
                      fontWeight: "500",
                    }}
                  >
                    • {q.questionPrompt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#007AFF", flex: 1 }]}
                onPress={handleSaveAssignment}
              >
                <Text style={styles.buttonText}>Lưu</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#ccc", flex: 1 }]}
                onPress={() => {
                  setModalVisible(false);
                  setTitle("");
                  setDescription("");
                  setEditingId(null);
                  setSelectedQuestionIds([]);
                }}
              >
                <Text style={[styles.buttonText, { color: "#333" }]}>Huỷ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
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
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: "#007AFF",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  fabText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    gap: 12,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#fff",
  },
  emptyContainer: {
    alignItems: "center",
    paddingTop: 60,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: "#777",
  },
});
