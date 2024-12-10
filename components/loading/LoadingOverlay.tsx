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
import { useDimensions } from "@/hooks/useDimensions";
import { useTranslation } from "react-i18next";

interface LoadingOverlayContextType {
  show: (
    title?: string,
    description?: string,
    image?: ImageSourcePropType
  ) => void;
  hide: () => void;
}

const LoadingOverlayContext = createContext<
  LoadingOverlayContextType | undefined
>(undefined);

interface LoadingOverlayProviderProps {
  children: ReactNode;
}

export const LoadingOverlayProvider: React.FC<LoadingOverlayProviderProps> = ({
  children,
}) => {

  const isSmallScreen = useDimensions();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [image, setImage] = useState<ImageSourcePropType | undefined>(
    undefined
  );

  const show = (
    title?: string,
    description?: string,
    image?: ImageSourcePropType
  ) => {
    setTitle(title);
    setDescription(description);
    setImage(image);
    setLoading(true);
  };

  const hide = () => setLoading(false);

  return (
    <LoadingOverlayContext.Provider value={{ show, hide }}>
      {children}
      {loading && (
        <Animated.View style={styles.overlay} entering={FadeInUp}>
          <View style={[styles.loadingContent, { height: isSmallScreen ? 465 : 500 }]}>
            {image && <Image source={image} style={styles.image} />}
            <View style={styles.textLoading}>
              {title && <Text style={styles.title}>{i18n.t(title)}</Text>}
              {description && (
                <Text style={styles.description}>{i18n.t(description)}</Text>
              )}
            </View>
            <ActivityIndicatorPaper color="red" animating={true} size="large" />
          </View>
        </Animated.View>
      )}
    </LoadingOverlayContext.Provider>
  );
};

export const useLoadingOverlay = () => {
  const context = useContext(LoadingOverlayContext);
  if (!context) {
    throw new Error(
      "useLoadingOverlay must be used within a LoadingOverlayProvider"
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
    zIndex: 100000000
  },
  loadingContent: {
    width: 340,
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
    textAlign: "center",
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
