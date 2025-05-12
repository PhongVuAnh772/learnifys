import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

export default function EditExamScreen() {
  const router = useRouter();
  const { examId } = router.query; // examId từ URL params
  const [examData, setExamData] = useState<any>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (!examId) return;

    // Lấy thông tin kỳ thi từ API
    const fetchExamData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://your-api.com/api/exams/${examId}`);
        const data = await res.json();

        if (res.ok) {
          setExamData({
            title: data.title,
            description: data.description,
            startDate: data.startDate,
            endDate: data.endDate,
          });
        } else {
          throw new Error(data.message || "Không thể tải thông tin kỳ thi.");
        }
      } catch (error: any) {
        Alert.alert(
          "Lỗi",
          error.message || "Có lỗi xảy ra khi tải thông tin kỳ thi."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchExamData();
  }, [examId]);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const res = await fetch(`https://your-api.com/api/exams/${examId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(examData),
      });
      const data = await res.json();

      if (res.ok) {
        Alert.alert("Thành công", "Thông tin kỳ thi đã được cập nhật.");
        router.push(`/teacher-action/exams/${examId}`); // Quay lại màn hình chi tiết kỳ thi
      } else {
        throw new Error(data.message || "Không thể cập nhật thông tin kỳ thi.");
      }
    } catch (error: any) {
      Alert.alert("Lỗi", error.message || "Có lỗi xảy ra khi cập nhật kỳ thi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chỉnh sửa kỳ thi</Text>

      <TextInput
        style={styles.input}
        placeholder="Tiêu đề kỳ thi"
        value={examData.title}
        onChangeText={(text) => setExamData({ ...examData, title: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Mô tả kỳ thi"
        value={examData.description}
        onChangeText={(text) => setExamData({ ...examData, description: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Ngày bắt đầu (YYYY-MM-DD)"
        value={examData.startDate}
        onChangeText={(text) => setExamData({ ...examData, startDate: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Ngày kết thúc (YYYY-MM-DD)"
        value={examData.endDate}
        onChangeText={(text) => setExamData({ ...examData, endDate: text })}
      />

      <Button
        title={isSubmitting ? "Đang cập nhật..." : "Cập nhật kỳ thi"}
        onPress={handleSubmit}
        disabled={isSubmitting}
        color="#007bff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
});
