import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { teacherApi } from "@/controller/teacher/axios";

export default function CreateClassScreen() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const router = useRouter();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (image) {
      formData.append("image", {
        uri: image.uri,
        name: image.fileName || "photo.jpg",
        type: image.type || "image/jpeg",
      });
    }

    try {
      await teacherApi.createClass(formData);
      Alert.alert("Thành công", "Tạo lớp thành công");
      router.back();
    } catch (error) {
      console.error("Create class error:", error);
      Alert.alert("Lỗi", "Không thể tạo lớp");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Tên lớp"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Mô tả lớp học"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Button title="Chọn ảnh" onPress={pickImage} />
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 100, height: 100, marginVertical: 12 }}
        />
      )}
      <Button title="Tạo lớp" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
});
