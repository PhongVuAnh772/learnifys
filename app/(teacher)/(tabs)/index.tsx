import { ScrollView, View } from "react-native";
import React, { useMemo, useState } from "react";
import { Stack } from "expo-router";
import ExploreHeader from "@/screens/tabs/explore/Header/ExploreHeader";
import SwiperHome from "@/components/swiper/SwiperHome";
import TodayStatistics from "@/components/statistics/TodayStatistics";
import TodayAppointment from "@/components/appointment/TodayAppointment";
import { useAppSelector } from "@/redux/store";
import { useAuth } from "@/auth/ctx";
import ExploreTeacherHeader from "@/screens/tabs/explore/Header/ExploreTeacherHeader";
const Page = () => {
  const [category, setCategory] = useState<string>("Tiny homes");
  const onDataChanged = (category: string) => {
    setCategory(category);
  };
  const { user } = useAuth();
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <ExploreTeacherHeader
        avatar_url={user?.image || "https://i.pravatar.cc/100?img=12"}
        name={
          `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim() ||
          "Giáo viên"
        }
        counting={15}
      />
      <SwiperHome />
      <TodayStatistics />
      <TodayAppointment />
    </ScrollView>
  );
};

export default Page;
