import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

export default function ParentAssignmentsScreen() {
  const router = useRouter();
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Lấy danh sách bài tập của học sinh
    const fetchAssignments = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://your-api.com/api/assignments/parent");
        const data = await res.json();

        if (res.ok) {
          setAssignments(data.assignments);
        } else {
          throw new Error(data.message || "Không thể tải danh sách bài tập.");
        }
      } catch (error: any) {
        Alert.alert(
          "Lỗi",
          error.message || "Có lỗi xảy ra khi tải danh sách bài tập."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const handleViewAssignment = (assignmentId: string) => {
    router.push(`/parent-action/assignment/${assignmentId}`);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách bài tập</Text>

      <FlatList
        data={assignments}
        renderItem={({ item }) => (
          <View style={styles.assignmentItem}>
            <Text style={styles.assignmentTitle}>{item.title}</Text>
            <Text style={styles.assignmentDetails}>
              Ngày nộp: {item.dueDate}
            </Text>
            <Text style={styles.assignmentDetails}>
              Trạng thái: {item.status}
            </Text>
            <Button
              title="Xem chi tiết"
              onPress={() => handleViewAssignment(item.id)}
              color="#007bff"
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
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
    marginBottom: 20,
  },
  assignmentItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  assignmentTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  assignmentDetails: {
    fontSize: 14,
    color: "#666",
  },
});
