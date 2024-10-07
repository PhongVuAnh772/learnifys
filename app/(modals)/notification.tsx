import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import i18n from "@/translations";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { defaultStyles } from "@/constants/Styles";
import AskingSignUp from "@/components/asking/AskingSignUp";
import approveNotifyIcon from "@/assets/stickers/approve-notify.png";
import addNotifyIcon from "@/assets/stickers/add-notify.png";
import cartNotifyIcon from "@/assets/stickers/cart-notify.png";
import checkinNotifyIcon from "@/assets/stickers/checkin-notify.png";
import signupNotifyIcon from "@/assets/stickers/signup-notify.png";
import { Image } from "expo-image";
import { blurhash } from "@/constants/BlurHash";
import { FlashList } from "@shopify/flash-list";
import { Facebook } from "react-content-loader";

const data = [
  {
    title: "",
    type: "checkin",
  },
  {
    title: "",
    type: "add-customer",
  },
  {
    title: "",
    type: "approve",
  },
  {
    title: "",
    type: "sign-up",
  },
  {
    title: "",
    type: "cart",
  },
];

const RenderItem = ({item}: any) => (
  <View style={styles.contentNotify}>
        <View style={styles.overview}>
          <View style={styles.iconContainer}>
            <Image
              source={addNotifyIcon}
              alt=""
              style={styles.icon}
              placeholder={{ blurhash }}
              contentFit="fill"
              transition={1000}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.time}>16:26 25/05/2024</Text>
                        <Text style={styles.title}>25 người đăng ký sự kiện</Text>

          </View>
          <View style={styles.dot}></View>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </View>
)

const Notifications = () => {
  useWarmUpBrowser();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FlashList
      data={data}
      renderItem={({ item }) => <RenderItem item={item} />}
      estimatedItemSize={200}
      showsVerticalScrollIndicator={false}
      // ListEmptyComponent={() => <Facebook />}
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
    gap: 10
  },
  contentNotify: {
    height: 128,
    backgroundColor: "white",
    flex: 1,
    padding: 16,
    gap: 12,
    borderRadius: 12,
    marginTop: 15
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
    fontFamily: 'quicksand-light'
  },
  title: {
    fontFamily: 'quicksand-bold',
    fontSize: 16,
    lineHeight: 22.4
  }
});
