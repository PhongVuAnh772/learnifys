import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView,Platform } from "react-native";
import React, { useEffect } from "react";
import { defaultStyles } from "@/constants/Styles";
import { Link, useRouter } from "expo-router";
import Loading from "@/assets/animations/loading";
import i18n from "@/translations";
import { Ionicons } from "@expo/vector-icons";
import {Stack} from "expo-router";
import RechargeHeader from "@/components/recharge/RechargeHeader";
import RechargeList from "@/components/recharge/RechargeList";
import ScreenHeader from "@/atoms/HeaderComponent";
import { useTranslation } from "react-i18next";

const Recharge = () => {
   
  const router = useRouter();
  return (
    <View style={{ flex: 1,marginTop: Platform.OS === "ios" ? 50 : 70, }}>
      <ScreenHeader
          canGoBack
          title={i18n.t("campaign")}
          style={[styles.header]}
        />
      <RechargeList />
    </View>
  );
};

export default Recharge;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "quicksand-bold",
  },
  addContainer: {
    padding: 8,
    gap: 10,
    borderRadius: 32,
    backgroundColor: "#D80100",
  },
  header: {
    paddingBottom: 15,
    paddingTop: 0,
    paddingHorizontal: 16
  },
});
