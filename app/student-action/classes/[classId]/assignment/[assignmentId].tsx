import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import axiosInstance from "@/controller/admin/student/axios";
import { useLocalSearchParams, useRouter } from "expo-router";

const AssignmentExamScreen = () => {
  const { assignmentId } = useLocalSearchParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axiosInstance.get(
          `/get-list-questions-of-exam?examId=${assignmentId}`
        );
        if (res?.data?.result) {
          setQuestions(res.data.data);
        } else {
          Alert.alert("Lỗi", res?.data?.messageVI || "Không tải được câu hỏi");
        }
      } catch (error) {
        Alert.alert("Lỗi", "Không thể kết nối tới máy chủ");
      } finally {
        setLoading(false);
      }
    };

    if (assignmentId) fetchQuestions();
  }, [assignmentId]);

  const handleChooseAnswer = (questionId, optionValue) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionValue }));
  };

  const handleSubmit = async () => {
    try {
      const formattedAnswers = Object.entries(answers).map(
        ([questionId, answer]) => ({
          questionId: Number(questionId),
          selectedOption: answer,
        })
      );

      const payload = {
        examId: Number(assignmentId),
        answers: formattedAnswers,
      };

      const res = await axiosInstance.post(
        "/save-result-exam-or-assignment-to-history",
        payload
      );

      if (res?.data?.result) {
        Alert.alert("Thành công", "Bài làm đã được nộp");
        router.back();
      } else {
        Alert.alert("Lỗi", res?.data?.messageVI || "Nộp bài thất bại");
      }
    } catch (error) {
      Alert.alert("Lỗi", "Không thể gửi bài làm");
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Đang tải câu hỏi...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {questions.map((q, index) => (
        <View key={q.id} style={styles.questionBlock}>
          <Text style={styles.questionText}>
            {index + 1}. {q.questionPrompt}
          </Text>
          {q.options.map((opt, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.option,
                answers[q.id] === opt && styles.optionSelected,
              ]}
              onPress={() => handleChooseAnswer(q.id, opt)}
            >
              <Text>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Nộp bài</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AssignmentExamScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  questionBlock: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  option: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 8,
  },
  optionSelected: {
    borderColor: "#007AFF",
    backgroundColor: "#e6f0ff",
  },
  submitButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
