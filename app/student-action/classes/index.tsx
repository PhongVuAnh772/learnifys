import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import axiosInstance from "@/controller/admin/student/axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const StudentClassListScreen = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchClassList = async () => {
    try {
      const res = await axiosInstance.get("/get-list-class");

      if (res.data.result) {
        setClasses(res.data.data);
      } else {
        Alert.alert("Lỗi", res.data.messageVI || "Không lấy được lớp học");
      }
    } catch (error) {
      console.error("Error fetching classes:", error.message);
      Alert.alert("Lỗi", "Không thể kết nối đến máy chủ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClassList();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        router.push({
          pathname: "/student-action/classes/[classId]/detail",
          params: { classId: String(item.id) },
        })
      }
    >
      <View style={styles.itemHeader}>
        <Ionicons name="school-outline" size={22} color="#4F46E5" />
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <Text style={styles.desc}>{item.description}</Text>
    </TouchableOpacity>
  );

  const handleRequestJoinClass = () => {
    router.push("/student-action/request-class");
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <LinearGradient
          colors={["#6366F1", "#8B5CF6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.header}
        >
          <Text style={styles.title}>Danh sách lớp học</Text>
        </LinearGradient>

        <FlatList
          data={classes}
          keyExtractor={(item) => item._id || item.id}
          renderItem={renderItem}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="document-text-outline" size={40} color="#999" />
              <Text style={styles.emptyText}>Không có lớp học nào</Text>
              <TouchableOpacity
                onPress={handleRequestJoinClass}
                style={styles.joinButton}
              >
                <Text style={styles.joinButtonText}>
                  Gửi yêu cầu tham gia lớp
                </Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#F9FAFB",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginVertical: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
  },
  item: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
    color: "#1F2937",
  },
  desc: {
    fontSize: 14,
    color: "#4B5563",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "40%",
  },
  emptyText: {
    paddingTop: 15,
    fontWeight: "bold",
    fontSize: 16,
    color: "#6B7280",
  },
  joinButton: {
    marginTop: 20,
    backgroundColor: "#4F46E5",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  joinButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
});

export default StudentClassListScreen;
