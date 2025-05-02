import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "expo-router";
import { fetchAllClasses } from "@/controller/admin/student/slice";
import axios from "axios";

const createOneClass = async (data: { name: string; teacher: string }) => {
  const res = await axios.post("/api/classes", data);
  return res.data;
};

export default function AdminClassCreateScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [name, setName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateClass = async () => {
    if (!name || !teacher) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin lớp và giáo viên.");
      return;
    }

    setLoading(true);
    try {
      await createOneClass({ name, teacher });
      await dispatch(fetchAllClasses());
      Alert.alert("Thành công", "Đã tạo lớp học mới.");
      router.back();
    } catch (err) {
      Alert.alert("Lỗi", "Không thể tạo lớp. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
          Tạo lớp học mới
        </Text>

        <TextInput
          placeholder="Tên lớp học"
          value={name}
          onChangeText={setName}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 12,
            marginBottom: 16,
          }}
        />

        <TextInput
          placeholder="Tên giáo viên"
          value={teacher}
          onChangeText={setTeacher}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 12,
            marginBottom: 24,
          }}
        />

        <TouchableOpacity
          onPress={handleCreateClass}
          disabled={loading}
          style={{
            backgroundColor: "#007AFF",
            padding: 14,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Tạo lớp</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
