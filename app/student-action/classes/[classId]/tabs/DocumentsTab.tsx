// components/DocumentsTab.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import axiosInstance from "@/controller/admin/student/axios";

interface DocumentsTabProps {
  classId: string;
}

const DocumentsTab: React.FC<DocumentsTabProps> = ({ classId }) => {
  const [documents, setDocuments] = useState<any[]>([]);
  console.log(classId, "classId");

  const fetchDocuments = async () => {
    try {
      const res = await axiosInstance.get(
        `/get-list-documents-of-class?classId=${classId}`
      );
      console.log(res.data, "res");
      setDocuments(res.data.data || []);
    } catch (error) {
      console.error("Lỗi API:", error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [classId]);

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title || "Tài liệu"}</Text>
      <Text style={styles.desc}>{item.description}</Text>
      <TouchableOpacity
        onPress={() => Linking.openURL(item.fileUrl)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Xem tài liệu</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={documents}
      renderItem={renderItem}
      keyExtractor={(item) => item.id?.toString()}
      contentContainerStyle={{ padding: 16 }}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📂</Text>
          <Text style={styles.emptyText}>
            Không có tài liệu nào trong lớp này
          </Text>
        </View>
      }
    />
  );
};

export default DocumentsTab;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  desc: {
    marginVertical: 8,
    fontSize: 14,
    color: "#444",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
