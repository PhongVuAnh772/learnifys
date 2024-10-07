import { StyleSheet, Text, View } from "react-native";
import React from "react";
import InformationTabContent from "./content/CustomerListContent";

const Information = () => {
  return (
    <View style={styles.container}>
      <InformationTabContent />
    </View>
  );
};

export default Information;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  
});
