import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function ClassStudentsScreen() {
  const { classId } = useLocalSearchParams();
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(
          `https://your-api.com/api/get-list-student-of-class?classId=${classId}`,
          {
            headers: {
              Authorization: "Bearer your_token", // thay bằng token thật
            },
          }
        );
        const data = await res.json();
        setStudents(data || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách học sinh:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [classId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (students.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Không có học sinh nào trong lớp.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={students}
      keyExtractor={(item) => item.studentId || item.id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <View style={styles.studentItem}>
          <Text style={styles.name}>{item.fullName}</Text>
          <Text style={styles.email}>{item.email}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  studentItem: {
    padding: 16,
    backgroundColor: "#e0f7fa",
    borderRadius: 8,
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#00796b",
  },
  email: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
});
