import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

export default function AssignInvigilatorScreen() {
  const router = useRouter();
  const { examId } = router.query;
  const [invigilators, setInvigilators] = useState<any[]>([]); // Danh sách giám thị
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedInvigilator, setSelectedInvigilator] = useState<string | null>(
    null
  ); // Giám thị đã chọn

  useEffect(() => {
    // Lấy danh sách giám thị từ API
    const fetchInvigilators = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://your-api.com/api/exams/${examId}/invigilators`
        );
        const data = await res.json();

        if (res.ok) {
          setInvigilators(data);
        } else {
          throw new Error(data.message || "Không thể tải danh sách giám thị.");
        }
      } catch (error: any) {
        Alert.alert(
          "Lỗi",
          error.message || "Có lỗi xảy ra khi tải danh sách giám thị."
        );
      } finally {
        setLoading(false);
      }
    };

    if (examId) {
      fetchInvigilators();
    }
  }, [examId]);

  const handleAssignInvigilator = async () => {
    if (!selectedInvigilator) {
      Alert.alert("Lỗi", "Bạn cần chọn một giám thị.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://your-api.com/api/exams/${examId}/assign-invigilator`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            invigilatorId: selectedInvigilator,
          }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        Alert.alert("Thành công", "Giám thị đã được giao cho kỳ thi.");
      } else {
        throw new Error(data.message || "Không thể giao giám thị.");
      }
    } catch (error: any) {
      Alert.alert("Lỗi", error.message || "Có lỗi xảy ra khi giao giám thị.");
    } finally {
      setLoading(false);
    }
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
      <Text style={styles.title}>Giao giám thị cho kỳ thi</Text>
      <Text style={styles.subtitle}>Chọn giám thị từ danh sách dưới đây:</Text>

      {invigilators.length === 0 ? (
        <Text style={styles.noDataText}>Không có giám thị nào để giao.</Text>
      ) : (
        <FlatList
          data={invigilators}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.invigilatorItem}>
              <Button
                title={item.name}
                onPress={() => setSelectedInvigilator(item.id)}
                color={selectedInvigilator === item.id ? "green" : "#007bff"}
              />
            </View>
          )}
        />
      )}

      <Button
        title="Giao giám thị"
        onPress={handleAssignInvigilator}
        disabled={!selectedInvigilator || loading}
        color={selectedInvigilator ? "#007bff" : "#ccc"}
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
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    marginVertical: 10,
  },
  invigilatorItem: {
    marginVertical: 10,
  },
  noDataText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },
});
