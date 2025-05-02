import {
  View,
  useWindowDimensions,
  StyleSheet,
  Platform,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { useDrawerProgress, useDrawerStatus } from "@react-navigation/drawer";

const DrawerSceneWrapper = ({ children }: any) => {
  const progress = useDrawerProgress();
  const isDrawerOpen = useDrawerStatus() === "open";
  const { width, height } = useWindowDimensions();
  const fadeValue = useSharedValue(0);

  const [isVisible, setIsVisible] = useState(false);

  // Function to run on the UI thread to update the visibility state
  const updateVisibility = (visible: boolean) => {
    setIsVisible(visible);
  };
  const styles = useStyles();

  // Update the fade value and visibility based on drawer status
  useEffect(() => {
    if (isDrawerOpen) {
      setIsVisible(true); // Show the component
      fadeValue.value = withTiming(1, { duration: 300 });
    } else {
      fadeValue.value = withTiming(0, { duration: 300 }, () => {
        // Hide the component after the fade-out animation using runOnJS
        runOnJS(updateVisibility)(false);
      });
    }
  }, [isDrawerOpen]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      {
        scale: interpolate(progress.value, [0, 1], [1, 0.8], "clamp"),
      },
      {
        translateX: interpolate(
          progress.value,
          [0, 1],
          [0, Platform.OS === "android" ? width - 120 : -60],
          "clamp"
        ),
      },
      {
        translateY: interpolate(
          progress.value,
          [0, 1],
          [0, Platform.OS === "android" ? height * 0.05 : height * 0.05],
          "clamp"
        ),
      },
    ],
    borderRadius: interpolate(progress.value, [0, 1], [0, 20], "clamp"),
    overflow: "hidden",
  }));

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: fadeValue.value,
  }));

  return (
    <>
      <Animated.View style={[styles.container, animatedStyle]}>
        {children}
      </Animated.View>
    </>
  );
};

export default DrawerSceneWrapper;

const useStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.4,
      shadowRadius: 2,
      elevation: 16,
    },
    button: {
      width: 30,
      height: 30,
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "center",
    },
    selected: {
      backgroundColor: "red",
    },
  });
