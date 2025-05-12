import { Ionicons } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import axios from "axios"; // dùng axios trực tiếp để gọi custom URL
import Toast from "react-native-toast-message";
import { io, Socket } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "@/controller/admin/student/axios";

const SOCKET_URL = "http://127.0.0.1:5000/notify";
const API_URL = "http://127.0.0.1:5000";

let socket: Socket;

const Notifications = () => {
  const [dataNotifications, setDataNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [teacherClasses, setTeacherClasses] = useState<any[]>([]);

  const fetchTeacherClasses = async () => {
    try {
      setLoading(true);
      const raw = await AsyncStorage.getItem("userData");
      if (!raw) return;

      const { token } = JSON.parse(raw);
      const res = await axios.get(
        `${API_URL}/api/get-list-classes-by-teacher`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data, "teacherClasses");

      if (res.data?.result) {
        setTeacherClasses(res.data.data || []);
      } else {
        Alert.alert("Lỗi", res.data.messageVI || "Không thể lấy danh sách lớp");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      Alert.alert("Lỗi", "Không thể kết nối đến server");
    } finally {
      setLoading(false);
    }
  };
  const getData = async () => {
    try {
      setLoading(true);
      const raw = await AsyncStorage.getItem("userData");
      if (!raw) return;

      const { token } = JSON.parse(raw);

      const res = await axios.get(`${API_URL}/api/get-list-notify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("📥 Notifies from DB:", res.data?.data);
      if (res.data?.result) {
        setDataNotifications(res.data.data || []);
      } else {
        Toast.show({ type: "error", text1: res.data?.messageVI || "Thất bại" });
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông báo:", error);
      Toast.show({ type: "error", text1: "Không thể tải thông báo" });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (studentId: string, notifyId: string) => {
    if (teacherClasses.length === 0) {
      Toast.show({
        type: "error",
        text1: "Bạn chưa có lớp nào để thêm học sinh",
      });
      return;
    }

    const selectedClassId = teacherClasses[0]?.id; // Lấy lớp đầu tiên, có thể mở rộng logic chọn lớp cụ thể

    try {
      const res = await axiosInstance.post(
        `/add-new-student-to-class-by-teacher`,
        { studentId, classId: selectedClassId }
      );

      if (res.data.result) {
        socket.emit("response-request", { targetUserId: studentId });
        Toast.show({ type: "success", text1: "Đã thêm học sinh vào lớp" });

        setDataNotifications((prev) =>
          prev.filter((n) => n._id !== notifyId && n.id !== notifyId)
        );
      } else {
        Toast.show({
          type: "error",
          text1: res.data.messageVI || "Không thể thêm học sinh",
        });
      }
    } catch (err) {
      Toast.show({ type: "error", text1: "Lỗi xử lý yêu cầu" });
    }
  };

  const extractClassId = (msg?: string) => {
    if (!msg || typeof msg !== "string") return "";
    const parts = msg.trim().split(" ");
    return parts[parts.length - 1];
  };

  useEffect(() => {
    const connectSocket = async () => {
      const raw = await AsyncStorage.getItem("userData");
      if (!raw) return;
      const { token } = JSON.parse(raw);

      socket = io(SOCKET_URL, {
        auth: { token },
      });

      socket.on("connect", () => {
        console.log("✅ Socket connected");
      });

      socket.on("new-notify", (notify) => {
        console.log("📨 Nhận notify realtime:", notify);
        console.log("Socket ID:", notify);

        setDataNotifications((prev) => [notify, ...prev]);
      });

      socket.on("connect_error", (err) => {
        console.log("Socket error:", err.message);
      });
    };

    connectSocket();
    getData();
    fetchTeacherClasses();

    return () => {
      if (socket?.connected) socket.disconnect();
    };
  }, []);

  const RenderItem = ({ item }: any) => {
    const isJoinRequest = item.typeId === "join-class";
    const classId = item.classId;
    const studentId = item.senderId;

    const studentName =
      item.inforSenderData?.firstName || item.inforSenderData?.lastName
        ? `${item.inforSenderData?.firstName ?? ""} ${
            item.inforSenderData?.lastName ?? ""
          }`.trim()
        : `ID ${studentId}`;

    const content =
      item.contentVI || item.contentEN || `${studentName} yêu cầu tham gia lớp`;

    return (
      <View style={styles.contentNotify}>
        <View style={styles.overview}>
          <View style={styles.iconContainer}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.time}>{item.createdAt}</Text>
            <Text style={styles.title}>{item.title || "Thông báo mới"}</Text>
          </View>
          <View style={styles.dot}></View>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {content}
        </Text>

        {isJoinRequest && (
          <Pressable
            onPress={() => handleApprove(studentId, item._id || item.id)}
            style={styles.approveBtn}
          >
            <Text style={styles.approveBtnText}>Chấp nhận</Text>
          </Pressable>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator />}
      <FlashList
        data={dataNotifications}
        renderItem={({ item }) => <RenderItem item={item} />}
        estimatedItemSize={200}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !loading ? <Text>Không có thông báo nào</Text> : null
        }
      />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(241, 243, 244)",
    padding: 16,
  },
  overview: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  contentNotify: {
    backgroundColor: "white",
    padding: 16,
    gap: 12,
    borderRadius: 12,
    marginTop: 15,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "quicksand-light",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 1000,
    backgroundColor: "#D80100",
    marginLeft: "auto",
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ccc",
  },
  titleContainer: {
    flex: 1,
    gap: 5,
  },
  time: {
    fontSize: 13,
    fontFamily: "quicksand-light",
  },
  title: {
    fontFamily: "quicksand-bold",
    fontSize: 16,
  },
  approveBtn: {
    backgroundColor: "#2196F3",
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
    alignItems: "center",
  },
  approveBtnText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
});
