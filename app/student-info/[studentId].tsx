import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import axiosInstance from "@/controller/admin/student/axios";
import ReportHeader from "@/screens/tabs/report/Header/ReportHeader";

const StudentLearningDetail = () => {
  const { studentId } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [studentInfo, setStudentInfo] = useState<any>(null);
  const [exams, setExams] = useState<any[]>([]);
  const [missions, setMissions] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!studentId) return;
      try {
        const classRes = await axiosInstance.get("/get-infor-class", {
          params: { classId: studentId },
        });

        const examRes = await axiosInstance.get("/get-list-exams-of-class", {
          params: { classId: studentId },
        });

        const missionRes = await axiosInstance.get("/get-mission-of-student", {
          params: { studentId },
        });

        setStudentInfo(classRes.data?.data);
        setExams(examRes.data?.data || []);
        setMissions(missionRes.data?.data || []);
      } catch (err) {
        console.error("Error fetching student info", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId]);

  return (
    <View style={{ flex: 1, backgroundColor: "#f1f3f4" }}>
      <Stack.Screen options={{ title: "Chi tiết học sinh" }} />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {loading ? (
          <Text>Đang tải dữ liệu...</Text>
        ) : (
          <>
            <View style={styles.card}>
              <Text style={styles.title}>Lớp học</Text>
              <Text>{studentInfo?.name || "Không có thông tin lớp học"}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.title}>Danh sách bài thi</Text>
              {exams.length > 0 ? (
                exams.map((exam) => (
                  <Text key={exam.id}>
                    📘 {exam.name} - Điểm:{" "}
                    {exam.point >= 0 ? exam.point : "Chưa có"}
                  </Text>
                ))
              ) : (
                <Text>Không có bài thi</Text>
              )}
            </View>

            <View style={styles.card}>
              <Text style={styles.title}>Danh sách nhiệm vụ</Text>
              {missions.length > 0 ? (
                missions.map((mission, index) => (
                  <Text key={index}>
                    📝 {mission.name || "Nhiệm vụ không tên"}
                  </Text>
                ))
              ) : (
                <Text>Không có nhiệm vụ</Text>
              )}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default StudentLearningDetail;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
});
