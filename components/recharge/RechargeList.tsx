import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RechargeListContent from "./content/RechargeListContent";

const RechargeList = () => {
  return (
    <View style={styles.container}>
      <RechargeListContent />
    </View>
  );
};

export default RechargeList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
});
