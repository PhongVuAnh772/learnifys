import { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { teacherApi } from "@/controller/teacher/axios";

const CreateVideoRoomScreen = () => {
  const [roomName, setRoomName] = useState("");
  const router = useRouter();

  // Hàm tạo phòng video
  const handleCreateRoom = async () => {
    if (!roomName) {
      Alert.alert("Lỗi", "Vui lòng nhập tên phòng video");
      return;
    }

    try {
      const newRoom = { name: roomName };
      // Gửi yêu cầu tạo phòng video mới
      await teacherApi.createVideoRoom(newRoom);
      Alert.alert("Thành công", "Phòng video đã được tạo");
      router.push("/teacher-action/video-room"); // Quay lại danh sách phòng video
    } catch (error) {
      console.error("Lỗi khi tạo phòng video:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi tạo phòng video");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tạo Phòng Video Mới</Text>
      <TextInput
        style={styles.input}
        value={roomName}
        onChangeText={setRoomName}
        placeholder="Nhập tên phòng video"
      />
      <Button title="Tạo Phòng Video" onPress={handleCreateRoom} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default CreateVideoRoomScreen;
