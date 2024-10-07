import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import qrIcon from "@/assets/icons/qr-code.png";
import rightIcon from "@/assets/icons/right.png";
import { Image } from "expo-image";
import { blurhash } from "@/constants/BlurHash";
import i18n from "@/translations";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
interface Props {
  navigation: string;
}

const QRRedirect = ({ navigation }: Props) => {
   
  return (
    <Link href="qr/123" asChild>
      <Pressable style={styles.container}>
        <View style={styles.qrContainer}>
          <Image
            source={qrIcon}
            style={styles.icon}
            alt=""
            placeholder={{ blurhash }}
            contentFit="fill"
            transition={1000}
          />
          <Text style={styles.qrText}>{i18n.t("qr-code")}</Text>
        </View>
        <Image
          source={rightIcon}
          style={styles.rightIcon}
          alt=""
          placeholder={{ blurhash }}
          contentFit="fill"
          transition={1000}
        />
      </Pressable>
    </Link>
  );
};

export default QRRedirect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
  rightIcon: {
    width: 15,
    height: 15,
  },
  qrText: {
    fontFamily: "quicksand-bold",
    color: "#D80100",
    paddingLeft: 10,
  },
  qrContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
