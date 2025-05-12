import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import NoneLogin from "@/components/non-login/NoneLogin";
import { defaultStyles } from "@/constants/Styles";
import { useRouter } from "expo-router";
import Loading from "@/assets/animations/loading";
import i18n from "@/translations";
import TodayStatisticsUser from "@/components/statistics/TodayStatisticsUser";
import UserHeader from "@/screens/tabs/user/Header/UserHeader";
import CountingStar from "@/components/counting-star/CountingStar";
import ActionForUser from "@/components/action-user/ActionForUser";
import { useAuth } from "@/auth/ctx";
const User = () => {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <ScrollView style={defaultStyles.container}>
      <UserHeader
        avatar_url={user?.image || "https://i.pravatar.cc/100?img=12"}
        name={
          `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim() ||
          "Giáo viên"
        }
        email={user?.email}
      />
      <CountingStar />
      <TodayStatisticsUser />
      <ActionForUser />
    </ScrollView>
  );
};

export default User;

const styles = StyleSheet.create({});
