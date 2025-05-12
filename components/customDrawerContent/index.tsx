// components/CustomDrawerContent.tsx
import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CustomDrawerContent(props: any) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <DrawerContentScrollView {...props} scrollEnabled={true}>
        {/* Dashboard */}
        <DrawerItem
          label="Tổng quan hệ thống"
          onPress={() => router.push("/(admin)/(tabs)")}
          icon={({ color, size }) => (
            <Ionicons name="speedometer-outline" size={size} color={color} />
          )}
        />

        {/* Quản lý người dùng */}
        <DrawerItem
          label="Quản lý người dùng"
          onPress={() => router.push("/admin-classroom")}
          icon={({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          )}
        />

        {/* Quản lý lớp học */}
        <DrawerItem
          label="Quản lý lớp học"
          onPress={() => router.push("/admin-classroom")}
          icon={({ color, size }) => (
            <Ionicons name="school-outline" size={size} color={color} />
          )}
        />

        {/* Quản lý câu hỏi */}
        <DrawerItem
          label="Quản lý câu hỏi"
          onPress={() => router.push("/admin-questions")}
          icon={({ color, size }) => (
            <Ionicons name="help-circle-outline" size={size} color={color} />
          )}
        />

        {/* Quản lý bài thi */}
        <DrawerItem
          label="Quản lý bài thi"
          onPress={() => router.push("/admin-exams")}
          icon={({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          )}
        />

        {/* Cài đặt hệ thống */}
        <DrawerItem
          label="Cài đặt hệ thống"
          onPress={() => router.push("/admin-settings")}
          icon={({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          )}
        />
      </DrawerContentScrollView>

      {/* Footer Logout Button */}
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
          paddingHorizontal: 20,
          borderTopWidth: 1,
          borderColor: "#ccc",
          paddingVertical: 40,
          marginBottom: 25,
        }}
      >
        <Text style={{ color: "red", fontWeight: "bold" }}>Đăng xuất</Text>
      </Pressable>
    </View>
  );
}
