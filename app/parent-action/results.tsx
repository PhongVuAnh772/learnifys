import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

export default function ResultsScreen() {
  const router = useRouter();
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Lấy danh sách kết quả thi của học sinh
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://your-api.com/api/results");
        const data = await res.json();

        if (res.ok) {
          setResults(data.results);
        } else {
          throw new Error(data.message || "Không thể tải kết quả.");
        }
      } catch (error: any) {
        Alert.alert("Lỗi", error.message || "Có lỗi xảy ra khi tải kết quả.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const handleViewDetails = (examId: string) => {
    // Điều hướng đến trang chi tiết kết quả của học sinh trong bài thi
    router.push(`/parent-action/results/${examId}`);
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
      <Text style={styles.title}>Kết quả thi</Text>

      <FlatList
        data={results}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text style={styles.resultText}>Bài thi: {item.examName}</Text>
            <Text style={styles.resultText}>Điểm số: {item.score}</Text>
            <Button
              title="Xem chi tiết"
              onPress={() => handleViewDetails(item.examId)}
              color="#007bff"
            />
          </View>
        )}
        keyExtractor={(item) => item.examId}
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
  resultItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
