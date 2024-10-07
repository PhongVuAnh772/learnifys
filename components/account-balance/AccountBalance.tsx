import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import i18n from "@/translations";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

const AccountBalance = () => {
  const router = useRouter()
  const handleRecharge = () => {
    router.push('recharge');
  }
 
  return (
    <View style={{paddingHorizontal: 16}}>
      <View style={styles.container}>
      <View style={styles.overview}>
        <Text style={styles.title}>{i18n.t("account-balance")}</Text>
        <Text style={styles.money}>9,996,700đ</Text>
      </View>
      <TouchableOpacity style={[styles.button, { backgroundColor: "#27A376" }]} onPress={handleRecharge}>
        <Text style={[styles.textButton, { color: "white" }]}>
          {i18n.t("recharge")}
        </Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

export default AccountBalance;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 108,
    backgroundColor: "white",
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",

  },
  overview: {
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "quicksand-light",
    fontSize: 14,
    lineHeight: 20,
  },
  money: {
    fontFamily: "quicksand-bold",
    fontSize: 24,
    lineHeight: 32,
  },
  button: {
    width: 105,
    height: 35,
    justifyContent: "center",
    borderRadius: 25,
    alignItems: "center",
    alignSelf: "center",
  },
  textButton: {
    fontFamily: "quicksand-bold",
    fontSize: 15,
  },
});
