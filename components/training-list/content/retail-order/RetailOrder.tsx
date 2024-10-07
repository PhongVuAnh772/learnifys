import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TotalRevenue from "@/components/total-revenue/TotalRevenue";
import i18n from "@/translations";
import RetailOrderList from "./retail-order-list/RetailOrderList";
const RetailOrder = () => {
  return (
    <View style={styles.container}>
      <RetailOrderList />
    </View>
  );
};

export default RetailOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "5%",
  },
  title: {
    fontFamily: "quicksand-light",
    fontSize: 17,
    paddingVertical: 10,
  },
});
