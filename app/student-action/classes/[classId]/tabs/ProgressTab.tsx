import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import axiosInstance from "@/controller/admin/student/axios";
import CustomProgressBar from "@/components/ProgressBar";

interface ProgressTabProps {
  classId: string;
}

const ProgressTab: React.FC<ProgressTabProps> = ({ classId }) => {
  const [progressData, setProgressData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProgress = async () => {
    try {
      const res = await axiosInstance.get(`/get-mission-of-student`);
      setProgressData(res.data?.data || []);
    } catch (err) {
      console.error("Lỗi khi tải tiến độ học tập:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  const renderItem = ({ item }: { item: any }) => {
    const percent = item.completionRate || 0;
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.title || "Nhiệm vụ"}</Text>
        <Text style={styles.detail}>
          {item.completed} / {item.total} đã hoàn thành
        </Text>
        <CustomProgressBar progress={0.65} />
        <Text style={styles.percent}>{percent}%</Text>
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
      data={progressData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 16 }}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📂</Text>
          <Text style={styles.emptyText}>Không có dữ liệu tiến độ nào</Text>
        </View>
      }
    />
  );
};

export default ProgressTab;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  detail: {
    fontSize: 13,
    color: "#555",
    marginBottom: 6,
  },
  progress: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#eee",
    marginBottom: 4,
  },
  percent: {
    textAlign: "right",
    fontSize: 12,
    color: "#444",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
