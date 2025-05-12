import { ScrollView, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Stack } from "expo-router";
import ExploreHeader from "@/screens/tabs/explore/Header/ExploreHeader";
import SwiperHome from "@/components/swiper/SwiperHome";
import TodayStatistics from "@/components/statistics/TodayStatistics";
import TodayAppointment from "@/components/appointment/TodayAppointment";
import { useAppSelector } from "@/redux/store";
import { useAuth } from "@/auth/ctx";
import axiosInstance from "@/controller/admin/student/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UpcomingExamsList from "@/components/UpcomingExamsList/UpcomingExamsList";
const Page = () => {
  const [stats, setStats] = useState({
    classes: 0,
    exams: 0,
    documents: 0,
    missions: 0,
  });
  const [filteredExams, setFilteredExams] = useState<any[]>([]); // upcoming exams
  const [exams, setExams] = useState<any[]>([]); // all exams

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const user = await AsyncStorage.getItem("userData");
        const parsed = JSON.parse(user || "{}");

        if (parsed?.data?.id) {
          const parentsId = parsed.data.id;

          const classRes = await axiosInstance.get(
            "/get-list-class-of-student-by-parentsId"
          );

          const classes = classRes.data?.data || [];

          // Get exams and documents of first student (or modify to loop all if needed)
          const firstStudent = classes[0]?.studentId;

          const [examRes, docRes, missionRes] = await Promise.all([
            axiosInstance.get("/get-list-exams-of-class", {
              params: { classId: classes[0]?.classId },
            }),
            axiosInstance.get("/get-list-documents-of-class", {
              params: { classId: classes[0]?.classId },
            }),
            axiosInstance.get("/get-mission-of-student", {
              params: { studentId: firstStudent },
            }),
          ]);

          setStats({
            classes: classes.length,
            exams: examRes.data?.data?.length || 0,
            documents: docRes.data?.data?.length || 0,
            missions: missionRes.data?.data?.length || 0,
          });
          const examList = examRes.data?.data || [];
          setExams(examList);

          const upcoming = examList
            .filter((exam: any) => {
              const today = new Date();
              const examDate = new Date(exam.dateFinish);
              return examDate >= today;
            })
            .sort(
              (a: any, b: any) =>
                new Date(a.dateFinish).getTime() -
                new Date(b.dateFinish).getTime()
            )
            .slice(0, 3); // lấy 3 bài thi gần nhất

          setFilteredExams(upcoming);
        }
      } catch (err) {
        console.error("Error fetching parent stats", err);
      }
    };

    fetchStats();
  }, []);
  const { user } = useAuth();
  console.log(user, "user");
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <ExploreHeader
        avatar_url={user?.image || ""}
        name={
          `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim() ||
          "Phụ huynh"
        }
        counting={15}
      />

      <SwiperHome />
      <TodayStatistics stats={stats} />
      <UpcomingExamsList exams={filteredExams} />
    </ScrollView>
  );
};

export default Page;
