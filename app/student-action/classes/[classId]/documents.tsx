import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function ClassDocumentsScreen() {
  const { classId } = useLocalSearchParams();
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await fetch(
          `https://your-api.com/api/get-list-documents-of-class?classId=${classId}`,
          {
            headers: {
              Authorization: "Bearer your_token", // thay bằng token thật nếu cần
            },
          }
        );
        const data = await res.json();
        setDocuments(data || []);
      } catch (error) {
        console.error("Lỗi lấy tài liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [classId]);

  const handleOpenLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    } else {
      alert("Không thể mở liên kết");
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (documents.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Không có tài liệu nào.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={documents}
      keyExtractor={(item) => item.documentId}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.documentItem}
          onPress={() => handleOpenLink(item.fileUrl)}
        >
          <Text style={styles.title}>{item.title || "Tài liệu không tên"}</Text>
          <Text style={styles.subtitle}>
            {item.description || "Không có mô tả"}
          </Text>
        </TouchableOpacity>
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
  documentItem: {
    padding: 16,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});
