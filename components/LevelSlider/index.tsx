import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

const LevelSelector = ({ selectedLevel, setSelectedLevel, maxLevel = 10 }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Chọn cấp độ: {selectedLevel}</Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={maxLevel}
        step={1}
        value={selectedLevel}
        onValueChange={(value) => setSelectedLevel(Math.round(value))}
        minimumTrackTintColor="#3b82f6"
        maximumTrackTintColor="#d1d5db"
        thumbTintColor="#3b82f6"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    elevation: 2,
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "600",
  },
  slider: {
    width: "100%",
    height: 40,
  },
});

export default LevelSelector;
