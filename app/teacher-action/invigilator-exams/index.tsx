import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { teacherApi } from "@/controller/teacher/axios";

const InvigilatorExamsScreen = () => {
  const [exams, setExams] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await teacherApi.fetchInvigilatorExams();
        setExams(response.data);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };
    fetchExams();
  }, []);

  const navigateToExamDetail = (examId: string) => {
    router.push({
      pathname: "/teacher-action/invigilator-exams/[examId]",
      params: { examId },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh Sách Kỳ Thi Invigilator</Text>
      <FlatList
        data={exams}
        renderItem={({ item }) => (
          <View style={styles.examItem}>
            <Text style={styles.examTitle}>{item.name}</Text>
            <Button
              title="Chi Tiết"
              onPress={() => navigateToExamDetail(item.id.toString())}
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
  examItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  examTitle: {
    fontSize: 18,
  },
});

export default InvigilatorExamsScreen;
