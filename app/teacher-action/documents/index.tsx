// app/(teacher)/class/[classId]/document/index.tsx
import { teacherApi } from "@/controller/teacher/axios";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";

export default function DocumentListScreen() {
  const { classId } = useLocalSearchParams<{ classId: string }>();
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const res = await teacherApi.getDocumentsByClassId({ classId });
      setDocuments(res.data || []);
    } catch (error) {
      console.error("Error fetching documents:", error);
      Alert.alert("Lỗi", "Không thể tải tài liệu.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (documentId: string) => {
    Alert.alert("Xác nhận", "Bạn có chắc muốn xoá tài liệu này?", [
      { text: "Huỷ" },
      {
        text: "Xoá",
        style: "destructive",
        onPress: async () => {
          try {
            await teacherApi.deleteDocument({ documentId });
            fetchDocuments();
          } catch (err) {
            console.error("Delete failed:", err);
            Alert.alert("Lỗi", "Xoá tài liệu thất bại.");
          }
        },
      },
    ]);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 20 }} />;

  if (documents.length === 0)
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Không có tài liệu nào.</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={documents}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text numberOfLines={1} style={styles.title}>
              {item.name}
            </Text>
            <TouchableOpacity onPress={() => handleDelete(item._id)}>
              <Text style={styles.delete}>Xoá</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: { flex: 1, fontWeight: "500" },
  delete: { color: "red", marginLeft: 12 },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#666",
  },
});
