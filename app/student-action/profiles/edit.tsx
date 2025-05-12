import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function EditProfileScreen() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);

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
        setAvatar(data.user.image);
      } catch (error) {
        console.error("Lỗi lấy profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setAvatar(uri);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("fullName", user.fullName);
      formData.append("email", user.email);
      formData.append("phone", user.phone || "");

      if (avatar && !avatar.startsWith("http")) {
        const filename = avatar.split("/").pop();
        const fileType = filename?.split(".").pop();
        formData.append("image", {
          uri: avatar,
          name: filename,
          type: `image/${fileType}`,
        } as any);
      }

      const res = await fetch("https://your-api.com/api/update-profile", {
        method: "PUT",
        headers: {
          Authorization: "Bearer your_token_here",
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (res.ok) {
        Alert.alert("Thành công", "Cập nhật hồ sơ thành công.");
      } else {
        Alert.alert("Lỗi", "Không thể cập nhật hồ sơ.");
      }
    } catch (error) {
      console.error("Lỗi khi lưu:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi.");
    } finally {
      setSubmitting(false);
    }
  };

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
        <Text>Không tìm thấy người dùng.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={handlePickImage}>
        <Image
          source={{ uri: avatar || "https://via.placeholder.com/150" }}
          style={styles.avatar}
        />
        <Text style={styles.changeText}>Đổi ảnh</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Họ và tên"
        value={user.fullName}
        onChangeText={(text) => setUser({ ...user, fullName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={user.email}
        onChangeText={(text) => setUser({ ...user, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        value={user.phone || ""}
        onChangeText={(text) => setUser({ ...user, phone: text })}
      />

      <Button
        title={submitting ? "Đang lưu..." : "Lưu thay đổi"}
        onPress={handleSave}
        disabled={submitting}
      />
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
    marginBottom: 8,
    backgroundColor: "#ccc",
  },
  changeText: {
    textAlign: "center",
    color: "#007bff",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },
});
