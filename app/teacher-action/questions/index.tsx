import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { teacherApi } from "@/controller/teacher/axios";

const QuestionsScreen = () => {
  const [questions, setQuestions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await teacherApi.fetchQuestions();
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const navigateToQuestionEdit = (questionId: string) => {
    router.push({
      pathname: "/teacher-action/questions/[questionId]/edit",
      params: { questionId },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh Sách Câu Hỏi</Text>
      <FlatList
        data={questions}
        renderItem={({ item }) => (
          <View style={styles.questionItem}>
            <Text style={styles.questionText}>{item.content}</Text>
            <Button
              title="Chỉnh Sửa"
              onPress={() => navigateToQuestionEdit(item.id.toString())}
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  questionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  questionText: {
    fontSize: 18,
    flex: 1,
  },
});

export default QuestionsScreen;
