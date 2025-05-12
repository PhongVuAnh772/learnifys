import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

export default function RelationshipDetailScreen({
  params,
}: {
  params: { id: string };
}) {
  const [relationship, setRelationship] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchRelationshipDetail = async () => {
      try {
        const res = await fetch(
          `https://your-api.com/api/relationships/${params.id}`,
          {
            headers: {
              Authorization: "Bearer your_token_here",
            },
          }
        );
        const data = await res.json();

        if (res.ok) {
          setRelationship(data);
        } else {
          throw new Error(
            data.message || "Không thể lấy thông tin mối quan hệ."
          );
        }
      } catch (err: any) {
        Alert.alert("Lỗi", err.message || "Không thể kết nối với máy chủ.");
      } finally {
        setLoading(false);
      }
    };

    fetchRelationshipDetail();
  }, [params.id]);

  const handleDeleteRelationship = async () => {
    setDeleting(true);
    try {
      const res = await fetch(
        `https://your-api.com/api/relationships/${params.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer your_token_here",
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        Alert.alert("Thành công", "Mối quan hệ đã được xóa.", [
          { text: "OK", onPress: () => router.back() },
        ]);
      } else {
        throw new Error(data.message || "Không thể xóa mối quan hệ.");
      }
    } catch (err: any) {
      Alert.alert("Lỗi", err.message || "Có lỗi xảy ra khi xóa mối quan hệ.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (!relationship) {
    return (
      <View style={styles.center}>
        <Text>Không tìm thấy thông tin mối quan hệ.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên học sinh</Text>
      <Text style={styles.value}>{relationship.studentName}</Text>

      <Text style={styles.label}>Email học sinh</Text>
      <Text style={styles.value}>{relationship.studentEmail}</Text>

      <Text style={styles.label}>Trạng thái</Text>
      <Text style={styles.value}>
        {relationship.status ? "Đang kết nối" : "Đã hủy kết nối"}
      </Text>

      <TouchableOpacity
        style={[styles.button, deleting && { opacity: 0.6 }]}
        onPress={handleDeleteRelationship}
        disabled={deleting}
      >
        <Text style={styles.buttonText}>
          {deleting ? "Đang xóa..." : "Xóa mối quan hệ"}
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  value: {
    fontSize: 14,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#f44336",
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
