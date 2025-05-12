import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import axiosInstance from "@/controller/admin/student/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

const StudentLearningDetail = () => {
  const [loading, setLoading] = useState(true);
  const [studentInfo, setStudentInfo] = useState<any>(null);
  const [exams, setExams] = useState<any[]>([]);
  const [missions, setMissions] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await AsyncStorage.getItem("userData");
        const parsed = JSON.parse(user || "{}");
        const parentsId = parsed.data?.id;

        const res = await axiosInstance.get(
          "/get-list-student-data-of-parents",
          {
            params: { parentsId },
          }
        );

        const student = res.data?.data?.[0]?.studentOfParentData;
        const studentId = res.data?.data?.[0]?.studentId;

        if (!studentId) return;

        const profileRes = student;
        const classRes = await axiosInstance.get(
          "/get-list-class-of-student-by-parentsId",
          {
            params: { parentsId },
          }
        );

        const examRes = await axiosInstance.get("/get-list-exams-of-class", {
          params: { classId: classRes.data?.data?.id },
        });

        const missionRes = await axiosInstance.get("/get-mission-of-student", {
          params: { studentId },
        });

        setProfile(profileRes);
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
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#f1f3f4" }}>
        <Stack.Screen options={{ title: "Chi tiết học sinh" }} />
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {loading ? (
            <Text>Đang tải dữ liệu...</Text>
          ) : (
            <>
              <View style={styles.card}>
                <Text style={styles.title}>Thông tin học sinh</Text>
                <Text>
                  👩‍🎓 {profile?.firstName ?? ""} {profile?.lastName ?? ""}
                </Text>
                <Text>Email: {profile?.email}</Text>
                <Text>
                  Điện thoại: {profile?.phoneNumber || "Không có thông tin"}
                </Text>
              </View>

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
    </SafeAreaView>
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
