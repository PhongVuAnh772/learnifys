import ModalGetInformationChildOfParents from "@/components/ModalGetInformationChildOfParents";
import OrderIcon from "@/components/tab-icons/OrderIcon";
import ReportIcon from "@/components/tab-icons/ReportIcon";
import SettingIcon from "@/components/tab-icons/SettingIcon";
import HomeIcon from "@/components/tab-icons/homeIcon";
import Colors from "@/constants/Colors";
import { connectChatSocket, connectNotifySocket } from "@/socket";
import i18n from "@/translations";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs } from "expo-router";
import React, { useEffect } from "react";

const Layout = () => {
  useEffect(() => {
    connectNotifySocket();
    connectChatSocket();
  }, []);
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
              <MaterialCommunityIcons
                name="home-variant"
                size={size}
                color={color}
              />
            ),
            headerShown: false,
          }}
        />

        <Tabs.Screen
          name="explore"
          options={{
            tabBarLabel: "Học tập của con",
            tabBarIcon: ({ size, color, focused }) => (
              <OrderIcon size={size} color={color} focused={focused} />
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
