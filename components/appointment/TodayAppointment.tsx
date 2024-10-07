import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import i18n, { changeLanguage } from "@/translations";
import CustomerListAppointment from "./customer-list/CustomerListAppointment";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";

const TodayAppointment = () => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{i18n.t("today-appointment")}</Text>
        <Pressable onPress={() => changeLanguage('vi')}>
          <Text style={styles.textButton}>{i18n.t("view-all")}</Text>
        </Pressable>
      </View>
      <CustomerListAppointment />
    </View>
  );
};

export default TodayAppointment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  title: {
    fontWeight: "700",
    fontFamily: "quicksand-bold",
    fontSize: 18,
  },
  textButton: {
    color: "#A4A4A4",
    fontSize: 16,
  },
});
