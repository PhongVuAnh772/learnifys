// app/(teacher)/class/[classId]/index.tsx
import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { teacherApi } from "@/controller/teacher/axios";

export default function ClassDetailScreen() {
  const { classId } = useLocalSearchParams<{ classId: string }>();
  const [loading, setLoading] = useState(true);
  const [classInfo, setClassInfo] = useState<any>(null);

  useEffect(() => {
    if (!classId) return;
    const fetchClassDetail = async () => {
      try {
        const res = await teacherApi.getClassDetail({ classId });
        setClassInfo(res.data?.data);
      } catch (err) {
        console.error("Error fetching class detail", err);
      } finally {
        setLoading(false);
      }
    };
    fetchClassDetail();
  }, [classId]);

  if (loading) return <ActivityIndicator />;

  if (!classInfo) return <Text>Không tìm thấy lớp học</Text>;

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{classInfo.name}</Text>
      <Text>Mô tả: {classInfo.description}</Text>

      <Text style={{ marginTop: 16, fontWeight: "bold" }}>Học sinh:</Text>
      <FlatList
        data={classInfo.students || []}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <Text>- {item.name}</Text>}
      />

      <Text style={{ marginTop: 16, fontWeight: "bold" }}>Tài liệu:</Text>
      <FlatList
        data={classInfo.documents || []}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <Text>- {item.name}</Text>}
      />

      <Text style={{ marginTop: 16, fontWeight: "bold" }}>Bài kiểm tra:</Text>
      <FlatList
        data={classInfo.exams || []}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <Text>- {item.title}</Text>}
      />
    </ScrollView>
  );
}
