import { StyleSheet, Text, View } from "react-native";
import React from "react";
import i18n from "@/translations";
import ActionUser from "./ActionUser";
import editIcon from "@/assets/icons/edit.png";
import logoutIcon from "@/assets/icons/logout.png";
import boxIcon from "@/assets/icons/box.png";
import agencyIcon from "@/assets/icons/agency.png";
import myQRIcon from "@/assets/icons/my-qr.png";
import passwordIcon from "@/assets/icons/password.png";
import { useAppDispatch } from "@/redux/store";
import { handleLogout as logoutThunk } from "@/redux/actions/auth.action";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLoadingOverlay } from "../loading/LoadingOverlay";
import loginSticker from "@/assets/stickers/loading.png";
import { useNavigation } from "expo-router";
import { useTranslation } from "react-i18next";

const ActionForUser = () => {
  const dispatch = useAppDispatch();
  const { show, hide } = useLoadingOverlay();
   
  const navigation = useNavigation();
  const handleLogout = async () => {
    show("logout-loading-title", "logout-loading-description", loginSticker);

    try {
      const accessToken = await AsyncStorage.getItem("tokens");
      if (accessToken) {
        await dispatch(logoutThunk({ accessToken })).unwrap();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      hide();
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "(modals)/login",
          } as any,
        ],
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t("individual")}</Text>
      <View style={styles.actionContainer}>
        <ActionUser
          icon={editIcon}
          title="changing-information"
          navigation="(modals)/information"
        />
        <ActionUser
          icon={boxIcon}
          title="retail-order-user"
          navigation="calendars"
        />
        <ActionUser
          icon={agencyIcon}
          title="agencyOrder"
          navigation="(tabs)/message"
        />
        <ActionUser icon={myQRIcon} title="my-qr-code" navigation="qr/index" />
        <ActionUser
          icon={passwordIcon}
          title="changing-password"
          navigation="(modals)/information"
        />
        <ActionUser icon={logoutIcon} title="log-out" action={handleLogout} />
      </View>
    </View>
  );
};

export default ActionForUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontFamily: "quicksand-light",
    fontSize: 14,
  },
  actionContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
    gap: 24,
    marginTop: 10,
    borderRadius: 16,
  },
});
