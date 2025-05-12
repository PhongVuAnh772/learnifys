import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import axiosInstance from "@/controller/admin/student/axios";

interface MembersTabProps {
  classId: string;
}

const MembersTab: React.FC<MembersTabProps> = ({ classId }) => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const res = await axiosInstance.get(
        `/get-list-student-of-class?classId=${classId}`
      );
      setStudents(res.data?.data || []);
    } catch (err) {
      console.error("Lỗi khi tải danh sách học sinh:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [classId]);

  const renderItem = ({ item }: { item: any }) => {
    const name = `${item.firstName ?? ""} ${item.lastName ?? ""}`.trim();
    const avatar =
      item.image ||
      "https://ui-avatars.com/api/?name=" + encodeURIComponent(name);

    return (
      <View style={styles.card}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.name}>{name || "Không rõ tên"}</Text>
          <Text style={styles.email}>{item.email || "Không có email"}</Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={students}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 16 }}
      ListEmptyComponent={
        <Text style={{ textAlign: "center" }}>Không có học sinh nào.</Text>
      }
    />
  );
};

export default MembersTab;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    elevation: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#ccc",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  email: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
  },
});
