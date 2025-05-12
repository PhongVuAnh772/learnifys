import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import React, { useMemo, useState } from "react";
import { Stack } from "expo-router";
import ExploreHeader from "@/screens/tabs/explore/Header/ExploreHeader";
import SwiperHome from "@/components/swiper/SwiperHome";
import TodayStatistics from "@/components/statistics/TodayStatistics";
import TodayAppointment from "@/components/appointment/TodayAppointment";
import { useAppSelector } from "@/redux/store";
import { useAuth } from "@/auth/ctx";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";

const QuickAction = ({ icon, label }) => (
  <MotiView
    from={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: "timing", duration: 500 }}
    style={{
      alignItems: "center",
      backgroundColor: "#f0f4ff",
      padding: 16,
      borderRadius: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      width: 90,
    }}
  >
    <Ionicons name={icon} size={28} color="#4A90E2" />
    <Text
      style={{
        fontSize: 13,
        marginTop: 8,
        fontFamily: "quicksand-bold",
        color: "#333",
      }}
    >
      {label}
    </Text>
  </MotiView>
);
const Page = () => {
  const [category, setCategory] = useState<string>("Tiny homes");
  const onDataChanged = (category: string) => {
    setCategory(category);
  };
  const { user } = useAuth();
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <ExploreHeader
        avatar_url={user?.image || "https://i.pravatar.cc/100?img=12"}
        name={
          `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim() ||
          "Học sinh"
        }
        counting={15}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: "12%",
        }}
      >
        <QuickAction icon="cloud-upload-outline" label="Nộp bài" />
        <QuickAction icon="document-text-outline" label="Tài liệu" />
        <QuickAction icon="stats-chart-outline" label="Xem điểm" />
      </View>

      <SwiperHome />
      <TodayAppointment />
    </ScrollView>
  );
};

export default Page;
