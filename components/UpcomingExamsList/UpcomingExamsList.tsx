import React from "react";
import { View, Text, StyleSheet } from "react-native";
import dayjs from "dayjs";

interface Exam {
  id: number;
  name: string;
  dateFinish: string;
  className?: string;
}

interface Props {
  exams: Exam[];
}

const UpcomingExamsList = ({ exams }: Props) => {
  const upcoming = exams.filter((exam) =>
    dayjs(exam.dateFinish).isAfter(dayjs().subtract(1, "day"))
  );

  const top3 = upcoming.slice(0, 3);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài thi sắp tới của con</Text>
      {top3.length === 0 ? (
        <Text style={styles.noExam}>Không có bài thi nào sắp tới.</Text>
      ) : (
        top3.map((exam) => (
          <View key={exam.id} style={styles.examBox}>
            <Text style={styles.examName}>{exam.name}</Text>
            <Text style={styles.examDetail}>
              Ngày thi: {dayjs(exam.dateFinish).format("DD/MM/YYYY")}
            </Text>
            {exam.className && (
              <Text style={styles.examDetail}>Lớp: {exam.className}</Text>
            )}
          </View>
        ))
      )}
    </View>
  );
};

export default UpcomingExamsList;

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "quicksand-bold",
    marginBottom: 12,
  },
  noExam: {
    color: "#555",
    fontStyle: "italic",
  },
  examBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  examName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  examDetail: {
    color: "#555",
  },
});
