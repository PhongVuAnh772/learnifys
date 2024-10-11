import ModalGetInformationChildOfParents from "@/components/ModalGetInformationChildOfParents";
import OrderIcon from "@/components/tab-icons/OrderIcon";
import ReportIcon from "@/components/tab-icons/ReportIcon";
import SettingIcon from "@/components/tab-icons/SettingIcon";
import HomeIcon from "@/components/tab-icons/homeIcon";
import Colors from "@/constants/Colors";
import i18n from "@/translations";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <React.Fragment>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.primary,
          tabBarLabelStyle: {
            fontFamily: "quicksand-bold",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: i18n.t("home-tab"),
            tabBarIcon: ({ size, color, focused }) => (
              <HomeIcon size={size} color={color} focused={focused} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="favorite"
          options={{
            tabBarLabel: i18n.t("report-tab"),
            tabBarIcon: ({ size, color, focused }) => (
              <ReportIcon size={size} color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            tabBarLabel: i18n.t("location-children"),
            tabBarIcon: ({ size, color, focused }) => (
              <OrderIcon size={size} color={color} focused={focused} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="message"
          options={{
            tabBarLabel: i18n.t("zoom-title"),
            tabBarIcon: ({ size, color, focused }) => (
              <AntDesign name="wechat" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="user"
          options={{
            tabBarLabel: i18n.t("user-tab"),
            headerShown: false,
            tabBarIcon: ({ size, color, focused }) => (
              <SettingIcon size={size} color={color} focused={focused} />
            ),
          }}
        />
      </Tabs>
      <ModalGetInformationChildOfParents />
    </React.Fragment>
  );
};

export default Layout;
