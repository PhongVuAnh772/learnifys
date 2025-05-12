// app/(teacher)/class/[classId]/add-student.tsx
import { teacherApi } from "@/controller/teacher/axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

export default function AddStudentScreen() {
  const { classId } = useLocalSearchParams<{ classId: string }>();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddStudent = async () => {
    if (!name || !email || !studentId) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    setLoading(true);

    try {
      await teacherApi.addStudentToClass({
        classId,
        name,
        email,
        studentId,
      });

      Alert.alert("Thành công", "Đã thêm học sinh vào lớp.");
      router.back();
    } catch (err) {
      console.error("Add student failed", err);
      Alert.alert("Lỗi", "Không thể thêm học sinh.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Tên học sinh</Text>
      <TextInput
        placeholder="Nguyễn Văn A"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="email@example.com"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Mã học sinh</Text>
      <TextInput
        placeholder="ST123456"
        value={studentId}
        onChangeText={setStudentId}
        style={styles.input}
      />

      <View style={{ marginTop: 20 }}>
        <Button
          title={loading ? "Đang thêm..." : "Thêm học sinh"}
          onPress={handleAddStudent}
          disabled={loading}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
  },
  label: {
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
  },
});
