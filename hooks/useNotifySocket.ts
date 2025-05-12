// hooks/useNotifySocket.ts
import { useEffect, useRef } from "react";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const SOCKET_URL = "http://127.0.0.1:5000/notify";

export const useNotifySocket = () => {
  const socketRef = useRef<any>(null);

  useEffect(() => {
    const initSocket = async () => {
      const userData = await AsyncStorage.getItem("userData");
      const parsed = JSON.parse(userData || "{}");

      socketRef.current = io(SOCKET_URL, {
        auth: {
          token: parsed?.accessToken, // token JWT
        },
        transports: ["websocket"],
      });

      socketRef.current.on("connect", () => {
        console.log("✅ Socket connected: ", socketRef.current.id);
      });

      socketRef.current.on("update-notification", () => {
        Toast.show({
          type: "info",
          text1: "🔔 Bạn có thông báo mới!",
        });
      });

      socketRef.current.on("disconnect", () => {
        console.log("❌ Socket disconnected");
      });
    };

    initSocket();

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);
};
