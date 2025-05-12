import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

export default function RelationshipScreen() {
  const router = useRouter();
  const [relationships, setRelationships] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Lấy danh sách mối quan hệ của phụ huynh
    const fetchRelationships = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://your-api.com/api/relationships/parent"
        );
        const data = await res.json();

        if (res.ok) {
          setRelationships(data.relationships);
        } else {
          throw new Error(
            data.message || "Không thể tải danh sách mối quan hệ."
          );
        }
      } catch (error: any) {
        Alert.alert(
          "Lỗi",
          error.message || "Có lỗi xảy ra khi tải danh sách mối quan hệ."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRelationships();
  }, []);

  const handleCreateRelationship = () => {
    // Điều hướng đến màn hình tạo mối quan hệ mới
    router.push("/parent-action/relationships/create");
  };

  const handleDeleteRelationship = async (relationshipId: string) => {
    try {
      const res = await fetch(
        `https://your-api.com/api/relationships/${relationshipId}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        // Xóa thành công, cập nhật lại danh sách mối quan hệ
        setRelationships(
          relationships.filter((rel) => rel.id !== relationshipId)
        );
        Alert.alert("Thông báo", "Mối quan hệ đã được xóa.");
      } else {
        throw new Error("Không thể xóa mối quan hệ.");
      }
    } catch (error: any) {
      Alert.alert("Lỗi", error.message || "Có lỗi xảy ra khi xóa mối quan hệ.");
    }
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
      <Text style={styles.title}>Danh sách mối quan hệ</Text>

      <FlatList
        data={relationships}
        renderItem={({ item }) => (
          <View style={styles.relationshipItem}>
            <Text style={styles.relationshipText}>
              Học sinh: {item.studentName}
            </Text>
            <Text style={styles.relationshipText}>
              Phụ huynh: {item.parentName}
            </Text>
            <Button
              title="Xóa mối quan hệ"
              onPress={() => handleDeleteRelationship(item.id)}
              color="#d9534f"
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      <Button
        title="Tạo mối quan hệ mới"
        onPress={handleCreateRelationship}
        color="#007bff"
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
  relationshipItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  relationshipText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
