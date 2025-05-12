import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import axiosInstance from "@/controller/admin/student/axios";

const StudentDetail = () => {
  const { id } = useLocalSearchParams();
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axiosInstance.get("/get-all-users");
        const found = res.data.data.find((u: any) => u.id === Number(id));
        setStudent(found);
      } catch (error) {
        console.error("Failed to fetch student detail:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Đang tải...</Text>
      </View>
    );
  }

  if (!student) {
    return (
      <View style={styles.center}>
        <Text>Không tìm thấy học sinh</Text>
      </View>
    );
  }

  const name = `${student.firstName ?? ""} ${student.lastName ?? ""}`.trim();
  const avatar =
    student.image ||
    "https://ui-avatars.com/api/?name=" +
      encodeURIComponent(name || student.email);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 20 }}
    >
      <View style={styles.profileBox}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <Text style={styles.name}>{name || "Không rõ tên"}</Text>
        <Text style={styles.email}>{student.email || "Không có email"}</Text>
        {student.phoneNumber && (
          <Text style={styles.info}>SĐT: {student.phoneNumber}</Text>
        )}
        {student.genderId && (
          <Text style={styles.info}>Giới tính: {student.genderId}</Text>
        )}
        <Text style={styles.info}>ID: {student.id}</Text>
      </View>
    </ScrollView>
  );
};

export default StudentDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 50 : 70,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileBox: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    elevation: 2,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    backgroundColor: "#ccc",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  info: {
    fontSize: 14,
    color: "#333",
    marginTop: 4,
  },
});
