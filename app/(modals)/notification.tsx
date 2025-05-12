import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import { Image } from "expo-image";
import { blurhash } from "@/constants/BlurHash";
import { FlashList } from "@shopify/flash-list";
import axiosInstance from "@/controller/admin/student/axios";
import Toast from "react-native-toast-message";
import addNotifyIcon from "@/assets/stickers/add-notify.png";
import approveNotifyIcon from "@/assets/stickers/approve-notify.png";
import cartNotifyIcon from "@/assets/stickers/cart-notify.png";
import checkinNotifyIcon from "@/assets/stickers/checkin-notify.png";
import signupNotifyIcon from "@/assets/stickers/signup-notify.png";

const typeToIcon: any = {
  checkin: checkinNotifyIcon,
  "add-customer": addNotifyIcon,
  approve: approveNotifyIcon,
  "sign-up": signupNotifyIcon,
  cart: cartNotifyIcon,
};

const RenderItem = ({ item }: any) => (
  <View style={styles.contentNotify}>
    <View style={styles.overview}>
      <View style={styles.iconContainer}>
        <Image
          source={typeToIcon[item.type] || addNotifyIcon}
          alt=""
          style={styles.icon}
          placeholder={{ blurhash }}
          contentFit="fill"
          transition={1000}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.time}>{item.createdAt}</Text>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <View style={styles.dot}></View>
    </View>
    <Text style={styles.description} numberOfLines={2}>
      {item.content}
    </Text>
  </View>
);

const Notifications = () => {
  const [dataNotifications, setDataNotifications] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosInstance.get("/get-list-notify");
        setDataNotifications(res.data?.data || []);
      } catch (error) {
        console.error("Error fetching notifications", error);
        Toast.show({
          type: "error",
          text1: "Không thể tải thông báo",
        });
      }
    };
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <FlashList
        data={dataNotifications}
        renderItem={({ item }) => <RenderItem item={item} />}
        estimatedItemSize={200}
        showsVerticalScrollIndicator={false}
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
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  contentNotify: {
    backgroundColor: "white",
    flex: 1,
    padding: 16,
    gap: 12,
    borderRadius: 12,
    marginTop: 15,
  },
  description: {
    fontSize: 14,
    lineHeight: 19.6,
    fontFamily: "quicksand-light",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 1000,
    backgroundColor: "#D80100",
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
  titleContainer: {
    flex: 1,
    gap: 5,
  },
  time: {
    fontSize: 14,
    lineHeight: 19.6,
    fontFamily: "quicksand-light",
  },
  title: {
    fontFamily: "quicksand-bold",
    fontSize: 16,
    lineHeight: 22.4,
  },
});
