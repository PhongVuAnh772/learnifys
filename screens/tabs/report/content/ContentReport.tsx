import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import i18n from "@/translations";
import ChartOverView from "./ChartOverView";
import { useDimensions } from "@/hooks/useDimensions";
import { useTranslation } from "react-i18next";

interface Props {
  category: string;
}

const ContentReport = ({ category }: Props) => {
  useEffect(() => {
    console.log(category);
  }, [category]);
  const isSmallScreen = useDimensions()
   
  return (
    <ScrollView style={styles.container}>
      <View style={[styles.overviewContainer, {height: isSmallScreen ? 158 : 180}]}>
        <Text style={styles.title}>{i18n.t("business-results")}</Text>
        <Text style={styles.description}>{i18n.t(category)}</Text>
        <Text style={styles.price}>40.000.000đ</Text>
        <Text style={styles.descriptionMonthly}>
          {i18n.t("you-choosing")} - <Text style={styles.bold}>Tháng 3</Text>
        </Text>
      </View>
      <ChartOverView />
    </ScrollView>
  );
};

export default ContentReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: "40%",
    
  },
  overviewContainer: {
    backgroundColor: "white",
    width: "100%",
    height: 158,
    alignItems: "center",
    padding: 16,
    borderRadius: 12
  },
  title: {
    fontFamily: "quicksand-bold",
    fontSize: 16,
  },
  description: {
    fontFamily: "quicksand-medium",
    color: "#27A376",
    paddingTop: 10,
  },
  price: {
    fontFamily: "quicksand-bold",
    fontSize: 20,
    paddingTop: 25,
    color: "#D80100",
  },
  bold: {
    fontFamily: "quicksand-bold",
    color: "black",
  },
  descriptionMonthly: {
    fontFamily: "quicksand-medium",
    color: "#838383",
    paddingTop: 15,
  },
});
