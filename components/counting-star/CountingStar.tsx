import { StyleSheet, Text, View } from "react-native";
import React from "react";
import i18n from "@/translations";
import * as Progress from "react-native-progress";
import { useTranslation } from "react-i18next";

const TodayStatisticsUser = () => {
   
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t("overview")}</Text>
      <View style={styles.countingContainer}>
        <Text style={styles.countingTitle}>
          {i18n.t("profile-score")}
          <Text style={styles.countingTitleMore}>
            ({i18n.t("increase-credibility")})
          </Text>
        </Text>
        <Progress.Bar
          progress={0.8}
          width={null}
          height={5}
          borderRadius={12}
          color={"#D80100"}
          borderWidth={0}
          unfilledColor="#D9D9D9"
        />
        <View style={styles.progressContainer}>
                <Text style={styles.progressNumber}>80</Text>

          <Text style={styles.progressNumber}>100</Text>

        </View>
      </View>
    </View>
  );
};

export default TodayStatisticsUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontFamily: "quicksand-light",
    fontSize: 14,
  },
  countingContainer: {
    flex: 1,
    height: 112,
    padding: 16,
    borderRadius: 16,
    gap: 16,
    backgroundColor: "white",
    marginTop: 10,
  },
  countingTitle: {
    fontFamily: "manrope-bold",
    fontSize: 16,
    lineHeight: 24,
  },
  countingTitleMore: {
    fontFamily: "manrope-medium",
    fontSize: 14,
    lineHeight: 24,
    paddingLeft: 10,
  },
  progressContainer: {
    
    flexDirection:"row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressNumber :{
    fontSize: 18,
    fontFamily:"manrope-bold"
  }
});
