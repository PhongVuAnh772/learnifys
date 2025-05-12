import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  Button,
} from "react-native";
import { useRouter } from "expo-router";

export default function ParentHistoryScreen() {
  const router = useRouter();
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Lấy lịch sử hoạt động của học sinh
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://your-api.com/api/history/parent");
        const data = await res.json();

        if (res.ok) {
          setHistory(data.history);
        } else {
          throw new Error(data.message || "Không thể tải lịch sử hoạt động.");
        }
      } catch (error: any) {
        Alert.alert(
          "Lỗi",
          error.message || "Có lỗi xảy ra khi tải lịch sử hoạt động."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleViewDetail = (historyId: string) => {
    router.push(`/parent-action/history/${historyId}`);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lịch sử hoạt động</Text>

      <FlatList
        data={history}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text style={styles.historyTitle}>{item.title}</Text>
            <Text style={styles.historyDetails}>Điểm số: {item.score}</Text>
            <Text style={styles.historyDetails}>Trạng thái: {item.status}</Text>
            <Button
              title="Xem chi tiết"
              onPress={() => handleViewDetail(item.id)}
              color="#007bff"
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  historyItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  historyDetails: {
    fontSize: 14,
    color: "#666",
  },
});
