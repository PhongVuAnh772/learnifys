import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import i18n from '@/translations';
import { useTranslation } from "react-i18next";

interface FeeCostProps {
  fee: number;
}

const FeeCost: React.FC<FeeCostProps> = ({ fee }) => {
   
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t("fee")}</Text>
      <Text style={styles.overview}>{fee}đ/{i18n.t("mess")}</Text>
    </View>
  );
}

export default FeeCost;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5
  },
  title: {
    fontFamily:"quicksand-medium",
    fontSize: 16,
    lineHeight: 22.4
  },
  overview: {
    color: "#D80100",
    fontFamily:"quicksand-bold",
    fontSize: 16,
    lineHeight: 22.4
  }
});
