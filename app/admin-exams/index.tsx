import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { deleteOneExam, fetchAllExams } from "@/controller/admin/exams/slice";

interface ExamItem {
  id: number;
  name: string;
  subject: string;
  date: string;
}

export default function AdminExamScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [search, setSearch] = useState("");

  const { exams, status, error } = useSelector(
    (state: RootState) => state.admin
  );

  useEffect(() => {
    dispatch(fetchAllExams());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    Alert.alert("Xác nhận", "Bạn có chắc muốn xóa bài thi này?", [
      { text: "Hủy" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          dispatch(deleteOneExam(id));
        },
      },
    ]);
  };

  const filtered = exams.filter((exam: ExamItem) =>
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

        {status === "loading" ? (
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
                  Môn học: {item.subject}
                </Text>
                <Text style={{ color: "#666", marginTop: 4 }}>
                  Ngày thi: {item.date}
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
                    onPress={() => router.push(`/admin-exam-edit/${item.id}`)}
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
