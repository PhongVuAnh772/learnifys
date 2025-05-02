import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function EditClassScreen() {
  const { id } = useLocalSearchParams(); // lấy id từ URL
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [teacher, setTeacher] = useState("");

  useEffect(() => {
    // Giả lập fetch dữ liệu từ ID lớp học
    setTimeout(() => {
      // Ở đây bạn sẽ gọi API get class by id
      // Ví dụ:
      // const classData = await fetch(`/api/class/${id}`).then(res => res.json())
      // setName(classData.name)
      // setTeacher(classData.teacher)

      setName("Lớp 10A1");
      setTeacher("Nguyễn Văn A");
      setLoading(false);
    }, 500);
  }, [id]);

  const handleUpdate = () => {
    if (!name || !teacher) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    console.log("Cập nhật lớp:", { id, name, teacher });

    // Gửi API PUT/PATCH tại đây
    Alert.alert("Thành công", "Lớp học đã được cập nhật!");
    router.back();
  };

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}>
        Chỉnh sửa lớp học
      </Text>

      <Text>Tên lớp</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="VD: Lớp 10A1"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 10,
          marginBottom: 12,
        }}
      />

      <Text>Giáo viên phụ trách</Text>
      <TextInput
        value={teacher}
        onChangeText={setTeacher}
        placeholder="VD: Nguyễn Văn A"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 10,
          marginBottom: 20,
        }}
      />

      <Button title="Cập nhật lớp học" onPress={handleUpdate} />
    </View>
  );
}
