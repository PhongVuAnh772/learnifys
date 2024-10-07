import { ScrollView, View } from "react-native";
import React, { useMemo, useState } from "react";
import { Stack } from "expo-router";
import ExploreHeader from "@/screens/tabs/explore/Header/ExploreHeader";
import SwiperHome from "@/components/swiper/SwiperHome";
import TodayStatistics from "@/components/statistics/TodayStatistics";
import TodayAppointment from "@/components/appointment/TodayAppointment";
import { useAppSelector } from "@/redux/store";
import { useAuth } from "@/auth/ctx";
const Page = () => {
  const [category, setCategory] = useState<string>("Tiny homes");
  const onDataChanged = (category: string) => {
    setCategory(category);
  };
  const {user} = useAuth()
  console.log(user?.user_metadata)
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <ExploreHeader avatar_url={user?.user_metadata?.avatar_url} name={user?.user_metadata?.full_name} counting={15} />
      <SwiperHome />
      <TodayStatistics />
      <TodayAppointment />
    </ScrollView>
  );
};

export default Page;
