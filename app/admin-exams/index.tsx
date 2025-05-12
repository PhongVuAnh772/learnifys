import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import axiosInstance from "@/controller/admin/student/axios";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "@/auth/ctx";

interface ExamItem {
  id: number;
  name: string;
  description: string;
  dateFinish: string;
  timeLimit: string;
  classId: number;
  teacherId: number;
  statusId: string;
  typeId: string;
  dateUpload: string;
  createdAt: string;
}

export default function AdminExamScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [exams, setExams] = useState<ExamItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExams = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/get-all-exam");
      if (response.data?.result) {
        setExams(response.data.data);
        setError(null);
      } else {
        setError("Không thể lấy danh sách bài thi");
      }
    } catch (err: any) {
      setError(err.message || "Lỗi khi tải bài thi");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = (id: number) => {
    Alert.alert("Xác nhận", "Bạn có chắc muốn xóa bài thi này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          try {
            await axiosInstance.delete("/delete-one-exam", {
              params: { examId: id },
            });
            setExams((prev) => prev.filter((exam) => exam.id !== id));
            Alert.alert("Đã xóa bài thi");
          } catch (err: any) {
            Alert.alert("Lỗi", err.message || "Không thể xóa bài thi");
          }
        },
      },
    ]);
  };
  useFocusEffect(
    useCallback(() => {
      fetchExams();
    }, [fetchExams])
  );

  const filtered = exams.filter((exam) =>
    exam.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16, backgroundColor: "#fff" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            Quản lý bài thi
          </Text>
          <TouchableOpacity onPress={() => router.push("/admin-exam-create")}>
            <Ionicons name="add-circle-outline" size={30} color="#007AFF" />
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder="Tìm kiếm bài thi..."
          value={search}
          onChangeText={setSearch}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 10,
            marginBottom: 16,
          }}
        />

        {loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 50 }} />
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={
              <Text style={{ textAlign: "center", marginTop: 20 }}>
                Không tìm thấy bài thi nào.
              </Text>
            }
            renderItem={({ item }) => (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#eee",
                  padding: 16,
                  borderRadius: 12,
                  marginBottom: 12,
                  backgroundColor: "#f9f9f9",
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {item.name}
                </Text>
                <Text style={{ color: "#666", marginTop: 4 }}>
                  Mô tả: {item.description}
                </Text>
                <Text style={{ color: "#666", marginTop: 4 }}>
                  Ngày kết thúc: {item.dateFinish}
                </Text>
                <Text style={{ color: "#666", marginTop: 4 }}>
                  Thời gian làm bài: {item.timeLimit} phút
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    gap: 16,
                    marginTop: 12,
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/admin-exam-edit/[id]",
                        params: { id: item.id.toString() },
                      })
                    }
                  >
                    <Ionicons name="create-outline" size={22} color="#007AFF" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Ionicons name="trash-outline" size={22} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}

        {error && (
          <Text style={{ color: "red", textAlign: "center", marginTop: 12 }}>
            {error}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}
