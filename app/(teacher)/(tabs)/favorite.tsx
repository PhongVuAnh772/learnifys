import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import axiosInstance from "@/controller/admin/student/axios";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import ReportHeader from "@/screens/tabs/report/Header/ReportHeader";

const TeacherClassListScreen = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchClasses = async () => {
    try {
      const res = await axiosInstance.get("/get-list-classes-by-teacher");
      if (res.data?.result) {
        setClasses(res.data.data || []);
      } else {
        Alert.alert(
          "Lỗi",
          res.data.messageVI || "Không lấy được danh sách lớp"
        );
      }
    } catch (err) {
      Alert.alert("Lỗi", "Không thể kết nối đến server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/teacher-action/class/[classId]/edit",
          params: { classId: item.id.toString() },
        })
      }
    >
      <View style={styles.cardLeft}>
        <Ionicons name="school-outline" size={28} color="#007AFF" />
      </View>
      <View style={styles.cardRight}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.desc} numberOfLines={2}>
          {item.description || "Không có mô tả"}
        </Text>
        <Text style={styles.date}>📅 Ngày tạo: {item.dateCreate}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f1f3f4" }}>
      <Stack.Screen
        options={{
          header: () => <ReportHeader onCategoryChanged={() => {}} />,
        }}
      />
      <FlatList
        data={classes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id?.toString()}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardLeft: {
    marginRight: 12,
    justifyContent: "center",
  },
  cardRight: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 4,
  },
  desc: {
    fontSize: 14,
    color: "#444",
    marginBottom: 4,
  },
  date: {
    fontSize: 13,
    color: "#888",
  },
});

export default TeacherClassListScreen;
