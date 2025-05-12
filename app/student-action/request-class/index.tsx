import React, { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { io, Socket } from "socket.io-client";
import axiosInstance from "@/controller/admin/student/axios";
import { commonEnum } from "@/enum/keymap";
import DropDownTeacherAdmin from "@/app/common/DropDownTeacherAdmin";

const SOCKET_URL = "http://127.0.0.1:5000/notify";
let socket: Socket;

const RequestJoinClassScreen = () => {
  const [teacherList, setTeacherList] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const data = await AsyncStorage.getItem("userData");
      if (data) {
        const parsed = JSON.parse(data);
        setUserId(parsed?.data?.id);
        const token = parsed.token;

        socket = io(SOCKET_URL, {
          auth: { token },
        });

        socket.on("connect", () => {
          console.log("Connected:", socket.id);
        });

        socket.on("disconnect", () => {
          console.log("Disconnected");
        });
      }
    };

    const fetchTeachers = async () => {
      try {
        const res = await axiosInstance.get("/get-all-users");
        const list = res.data.data.filter(
          (u) => u.roleId === commonEnum.roleId.TEACHER
        );

        const formatted = list.map((t) => ({
          label: `${t.firstName ?? ""} ${t.lastName ?? ""}`.trim() || t.email,
          value: t.id,
          key: t.id,
        }));

        setTeacherList(formatted);
      } catch (err) {
        Alert.alert("Lỗi", "Không thể tải danh sách giáo viên");
      }
    };

    fetchUser();
    fetchTeachers();

    return () => {
      // socket?.disconnect();
    };
  }, []);

  const handleSend = async () => {
    if (!selectedTeacher) {
      Alert.alert("Lỗi", "Vui lòng chọn giáo viên");
      return;
    }

    socket.emit("send-request-join-class-to-teacher", {
      teacherId: selectedTeacher,
    });

    try {
      await axiosInstance.post("/post-new-notify", {
        receiverId: selectedTeacher,
        contentEN: `Student ID ${userId} wants to join your class`,
        contentVI: `Học sinh ID ${userId} yêu cầu tham gia lớp`,
        typeId: "join-class",
        params: "",
      });

      Alert.alert("Thành công", "Đã gửi yêu cầu tới giáo viên");
    } catch (err) {
      console.error("Error sending notify:", err);
      Alert.alert("Lỗi", "Không thể lưu thông báo");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Yêu cầu tham gia lớp học</Text>

      <DropDownTeacherAdmin
        data={teacherList}
        opening={open}
        onOpen={setOpen}
        value={selectedTeacher}
        setValue={setSelectedTeacher}
        loading={loading}
        setLoading={setLoading}
        placeholder="Chọn giáo viên"
        useI18n={false}
      />

      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Gửi yêu cầu</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#E53935",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

export default RequestJoinClassScreen;
