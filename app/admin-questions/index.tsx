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
import {
  deleteOneQuestion,
  fetchAllQuestions,
} from "@/controller/admin/question/slice";

interface OptionItem {
  option: string;
  isCorrect: boolean;
}

interface QuestionItem {
  id: number;
  questionPrompt: string;
  answer: string;
  options: string[];
}

interface Question {
  id: number;
  questionPrompt: string;
  answer: string;
  options: string[]; // array of JSON strings
}

export default function AdminQuestionScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const { questions, status, error } = useSelector(
    (state: RootState) => state.adminQuestion
  );

  useEffect(() => {
    dispatch(fetchAllQuestions());
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    Alert.alert("Xác nhận", "Bạn có chắc muốn xóa câu hỏi này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          try {
            await dispatch(deleteOneQuestion(id)).unwrap();
            Alert.alert("Thành công", "Đã xóa câu hỏi.");
          } catch (err: any) {
            Alert.alert("Lỗi", err.message || "Không thể xóa câu hỏi.");
          }
        },
      },
    ]);
  };

  const filtered: any[] =
    questions?.filter((question: any) =>
      question.questionPrompt.toLowerCase().includes(search.toLowerCase())
    ) || [];

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
            Quản lý câu hỏi
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/admin-question-create")}
          >
            <Ionicons name="add-circle-outline" size={30} color="#007AFF" />
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder="Tìm kiếm câu hỏi..."
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
                Không tìm thấy câu hỏi nào.
              </Text>
            }
            renderItem={({ item }) => {
              const parsedOptions: OptionItem[] = item.options.map((optStr) =>
                JSON.parse(optStr)
              );
              return (
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
                    {item.questionPrompt}
                  </Text>

                  {parsedOptions.map((opt, idx) => (
                    <Text
                      key={idx}
                      style={{
                        marginTop: 4,
                        color: opt.isCorrect ? "green" : "#333",
                        fontWeight: opt.isCorrect ? "bold" : "normal",
                      }}
                    >
                      - {opt.option} {opt.isCorrect ? "(Đáp án đúng)" : ""}
                    </Text>
                  ))}

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
                          pathname: "/admin-question-edit/[id]",
                          params: { id: item.id.toString() },
                        })
                      }
                    >
                      <Ionicons
                        name="create-outline"
                        size={22}
                        color="#007AFF"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(item.id)}>
                      <Ionicons name="trash-outline" size={22} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
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
