import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function ExamResultScreen() {
  const router = useRouter();
  const { examId } = router.query; // examId từ URL params
  const userId = "user123"; // Đây là ví dụ, bạn có thể lấy từ context hoặc auth token.
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExamResult = async () => {
      if (!examId || !userId) return;

      setLoading(true);
      try {
        const res = await fetch(
          `https://your-api.com/api/exams/${examId}/result/${userId}`,
          {
            headers: {
              Authorization: "Bearer your_token_here",
            },
          }
        );
        const data = await res.json();

        if (res.ok) {
          setResult(data);
        } else {
          throw new Error(data.message || "Không thể tải kết quả kỳ thi.");
        }
      } catch (err: any) {
        Alert.alert("Lỗi", err.message || "Có lỗi xảy ra khi tải kết quả.");
      } finally {
        setLoading(false);
      }
    };

    fetchExamResult();
  }, [examId, userId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (!result) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Không tìm thấy kết quả kỳ thi này.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kết quả kỳ thi: {result.examName}</Text>
      <Text style={styles.subtitle}>
        Điểm số: {result.score} / {result.totalScore}
      </Text>
      <Text style={styles.subtitle}>
        Trạng thái: {result.passed ? "Đậu" : "Rớt"}
      </Text>
      <Text style={styles.title}>Câu hỏi và trả lời:</Text>

      {result.questions && result.questions.length > 0 ? (
        <View>
          {result.questions.map((question: any, index: number) => (
            <View key={index} style={styles.questionItem}>
              <Text style={styles.questionText}>
                Câu {index + 1}: {question.text}
              </Text>
              <Text style={styles.answerText}>
                Bạn trả lời: {question.userAnswer}
              </Text>
              <Text
                style={[
                  styles.resultText,
                  { color: question.correct ? "green" : "red" },
                ]}
              >
                {question.correct ? "Đúng" : "Sai"}
              </Text>
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.noQuestionsText}>
          Không có câu hỏi nào trong kết quả.
        </Text>
      )}
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  questionItem: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "500",
  },
  answerText: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  resultText: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: "600",
  },
  noQuestionsText: {
    fontSize: 16,
    color: "gray",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});
