import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Button } from "react-native";
import { useRouter } from "expo-router";
import { teacherApi } from "@/controller/teacher/axios";

export default function ExamListScreen() {
  const router = useRouter();
  const [exams, setExams] = useState([]);

  const fetchExams = async () => {
    try {
      const res = await teacherApi.fetchInvigilatorExams();
      setExams(res.data || []);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: `/teacher-action/exams/${1}/edit`,
          params: { examId: item.id.toString() },
        })
      }
      style={{
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.name}</Text>
      <Text>{item.className}</Text>
      <Text>Thời gian: {item.duration} phút</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button
        title="Tạo đề thi"
        onPress={() => router.push("/teacher-action/exams/create")}
      />
      <FlatList
        data={exams}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ marginTop: 20 }}
      />
    </View>
  );
}
