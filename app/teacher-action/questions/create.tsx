import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { teacherApi } from "@/controller/teacher/axios";

const CreateQuestionScreen = () => {
  const [questionContent, setQuestionContent] = useState("");
  const router = useRouter();

  const handleCreateQuestion = async () => {
    if (!questionContent) {
      Alert.alert("Lỗi", "Vui lòng nhập nội dung câu hỏi");
      return;
    }

    try {
      const newQuestion = {
        content: questionContent,
      };
      await teacherApi.createQuestion(newQuestion);
      Alert.alert("Thành công", "Câu hỏi đã được tạo");
      router.push("/teacher-action/questions"); // Điều hướng về danh sách câu hỏi sau khi tạo
    } catch (error) {
      console.error("Lỗi tạo câu hỏi:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra trong quá trình tạo câu hỏi");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tạo Câu Hỏi Mới</Text>
      <TextInput
        style={styles.input}
        value={questionContent}
        onChangeText={setQuestionContent}
        placeholder="Nhập nội dung câu hỏi"
        multiline
      />
      <Button title="Tạo Câu Hỏi" onPress={handleCreateQuestion} />
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
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    paddingTop: 10,
    textAlignVertical: "top",
  },
});

export default CreateQuestionScreen;
