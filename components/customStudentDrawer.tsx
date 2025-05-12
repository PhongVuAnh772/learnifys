import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View, Text, Pressable, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter, usePathname, Href } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/auth/ctx";

const activeColor = "#1E90FF";
const inactiveColor = "#555";
const backgroundColor = "#F4F6FA";

export default function CustomStudentDrawer(props: any) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();

  const drawerItems = [
    {
      label: "Tổng quan",
      icon: "home-outline",
      route: "/(student)/(tabs)",
    },
    {
      label: "Lớp học của tôi",
      icon: "school-outline",
      route: "/student-action/classes",
    },
    {
      label: "Bài tập",
      icon: "clipboard-outline",
      route: "/student-assignments",
    },
    {
      label: "Bài thi",
      icon: "document-text-outline",
      route: "/student-exams",
    },
    {
      label: "Tài liệu lớp học",
      icon: "folder-outline",
      route: "/student-documents",
    },
    {
      label: "Nhiệm vụ",
      icon: "flag-outline",
      route: "/student-missions",
    },
    {
      label: "Kết quả",
      icon: "stats-chart-outline",
      route: "/student-results",
    },
    {
      label: "Tài khoản liên kết phụ huynh",
      icon: "people-outline",
      route: "/student-relationship",
    },
    {
      label: "Thông báo",
      icon: "notifications-outline",
      route: "/student-notifications",
    },
  ];

  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor }}>
      {/* HEADER của Drawer */}
      <View
        style={{
          padding: 20,
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#ddd",
        }}
      >
        <Image
          source={{ uri: user?.image || "https://i.pravatar.cc/100?img=12" }} // bạn có thể thay bằng ảnh người dùng thực
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            marginRight: 12,
          }}
        />
        <View>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#333" }}>
            {`${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim() ||
              "Học sinh"}
          </Text>
          <Text style={{ fontSize: 13, color: "#777" }}>Học sinh</Text>
        </View>
      </View>

      {/* DANH SÁCH MENU */}
      <DrawerContentScrollView {...props} scrollEnabled>
        {drawerItems.map((item, index) => {
          const isActive = pathname === item.route;

          return (
            <DrawerItem
              key={index}
              label={item.label}
              onPress={() => router.push(item.route as Href<string>)}
              icon={({ size }) => (
                <Ionicons
                  name={item.icon as any}
                  size={size}
                  color={isActive ? activeColor : inactiveColor}
                />
              )}
              labelStyle={{
                color: isActive ? activeColor : inactiveColor,
                fontWeight: isActive ? "bold" : "normal",
              }}
              style={{
                backgroundColor: isActive ? "#E6F0FF" : "transparent",
                borderRadius: 8,
                marginHorizontal: 10,
                marginVertical: 4,
              }}
            />
          );
        })}
      </DrawerContentScrollView>

      {/* LOGOUT */}
      <Pressable
        onPress={async () => {
          try {
            await AsyncStorage.clear();
            router.replace("/login");
          } catch (error) {
            console.error("Error clearing AsyncStorage:", error);
          }
        }}
        style={{
          backgroundColor: "#FFECEC",
          margin: 20,
          padding: 14,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#D00000", fontWeight: "bold", fontSize: 16 }}>
          Đăng xuất
        </Text>
      </Pressable>
    </View>
  );
}
