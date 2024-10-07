import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
  Pressable,
} from "react-native";
import { ActivityIndicator as ActivityIndicatorPaper } from "react-native-paper";
import i18n from "@/translations";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "@/redux/store";
import { DELETE_SESSION_AUTH } from "@/redux/slices/auth.slice";
import { useNavigation } from "expo-router";
import PrimaryButton from "@/atoms/PrimaryButton";
import { useTranslation } from "react-i18next";

interface SessionContextType {
  showSessionWarning: (
    title?: string,
    description?: string,
    image?: ImageSourcePropType
  ) => void;
  hideSessionWarning: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
}) => {
   
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [image, setImage] = useState<ImageSourcePropType | undefined>(
    undefined
  );
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const showSessionWarning = (
    title?: string,
    description?: string,
    image?: ImageSourcePropType
  ) => {
    setTitle(title);
    setDescription(description);
    setImage(image);
    setLoading(true);
  };

  const hideSessionWarning = () => setLoading(false);

  const handleLoginSession = async () => {
    await AsyncStorage.removeItem("tokens");
    dispatch(DELETE_SESSION_AUTH(null as any));
    hideSessionWarning();
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "(modals)/login",
        } as any,
      ],
    });
  };
  return (
    <SessionContext.Provider value={{ showSessionWarning, hideSessionWarning }}>
      {children}
      {loading && (
        <Animated.View style={styles.overlay} entering={FadeInUp}>
          <View style={styles.loadingContent}>
            {image && <Image source={image} style={styles.image} />}
            <View style={styles.textLoading}>
              {title && <Text style={styles.title}>{i18n.t("login-session-title")}</Text>}
              {description && (
                <Text style={styles.description}>{i18n.t("login-session-description")}</Text>
              )}
            </View>
            <PrimaryButton
              style={styles.button}
              mode="contained"
              onPress={handleLoginSession}
            >
              {i18n.t("login")}
            </PrimaryButton>
          </View>
        </Animated.View>
      )}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
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
    zIndex: 100000000,
  },
  loadingContent: {
    width: 340,
    height: 200,
    backgroundColor: "white",
    alignItems: "center",
    padding: 14,
    gap: 32,
    borderRadius: 32,
    paddingTop: 15,
    paddingHorizontal: 15,
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
    paddingHorizontal: 15,
  },
  textLoading: {
    alignItems: "center",
    gap: 25,
  },
  button: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    height: 54,
    borderRadius: 1000,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D80100",
  },
});
