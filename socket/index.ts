// lib/socket.ts
import { io, Socket } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

let notifySocket: Socket | null = null;
let chatSocket: Socket | null = null;

export const connectNotifySocket = async () => {
  const userData = await AsyncStorage.getItem("userData");
  const parsed = JSON.parse(userData || "{}");

  notifySocket = io("http://127.0.0.1:5000/notify", {
    auth: {
      token: parsed?.access_token, // hoặc parsed?.token
    },
    transports: ["websocket"],
  });

  notifySocket.on("connect", () => {
    console.log("🔔 Connected to notify socket");
  });

  notifySocket.on("update-notification", () => {
    console.log("🛎️ Có thông báo mới");
    // Trigger fetch or UI update
  });

  notifySocket.on("get-list-user-online", ({ listUserOnline }) => {
    console.log("🟢 Online Users:", listUserOnline);
  });

  notifySocket.on("disconnect", () => {
    console.log("🔌 Notify socket disconnected");
  });
};

export const connectChatSocket = () => {
  chatSocket = io("http://<YOUR_BACKEND_IP>:5000/chat", {
    transports: ["websocket"],
  });

  chatSocket.on("connect", () => {
    console.log("💬 Connected to chat socket");
  });

  chatSocket.on("update-comment", () => {
    console.log("📝 New comment posted");
    // refresh comment section
  });

  chatSocket.on("disconnect", () => {
    console.log("💬 Chat socket disconnected");
  });
};

export const getNotifySocket = () => notifySocket;
export const getChatSocket = () => chatSocket;
