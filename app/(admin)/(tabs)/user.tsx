import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import NoneLogin from '@/components/non-login/NoneLogin';
import { defaultStyles } from '@/constants/Styles';
import { useRouter } from "expo-router";
import Loading from '@/assets/animations/loading';
import i18n from '@/translations';
import TodayStatisticsUser from '@/components/statistics/TodayStatisticsUser';
import UserHeader from '@/screens/tabs/user/Header/UserHeader';
import CountingStar from '@/components/counting-star/CountingStar';
import ActionForUser from '@/components/action-user/ActionForUser';
const User = () => {
  const router = useRouter();
  return (
    <ScrollView style={defaultStyles.container}>
      <UserHeader name={"Phong Vũ Anh"} counting={15}/>
      <CountingStar />
      <TodayStatisticsUser />
      <ActionForUser />
    </ScrollView>
  );
};

export default User;

const styles = StyleSheet.create({});
