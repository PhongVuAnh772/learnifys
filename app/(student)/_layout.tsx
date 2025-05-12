// app/_layout.tsx
import CustomStudentDrawer from "@/components/customStudentDrawer";
import { connectChatSocket, connectNotifySocket } from "@/socket";
import { Drawer } from "expo-router/drawer";
import { useEffect } from "react";

export default function Layout() {
  useEffect(() => {
    connectNotifySocket();
    connectChatSocket();
  }, []);
  return (
    <Drawer
      drawerContent={(props) => <CustomStudentDrawer {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="(student)" options={{ title: "student" }} />
    </Drawer>
  );
}
