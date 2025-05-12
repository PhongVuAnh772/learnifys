// app/(teacher)/class/[classId]/document/create.tsx
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import mime from "mime";
import { teacherApi } from "@/controller/teacher/axios";

export default function UploadDocumentScreen() {
  const { classId } = useLocalSearchParams<{ classId: string }>();
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  const pickDocuments = async () => {
    const result = await DocumentPicker.getDocumentAsync({ multiple: true });

    if (result.assets) {
      const validFiles = result.assets.map((file) => ({
        uri: file.uri,
        name: file.name,
        type: mime.getType(file.uri) || "application/octet-stream",
      }));
      setSelectedFiles(validFiles);
    }
  };

  const handleUpload = async () => {
    if (!selectedFiles.length) {
      Alert.alert("Thông báo", "Vui lòng chọn ít nhất một tệp.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", {
        uri: file.uri,
        name: file.name,
        type: file.type,
      } as any);
    });
    formData.append("classId", classId);

    try {
      setUploading(true);
      await teacherApi.uploadDocuments(formData);
      Alert.alert("Thành công", "Tải tài liệu thành công.");
      router.back();
    } catch (error) {
      console.error("Upload failed:", error);
      Alert.alert("Lỗi", "Tải tài liệu thất bại.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Chọn tài liệu" onPress={pickDocuments} />
      {selectedFiles.map((file, index) => (
        <Text key={index} style={styles.fileName}>
          {file.name}
        </Text>
      ))}
      <View style={{ marginTop: 20 }}>
        {uploading ? (
          <ActivityIndicator />
        ) : (
          <Button title="Tải lên" onPress={handleUpload} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  fileName: { marginTop: 10, color: "#333" },
});
