import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";

export default function RelationshipListScreen() {
  const [relationships, setRelationships] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRelationships = async () => {
    try {
      const res = await fetch(
        "https://your-api.com/api/get-list-data-relationship-account",
        {
          headers: {
            Authorization: "Bearer your_token_here",
          },
        }
      );
      const data = await res.json();
      setRelationships(data.relationships || []);
    } catch (error) {
      Alert.alert("Lỗi", "Không thể tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRelationships();
  }, []);

  const handleDelete = async (relationshipId: string) => {
    Alert.alert("Xác nhận", "Bạn có chắc muốn xóa mối quan hệ này?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Xóa",
        onPress: async () => {
          try {
            const res = await fetch(
              "https://your-api.com/api/delete-one-relationship-by-relationshipId",
              {
                method: "DELETE",
                headers: {
                  Authorization: "Bearer your_token_here",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ relationshipId }),
              }
            );

            if (res.ok) {
              setRelationships((prev) =>
                prev.filter((r: any) => r.id !== relationshipId)
              );
              Alert.alert("Thành công", "Đã xóa mối quan hệ.");
            } else {
              throw new Error();
            }
          } catch (err) {
            Alert.alert("Lỗi", "Không thể xóa mối quan hệ.");
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View>
        <Text style={styles.name}>{item.studentFullName}</Text>
        <Text style={styles.email}>{item.studentEmail}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Text style={styles.deleteBtn}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (relationships.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Không có mối quan hệ nào.</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={relationships}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  deleteBtn: {
    color: "red",
    fontWeight: "bold",
  },
});
