// app/_layout.tsx
import CustomDrawerContent from "@/components/customDrawerContent";
import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="(admin)" options={{ title: "Admin" }} />
    </Drawer>
  );
}
