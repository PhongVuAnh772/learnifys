import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TrainingListContent from "./content/TrainingListContent";
const TrainingList = () => {
  return (
    <View style={styles.container}>
      <TrainingListContent />
    </View>
  );
};

export default TrainingList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
});
