import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { teacherApi } from "@/controller/teacher/axios";

const EditQuestionScreen = () => {
  const router = useRouter();
  const { questionId } = router.query;
  const [questionData, setQuestionData] = useState({ content: "", id: "" });

  useEffect(() => {
    const fetchQuestionDetail = async () => {
      try {
        const response = await teacherApi.fetchQuestions();
        const question = response.data.find((q) => q.id === questionId);
        setQuestionData(question);
      } catch (error) {
        console.error("Error fetching question details:", error);
      }
    };

    if (questionId) {
      fetchQuestionDetail();
    }
  }, [questionId]);

  const handleSave = async () => {
    try {
      await teacherApi.updateQuestion(questionData);
      router.push("/teacher-action/questions");
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chỉnh Sửa Câu Hỏi</Text>
      <TextInput
        style={styles.input}
        value={questionData.content}
        onChangeText={(text) =>
          setQuestionData({ ...questionData, content: text })
        }
        placeholder="Nhập nội dung câu hỏi"
      />
      <Button title="Lưu" onPress={handleSave} />
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default EditQuestionScreen;
