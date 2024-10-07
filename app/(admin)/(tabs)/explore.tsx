import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView,Platform } from "react-native";
import React, { useEffect } from "react";
import { defaultStyles } from "@/constants/Styles";
import { Link, useRouter } from "expo-router";
import Loading from "@/assets/animations/loading";
import i18n from "@/translations";
import { Ionicons } from "@expo/vector-icons";
import {Stack} from "expo-router";
import CustomerHeader from "@/screens/tabs/customer/Header/CustomerHeader";
import CustomerList from "@/components/customer-list/CustomerList";
const Customer = () => {
  const router = useRouter();
  return (
    <View style={{ flex: 1,marginTop:  Platform.OS === "ios" ? 50 : 70}}>
      <Stack.Screen
        options={{
          header: () => <CustomerHeader />,
        }}
      />
      <CustomerList />
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
});
