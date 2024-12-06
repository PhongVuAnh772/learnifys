import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AgentOrder from "./agent-order/AgentOrder";
import RetailOrder from "./retail-order/RetailOrder";
import i18n from "@/translations";
import { useTranslation } from "react-i18next";

const Tab = createMaterialTopTabNavigator();

const TrainingListContent = () => {
   
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor:"#27A376"
        },
        tabBarLabelStyle: { fontSize: 14, textTransform: "none",fontFamily:"manrope-bold" },
        tabBarStyle: {
          backgroundColor: "rgb(241, 243, 244)",
          width: "100%",
          paddingTop: 10,
        },
        lazy: true,
        swipeEnabled: true,
        tabBarActiveTintColor: '#27A376',
        tabBarInactiveTintColor: '#434343'
      }}
    >
      <Tab.Screen
        name="AgentTopTab"
        component={AgentOrder}
        options={{
          title: i18n.t("courses"),
        }}
      />
      <Tab.Screen
        name="RetailTopTab"
        component={RetailOrder}
        options={{
          title: i18n.t("exam-history"),
        }}
      />
    </Tab.Navigator>
  );
};

export default TrainingListContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
