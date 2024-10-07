import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";
import { ActivityIndicator as ActivityIndicatorPaper } from "react-native-paper";
import i18n from "@/translations";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";
import { useTranslation } from "react-i18next";

interface LoadingContentContextType {
  showLoadingContent: () => void;
  hideLoadingContent: () => void;
}

const LoadingContentContext = createContext<
  LoadingContentContextType | undefined
>(undefined);

interface LoadingContentProviderProps {
  children: ReactNode;
}

export const LoadingContentProvider: React.FC<LoadingContentProviderProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);

  const showLoadingContent = () => {
    setLoading(true);
  };

  const hideLoadingContent = () => setLoading(false);
 
  return (
    <LoadingContentContext.Provider
      value={{ showLoadingContent, hideLoadingContent }}
    >
      {children}
      {loading && (
        <Animated.View style={styles.overlay} entering={FadeInUp}>
          <ActivityIndicatorPaper color="white" animating={true} size="small" />
        </Animated.View>
      )}
    </LoadingContentContext.Provider>
  );
};

export const useLoadingContent = () => {
  const context = useContext(LoadingContentContext);
  if (!context) {
    throw new Error(
      "useLoadingContent must be used within a LoadingContentProvider"
    );
  }
  return context;
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "#00000068",
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContent: {
    width: 340,
    height: 465,
    backgroundColor: "white",
    alignItems: "center",
    padding: 32,
    gap: 32,
    borderRadius: 32,
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 10,
    resizeMode: "contain",
  },
  title: {
    color: "black",
    fontSize: 24,
    fontFamily: "quicksand-bold",
  },
  description: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "quicksand-light",
  },
  textLoading: {
    alignItems: "center",
    gap: 15,
  },
});
