import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  Button,
} from "react-native";
import { useRouter } from "expo-router";

export default function ParentIndexScreen() {
  const router = useRouter();
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Lấy danh sách lớp học của học sinh
    const fetchClasses = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://your-api.com/api/classes/parent");
        const data = await res.json();

        if (res.ok) {
          setClasses(data.classes);
        } else {
          throw new Error(data.message || "Không thể tải danh sách lớp học.");
        }
      } catch (error: any) {
        Alert.alert(
          "Lỗi",
          error.message || "Có lỗi xảy ra khi tải danh sách lớp học."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const handleViewClassDetail = (classId: string) => {
    router.push(`/parent-action/classes/${classId}/detail`);
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
      <Text style={styles.title}>Danh sách lớp học</Text>

      <FlatList
        data={classes}
        renderItem={({ item }) => (
          <View style={styles.classItem}>
            <Text style={styles.classTitle}>{item.name}</Text>
            <Text style={styles.classDetails}>
              Giáo viên: {item.teacherName}
            </Text>
            <Button
              title="Xem chi tiết"
              onPress={() => handleViewClassDetail(item.id)}
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
  classItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  classTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  classDetails: {
    fontSize: 14,
    color: "#666",
  },
});
