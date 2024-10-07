import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Pressable } from "react-native";
import React, { useEffect } from "react";
import { defaultStyles } from "@/constants/Styles";
import { Link, useRouter } from "expo-router";
import Loading from "@/assets/animations/loading";
import i18n from "@/translations";
import { Ionicons } from "@expo/vector-icons";
import {Stack} from "expo-router";
import OrderHeader from "@/screens/tabs/message/Header/MessageHeader";
import Information from "@/components/action-information/InformationHeader";
import { useTranslation } from "react-i18next";
const Customer = () => {
  const router = useRouter();
   
  return (
    <View style={{ flex: 1}}>
      <Information />
      <View style={styles.buttonContainer}>
        <Pressable style={styles.buttonContent}>
          <Text style={styles.buttonText}>{i18n.t("save-information")}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Customer;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "quicksand-bold",
  },
  addContainer: {
    padding: 8,
    gap: 10,
    borderRadius: 32,
    backgroundColor: "#D80100",
  },
  buttonContainer: {
    position: "absolute",
    height: 100,
    width: '100%',
    bottom: 0,
    paddingHorizontal: 16
  },
  buttonContent: {
    width: '100%',
    height:54,
    backgroundColor:'#D80100',
    borderRadius:1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color:'white',
    fontFamily:"quicksand-bold",
    lineHeight: 22.4,
    fontSize: 16
  }
});
