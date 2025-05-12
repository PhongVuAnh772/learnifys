import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CustomProgressBar = ({ progress }: { progress: number }) => {
  return (
    <View style={styles.container}>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${progress * 100}%` }]} />
      </View>
      <Text style={styles.label}>{Math.round(progress * 100)}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: "center",
  },
  barBackground: {
    width: "100%",
    height: 10,
    backgroundColor: "#eee",
    borderRadius: 5,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    backgroundColor: "#4caf50",
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    color: "#555",
  },
});

export default CustomProgressBar;
