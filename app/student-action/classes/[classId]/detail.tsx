import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axiosInstance from "@/controller/admin/student/axios";

// Tabs
import DocumentsTab from "./tabs/DocumentsTab";
import AssignmentsTab from "./tabs/AssignmentsTab";
import ExamsTab from "./tabs/ExamsTab";
import MembersTab from "./tabs/MembersTab";
import ProgressTab from "./tabs/ProgressTab";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

const Tab = createMaterialTopTabNavigator();

const StudentClassDetailScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { classId } = route.params;

  const [classInfo, setClassInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchClassDetail = async () => {
    try {
      const res = await axiosInstance.get(
        `/get-infor-class?classId=${classId}`
      );
      if (res.data.result) {
        setClassInfo(res.data.data);
      } else {
        Alert.alert(
          "Lỗi",
          res.data.messageVI || "Không lấy được thông tin lớp học"
        );
      }
    } catch (err: any) {
      Alert.alert("Lỗi", "Không thể kết nối đến máy chủ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClassDetail();
  }, []);

  useLayoutEffect(() => {
    if (classInfo) {
      navigation.setOptions({
        headerTitle: classInfo.name,
        headerTitleAlign: "center",
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 16 }}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
        ),
      });
    }
  }, [navigation, classInfo]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!classInfo) {
    return (
      <View style={styles.center}>
        <Text>Không tìm thấy lớp học</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Chi tiết lớp",
          headerTitleAlign: "center",
          contentStyle: {
            paddingBottom: 25,
          },
        }}
      />
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
          tabBarItemStyle: { width: 120 },
          tabBarStyle: {
            backgroundColor: "#fff",
            borderBottomWidth: 0.5,
            borderColor: "#ddd",
          },
          tabBarIndicatorStyle: {
            backgroundColor: "#007AFF",
            height: 3,
            borderRadius: 2,
          },
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "#666",
        }}
      >
        <Tab.Screen name="Tài liệu">
          {() => <DocumentsTab classId={classId} />}
        </Tab.Screen>
        <Tab.Screen name="Bài tập">
          {() => <AssignmentsTab classId={classId} />}
        </Tab.Screen>
        <Tab.Screen name="Bài thi">
          {() => <ExamsTab classId={classId} />}
        </Tab.Screen>
        <Tab.Screen name="Thành viên">
          {() => <MembersTab classId={classId} />}
        </Tab.Screen>
        <Tab.Screen name="Tiến độ">
          {() => <ProgressTab classId={classId} />}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StudentClassDetailScreen;
