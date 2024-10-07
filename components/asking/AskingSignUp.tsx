import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import i18n from "@/translations";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

const AskingSignUp = () => {
   
  const router = useRouter();
const onSignUpPress = () => {
  router.replace('(modals)/signup')
}
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t("asking-sign-up")}</Text>
      <TouchableOpacity onPress={onSignUpPress}>
        <Text style={styles.signUpText}>{i18n.t("sign-up")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AskingSignUp;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginVertical: 10,
    flexDirection: "row",
  },
  title: {
    fontSize: 15,
    fontFamily: "cereal-light",
  },
  signUpText: {
    fontSize: 15,
    fontFamily: "cereal-bold",
    paddingLeft: 5,
  },
});
