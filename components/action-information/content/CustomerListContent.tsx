import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PersonalInformation from "./personal-information/PersonalInformation";
import SocialInformation from "./social-information/SocialInformation";
import i18n from "@/translations";
import { useTranslation } from "react-i18next";

const Tab = createMaterialTopTabNavigator();

const InformationTabContent = () => {
   
  return (
    <View style={styles.containerTab}>
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
        component={PersonalInformation}
        options={{
          title: i18n.t("personal-information"),
        }}
      />
      <Tab.Screen
        name="RetailTopTab"
        component={SocialInformation}
        options={{
          title: i18n.t("social-information"),
        }}
      />
    </Tab.Navigator>
    </View>
  );
};

export default InformationTabContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTab: {
    flex: 1,
    backgroundColor:'white'
  }
});
