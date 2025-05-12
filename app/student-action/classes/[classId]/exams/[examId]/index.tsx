import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";
import axiosInstance from "@/controller/admin/student/axios";
import { useLocalSearchParams, useRouter } from "expo-router";

const ExamScreen = () => {
  const { examId } = useLocalSearchParams();
  const router = useRouter();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    fetchExamQuestions();
  }, [examId]);

  useEffect(() => {
    if (timer > 0) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && questions.length > 0) {
      handleSubmit();
    }
    return () => clearInterval(intervalRef.current);
  }, [timer]);

  const fetchExamQuestions = async () => {
    try {
      const res = await axiosInstance.get(
        `/get-list-question-of-exam-by-examId?examId=${examId}`
      );
      if (res.data?.result && res.data.data?.questions) {
        setQuestions(res.data.data.questions);
        setTimer(res.data.data.timeLimit * 60);
      }
    } catch (error) {
      Alert.alert("Lỗi", "Không thể tải câu hỏi");
    }
  };

  const handleSelect = (questionId: number, choice: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: choice }));
  };

  const handleSubmit = async () => {
    clearInterval(intervalRef.current);
    try {
      const payload = {
        examId,
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          questionId: Number(questionId),
          answer,
        })),
      };
      const res = await axiosInstance.post(
        "/save-result-exam-or-assignment-to-history",
        payload
      );
      if (res.data?.result) {
        Alert.alert("Hoàn thành", "Bài thi đã được nộp");
        router.back();
      } else {
        Alert.alert("Lỗi", res.data.messageVI || "Không thể nộp bài");
      }
    } catch (error) {
      Alert.alert("Lỗi", "Không thể gửi kết quả");
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.timer}>
        ⏳ Thời gian còn lại: {formatTime(timer)}
      </Text>
      {questions.map((q: any, index: number) => (
        <View key={q.id} style={styles.questionContainer}>
          <Text style={styles.question}>
            {index + 1}. {q.questionPrompt}
          </Text>
          {q.choices.map((choice: string, i: number) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.choice,
                answers[q.id] === choice && styles.selectedChoice,
              ]}
              onPress={() => handleSelect(q.id, choice)}
            >
              <Text>{choice}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Nộp bài</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  timer: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
    marginBottom: 12,
    textAlign: "center",
  },
  questionContainer: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 1,
  },
  question: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  choice: {
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 6,
    marginBottom: 6,
  },
  selectedChoice: {
    backgroundColor: "#cce5ff",
    borderColor: "#007AFF",
    borderWidth: 1,
  },
  submitButton: {
    marginTop: 30,
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  submitText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ExamScreen;
