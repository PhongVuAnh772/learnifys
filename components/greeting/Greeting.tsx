import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, ReactNode, memo } from "react";
import background from "@/assets/images/background-home.png";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import i18n from "@/translations";
import logoIcon from "@/assets/logo/logo.png";
import { blurhash } from "@/constants/BlurHash";
import { useTranslation } from "react-i18next";
import { AntDesign, Ionicons } from "@expo/vector-icons";

interface Props {
  title: string;
  description: string;
  overlayDescription?: string;
  children?: ReactNode;
  otherDescription?: string;
  backAction?: boolean;
}
const Greeting = ({
  title,
  description,
  overlayDescription,
  otherDescription,
  backAction,
  children,
}: Props) => {
  const router = useRouter();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <ImageBackground style={styles.imageBackground} source={background} />
        <View style={styles.overlayHeader}>
          {backAction && (
            <Pressable
              style={{
                position: "absolute",
                top: 78,
                left: 15,
                width: 32,
                height: 32,
              }}
              onPress={() => router.back()}
            >
              <AntDesign name="arrowleft" size={28} color="white" />
            </Pressable>
          )}
          <Text style={styles.title}>{i18n.t(title)}</Text>
          <View style={{ gap: 5 }}>
            <Text style={styles.description}>{i18n.t(description)}</Text>
            {otherDescription && (
              <Text style={styles.description}>{i18n.t(otherDescription)}</Text>
            )}
          </View>
        </View>
        <View style={styles.overlay}>
          <Image
            source={logoIcon}
            style={styles.logo}
            alt=""
            placeholder={{ blurhash }}
            contentFit="fill"
            transition={1000}
          />

          {overlayDescription && (
            <Text style={styles.overlayDescription}>
              {i18n.t(overlayDescription)}
            </Text>
          )}

          {children}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default memo(Greeting);

const styles = StyleSheet.create({
  imageBackground: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "75%",
    backgroundColor: "white",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 24,
    alignItems: "center",
    gap: 24,
  },
  overlayHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "25%",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    paddingTop: 10,
    paddingHorizontal: "5%",
  },
  title: {
    fontFamily: "quicksand-bold",
    color: "white",
    fontSize: 32,
  },
  description: {
    fontSize: 16,
    color: "#fefefe",
    textAlign: "center",
    fontFamily: "quicksand-medium",
  },
  logo: {
    width: 60,
    height: 60,
  },
  overlayDescription: {
    fontFamily: "quicksand-bold",
    fontSize: 18,
    lineHeight: 25.2,
    textAlign: "center",
  },
});
