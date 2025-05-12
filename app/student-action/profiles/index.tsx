import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";

export default function ProfileScreen() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("https://your-api.com/api/login-with-token", {
          method: "POST",
          headers: {
            Authorization: "Bearer your_token_here", // Thay bằng token thực
          },
        });
        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.error("Lỗi lấy thông tin user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>Không tìm thấy thông tin người dùng.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: user.image || "https://via.placeholder.com/150" }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{user.fullName}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.role}>Vai trò: {user.role}</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin thêm</Text>
        <Text>Số điện thoại: {user.phone || "Chưa cập nhật"}</Text>
        <Text>Ngày sinh: {user.birthDate || "Chưa cập nhật"}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    backgroundColor: "#ccc",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 12,
  },
  role: {
    fontSize: 16,
    color: "#009688",
    marginBottom: 20,
  },
  section: {
    width: "100%",
    marginTop: 20,
    padding: 16,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
});
