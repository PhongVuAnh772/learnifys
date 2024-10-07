import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import TotalRevenue from "@/components/total-revenue/TotalRevenue";
import i18n from "@/translations";
import AgentOrderList from "./agent-order-list/AgentOrderList";
import SearchBar from "@/components/Search/SearchBar";
import PrimaryButton from "@/atoms/PrimaryButton";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
const AgentOrder = () => {
  const router = useRouter();
  const handleEnterPress = () => {
    router.push({
      pathname: "qr-recharge",
      params: { children: searchValue },
    });
  };
  const handleRecharge = () => {
    router.push({
      pathname: "qr-recharge",
      params: { children: searchValue },
    });
  };
  const [searchValue, setSearchValue] = useState("");
 
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{i18n.t("title-transfer-money")}</Text>

      <SearchBar
        placeholder={i18n.t("typing-money")}
        keyboardType="numeric"
        color="white"
        handleEnterPress={handleEnterPress}
        value={searchValue}
        setValue={setSearchValue}
        maxLength={10}
        inputStyles={styles.input}
      />
      <PrimaryButton
        style={{
          position: "absolute",
          bottom: 10,
          width: "100%",
          height: 54,
          borderRadius: 1000,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#D80100",
          left: 15,
        }}
        mode="contained"
        onPress={handleRecharge}
      >
        {i18n.t("continue")}
      </PrimaryButton>
    </View>
  );
};

export default AgentOrder;

const styles = StyleSheet.create({
  container: {
    paddingTop: "5%",
    backgroundColor: "white",
    paddingHorizontal: 16,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "95%",
    borderRadius: 16,
  },
  title: {
    fontFamily: "quicksand-light",
    fontSize: 17,
    paddingVertical: 10,
  },
  input: {
    borderColor: "#BDC1C6",
    borderWidth: 1,
  },
  label: {
    fontFamily: "quicksand-bold",
    paddingBottom: 10,
  },
});
