import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  ExamItem,
  fetchAllQuestions,
  fetchExamById,
  updateExam,
} from "@/controller/admin/question/slice";

export default function AdminExamEditScreen({ route }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // Exam ID từ route params
  const { examId } = route.params;

  const { exams, status, error } = useSelector(
    (state: RootState) => state.adminExam
  );
  const { questions } = useSelector((state: RootState) => state.adminQuestion);

  const [examName, setExamName] = useState("");
  const [examDuration, setExamDuration] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchExamById(examId));
    dispatch(fetchAllQuestions());
  }, [dispatch, examId]);

  useEffect(() => {
    if (exams) {
      setExamName(exams.name);
      setExamDuration(exams.duration.toString());
      setSelectedQuestions(exams.questions.map((q) => q.id));
    }
  }, [exams]);

  const handleUpdateExam = () => {
    const updatedExam: ExamItem = {
      ...exams,
      name: examName,
      duration: parseInt(examDuration),
      questions: selectedQuestions.map((id) =>
        questions.find((q) => q.id === id)
      ),
      subject: "",
      date: "",
      id: 1,
    };
    dispatch(updateExam(updatedExam));
    router.push("/admin-exams");
  };

  const handleQuestionToggle = (questionId: number) => {
    setSelectedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
          Chỉnh sửa bài thi
        </Text>

        {loading || status === "loading" ? (
          <ActivityIndicator size="large" style={{ marginTop: 50 }} />
        ) : (
          <>
            <TextInput
              placeholder="Tên bài thi"
              value={examName}
              onChangeText={setExamName}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 10,
                marginBottom: 16,
              }}
            />

            <TextInput
              placeholder="Thời gian (phút)"
              value={examDuration}
              keyboardType="numeric"
              onChangeText={setExamDuration}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 10,
                marginBottom: 16,
              }}
            />

            <Text style={{ fontSize: 18, marginBottom: 8 }}>Chọn câu hỏi</Text>
            <FlatList
              data={questions}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 12,
                    backgroundColor: "#f9f9f9",
                    padding: 12,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "#eee",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => handleQuestionToggle(item.id)}
                    style={{
                      backgroundColor: selectedQuestions.includes(item.id)
                        ? "#007AFF"
                        : "#fff",
                      borderWidth: 1,
                      borderColor: "#007AFF",
                      borderRadius: 8,
                      paddingVertical: 4,
                      paddingHorizontal: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: selectedQuestions.includes(item.id)
                          ? "#fff"
                          : "#007AFF",
                      }}
                    >
                      {selectedQuestions.includes(item.id) ? "Đã chọn" : "Chọn"}
                    </Text>
                  </TouchableOpacity>
                  <Text style={{ marginLeft: 12 }}>{item.questionText}</Text>
                </View>
              )}
            />

            <TouchableOpacity
              onPress={handleUpdateExam}
              style={{
                backgroundColor: "#007AFF",
                padding: 12,
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                Cập nhật bài thi
              </Text>
            </TouchableOpacity>
          </>
        )}

        {error && (
          <Text style={{ color: "red", textAlign: "center", marginTop: 12 }}>
            {error}
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
