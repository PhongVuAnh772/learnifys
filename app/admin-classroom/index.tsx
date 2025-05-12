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
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchAllClasses } from "@/controller/admin/student/slice";
import { deleteOneClass } from "@/controller/admin/student/axios";
import { showToast } from "@/helpers/ToastHelpers";

interface ClassItem {
  id: number;
  name: string;
  teacher: string;
}

export default function AdminClassScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadClasses = async () => {
    try {
      setLoading(true);
      setError("");

      const action = await dispatch(fetchAllClasses());

      if (fetchAllClasses.fulfilled.match(action)) {
        const data = action.payload;

        if (Array.isArray(data?.data)) {
          setClasses(data?.data);
        } else {
          console.error("Dữ liệu fetchAllClasses không phải mảng:", data);
          setError("Dữ liệu lớp học không hợp lệ.");
          setClasses([]);
        }
      } else {
        setError("Không thể tải danh sách lớp học.");
      }
    } catch (err) {
      console.error("Lỗi fetchAllClasses:", err);
      setError("Lỗi không xác định.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClasses();
  }, [dispatch]);

  const handleDelete = (id: number) => {
    Alert.alert("Xác nhận", "Bạn có chắc muốn xóa lớp này?", [
      { text: "Hủy" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          try {
            const res = await deleteOneClass(id);
            console.log(res.data, "res");
            if (!res.data.result) {
              showToast({
                msg: "Xóa lớp thất bại, hãy thử lại",
                type: "error",
              });
            }
            setClasses((prev) => prev.filter((cls) => cls.id !== id));
          } catch (err) {
            Alert.alert("Lỗi", "Không thể xóa lớp học.");
            console.error("Lỗi xóa lớp:", err);
          }
        },
      },
    ]);
  };

  const filtered =
    Array.isArray(classes) && classes.length > 0
      ? classes.filter((cls) =>
          cls.name.toLowerCase().includes(search.toLowerCase())
        )
      : [];

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
            Quản lý lớp học
          </Text>
          <TouchableOpacity onPress={() => router.push("/admin-class-create")}>
            <Ionicons name="add-circle-outline" size={30} color="#007AFF" />
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder="Tìm kiếm lớp học..."
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
                Không tìm thấy lớp học nào.
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
                  Giáo viên: {item.teacher}
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
                        pathname: "/admin-class-edit/[id]",
                        params: { id: item.id },
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
      </View>
    </SafeAreaView>
  );
}
