import agencyIcon from "@/assets/icons/agency.png";
import editIcon from "@/assets/icons/edit.png";
import logoutIcon from "@/assets/icons/logout.png";
import myQRIcon from "@/assets/icons/my-qr.png";
import passwordIcon from "@/assets/icons/password.png";
import loginSticker from "@/assets/stickers/loading.png";
import locationIcon from "@/assets/icons/location.png";
import { useAuth } from "@/auth/ctx";
import { handleLogout as logoutThunk } from "@/redux/actions/auth.action";
import { useAppDispatch } from "@/redux/store";
import i18n from "@/translations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useLoadingOverlay } from "../loading/LoadingOverlay";
import ActionUser from "./ActionUser";

const ActionForUser = () => {
  const dispatch = useAppDispatch();
  const { show, hide } = useLoadingOverlay();
  const { signOut, session } = useAuth();
  const [isSwitchOnLocation, setIsSwitchOnLocation] = React.useState(false);
  const onToggleSwitchLocation = () =>
    setIsSwitchOnLocation(!isSwitchOnLocation);
  const handleLogout = async () => {
    show("logout-loading-title", "logout-loading-description", loginSticker);
    signOut?.();
    setTimeout(() => {
      hide();
    }, 1500);
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
        <ActionUser
          usingSwitch
          icon={locationIcon}
          title="enable-location"
          action={handleLogout}
          onToggleSwitchLocation={onToggleSwitchLocation}
          isSwitchOnLocation={isSwitchOnLocation}
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
