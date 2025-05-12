import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { teacherApi } from "@/controller/teacher/axios";

const ExamDetailScreen = () => {
  const router = useRouter();
  const { examId } = router.query;
  const [examDetail, setExamDetail] = useState(null);

  useEffect(() => {
    const fetchExamDetail = async () => {
      try {
        const response = await teacherApi.getExamDetail(examId as string); // Giả sử có API này
        setExamDetail(response.data);
      } catch (error) {
        console.error("Error fetching exam details:", error);
      }
    };

    if (examId) {
      fetchExamDetail();
    }
  }, [examId]);

  if (!examDetail) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{examDetail.name}</Text>
      <Text style={styles.description}>{examDetail.description}</Text>
      {/* Thêm chi tiết kỳ thi tại đây */}
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
  description: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default ExamDetailScreen;
