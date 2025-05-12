// app/(teacher)/question/[questionId]/edit.tsx
import { useEffect, useState } from "react";
import { View, TextInput, Button, Alert, Text, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { teacherApi } from "@/controller/teacher/axios";

export default function EditQuestionScreen() {
  const { questionId } = useLocalSearchParams<{ questionId: string }>();
  const router = useRouter();

  const [content, setContent] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await teacherApi.fetchQuestions();
        const question = res.data.find((q) => q.id === questionId);
        if (question) {
          setContent(question.content);
          setOptions(question.options);
          setAnswer(question.answer);
        } else {
          Alert.alert("Không tìm thấy câu hỏi");
        }
      } catch (error) {
        Alert.alert("Lỗi khi lấy dữ liệu câu hỏi");
      }
    };
    fetch();
  }, [questionId]);

  const handleUpdate = async () => {
    if (!content || options.some((opt) => !opt) || !answer) {
      Alert.alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      await teacherApi.updateQuestion({
        id: questionId,
        content,
        options,
        answer,
      });
      Alert.alert("Cập nhật thành công");
      router.back();
    } catch (error) {
      Alert.alert("Cập nhật thất bại");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text>Nội dung câu hỏi:</Text>
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="Nhập nội dung câu hỏi"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginBottom: 20,
        }}
      />

      {options.map((opt, index) => (
        <View key={index} style={{ marginBottom: 15 }}>
          <Text>Lựa chọn {index + 1}:</Text>
          <TextInput
            value={opt}
            onChangeText={(text) =>
              setOptions((prev) =>
                prev.map((item, i) => (i === index ? text : item))
              )
            }
            placeholder={`Đáp án ${index + 1}`}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 10,
            }}
          />
        </View>
      ))}

      <Text>Đáp án đúng (nội dung):</Text>
      <TextInput
        value={answer}
        onChangeText={setAnswer}
        placeholder="Nhập nội dung đáp án đúng"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginBottom: 20,
        }}
      />

      <Button title="Cập nhật câu hỏi" onPress={handleUpdate} />
    </ScrollView>
  );
}
