import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

export default function CreateRelationshipScreen() {
  const [studentEmail, setStudentEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!studentEmail.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập email học sinh.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        "https://your-api.com/api/create-relationship-account",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer your_token_here",
          },
          body: JSON.stringify({ studentEmail }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        Alert.alert("Thành công", "Đã tạo mối quan hệ.", [
          { text: "OK", onPress: () => router.back() },
        ]);
      } else {
        throw new Error(data.message || "Đã xảy ra lỗi");
      }
    } catch (err: any) {
      Alert.alert("Lỗi", err.message || "Không thể tạo mối quan hệ.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email học sinh</Text>
      <TextInput
        style={styles.input}
        placeholder="example@student.com"
        value={studentEmail}
        onChangeText={setStudentEmail}
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Đang gửi..." : "Tạo mối quan hệ"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 6,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
