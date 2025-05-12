import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
  Button,
} from "react-native";
import axios from "axios";
import { RouteProp, useRoute } from "@react-navigation/native";
import axiosInstance from "@/controller/admin/student/axios";

const GET_API = "/get-content-assignment-of-class-by-id";
const POST_API = "/save-result-exam-or-assignment-to-history";
const TOKEN = "YOUR_JWT_TOKEN"; // Replace with actual token

type ParamList = {
  AssignmentDetail: {
    assignmentId: string;
    classId: string;
  };
};

const AssignmentDetailScreen = () => {
  const route = useRoute<RouteProp<ParamList, "AssignmentDetail">>();
  const { assignmentId, classId } = route.params;

  const [assignment, setAssignment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchAssignment = async () => {
    try {
      const res = await axiosInstance.get(
        `${GET_API}?assignmentId=${assignmentId}`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      if (res.data.result) {
        setAssignment(res.data.data);
      } else {
        Alert.alert(
          "Lỗi",
          res.data.messageVI || "Không lấy được nội dung bài tập"
        );
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
      Alert.alert("Lỗi", "Không thể kết nối đến máy chủ");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAssignment = async () => {
    try {
      setSubmitting(true);

      const res = await axiosInstance.post(
        POST_API,
        {
          type: "ASSIGNMENT", // hoặc "EXAM" tùy hệ thống
          assignmentId,
          classId,
          // có thể thêm content, answer... nếu cần
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      if (res.data.result) {
        Alert.alert("✅ Nộp bài thành công");
      } else {
        Alert.alert("❌ Lỗi", res.data.messageVI || "Không thể nộp bài");
      }
    } catch (error) {
      console.error("Submit error:", error.message);
      Alert.alert("Lỗi", "Không thể kết nối đến máy chủ");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchAssignment();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!assignment) {
    return (
      <View style={styles.center}>
        <Text>Không tìm thấy bài tập</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{assignment.title}</Text>
      <Text style={styles.meta}>Hạn nộp: {assignment.deadline}</Text>
      <Text style={styles.meta}>Môn học: {assignment.subjectName}</Text>
      <Text style={styles.content}>{assignment.content}</Text>

      <View style={{ marginTop: 24 }}>
        <Button
          title={submitting ? "Đang nộp..." : "Nộp bài"}
          onPress={handleSubmitAssignment}
          disabled={submitting}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
  },
  meta: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  content: {
    fontSize: 16,
    marginTop: 12,
    lineHeight: 22,
  },
});

export default AssignmentDetailScreen;
