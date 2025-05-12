import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import axiosInstance from "@/controller/admin/student/axios";

interface DocumentsTabProps {
  classId: string;
}

const DocumentsTab: React.FC<DocumentsTabProps> = ({ classId }) => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<any>(null);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `/get-list-documents-of-class?classId=${classId}`
      );
      setDocuments(res.data.data || []);
    } catch (error) {
      console.error("Lỗi API:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
      if (result.assets && result.assets.length > 0) {
        setFile(result.assets[0]);
      }
    } catch (error) {
      console.error("File picker error:", error);
    }
  };

  const handleUpload = async () => {
    if (!title.trim() || !file) {
      Alert.alert("Lỗi", "Vui lòng nhập tiêu đề và chọn tệp tài liệu");
      return;
    }

    const formData = new FormData();
    formData.append("files", {
      uri: file.uri,
      type: file.mimeType || "application/octet-stream",
      name: file.name || "document",
    } as any);

    try {
      const res = await axiosInstance.post(
        `/post-new-documents-by-teacher?classId=${classId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data?.result) {
        fetchDocuments();
        setModalVisible(false);
        setTitle("");
        setDescription("");
        setFile(null);
      } else {
        Alert.alert("Lỗi", res.data.messageVI || "Không thể thêm tài liệu");
      }
    } catch (err) {
      Alert.alert("Lỗi", "Không thể kết nối đến máy chủ");
    }
  };

  const handleDelete = async (id: string, file: string) => {
    Alert.alert("Xác nhận", "Bạn có chắc muốn xoá tài liệu này?", [
      { text: "Huỷ" },
      {
        text: "Xoá",
        onPress: async () => {
          try {
            const res = await axiosInstance.delete(
              `/delete-one-documents-by-documentId?documentId=${id}&file=${file}`
            );
            if (res.data?.result) {
              fetchDocuments();
            } else {
              Alert.alert(
                "Lỗi",
                res.data.messageVI || "Không thể xoá tài liệu"
              );
            }
          } catch (err) {
            Alert.alert("Lỗi", "Không thể kết nối đến máy chủ");
          }
        },
      },
    ]);
  };

  useEffect(() => {
    fetchDocuments();
  }, [classId]);

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title || "Tài liệu"}</Text>
      <Text style={styles.desc}>{item.description || "Không có mô tả"}</Text>
      <TouchableOpacity
        onPress={() => handleDelete(item.id, item.file)}
        style={[styles.button, { backgroundColor: "red" }]}
      >
        <Text style={styles.buttonText}>Xoá</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
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

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.sheetTitle}>Thêm tài liệu</Text>
            <TextInput
              style={styles.input}
              placeholder="Tiêu đề tài liệu"
              value={title}
              onChangeText={setTitle}
            />
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#007AFF" }]}
              onPress={handlePickFile}
            >
              <Text style={styles.buttonText}>
                {file ? file.name : "Chọn tài liệu"}
              </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", gap: 10, marginTop: 12 }}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#007AFF", flex: 1 }]}
                onPress={handleUpload}
              >
                <Text style={styles.buttonText}>Lưu</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#ccc", flex: 1 }]}
                onPress={() => {
                  setModalVisible(false);
                  setTitle("");
                  setDescription("");
                  setFile(null);
                }}
              >
                <Text style={[styles.buttonText, { color: "#333" }]}>Huỷ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
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
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: "#007AFF",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  fabText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    gap: 12,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
});
