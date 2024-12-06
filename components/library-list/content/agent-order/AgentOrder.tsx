import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TotalRevenue from "@/components/total-revenue/TotalRevenue";
import i18n from "@/translations";
import AgentOrderList from "./agent-order-list/AgentOrderList";
const AgentOrder = () => {
  return (
    <View style={styles.container}>
      <AgentOrderList />
    </View>
  );
};

export default AgentOrder;

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
