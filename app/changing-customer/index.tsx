import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import ScreenHeader from "@/atoms/HeaderComponent";
import i18n from "@/translations";
import { Image } from "expo-image";
import { blurhash } from "@/constants/BlurHash";
import SearchBar from "@/components/Search/SearchBar";
import PrimaryButton from "@/atoms/PrimaryButton";
import { useAppSelector } from "@/redux/store";
import cameraIcon from "@/assets/icons/change-avatar.png";
import DropdownPicker from "../common/DropdownPicker";
import { gender } from "@/assets/data/gender";
import DateTimePicker from "@/common/DateTimePicker";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { getTokenFromState } from "@/auth/ctx";
import { fetchGroupCustomer } from "@/services/group.service";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";

const CreatingCustomer = () => { 
  const isMoreIconPressed = useLocalSearchParams();
  const user = useAppSelector((state) => state.auth.account);
  const token = getTokenFromState();
  const [contentName, setContentName] = useState<string>(isMoreIconPressed?.full_name as string);
  const [valueActionDropdown, setValueActionDropdown] = useState(isMoreIconPressed.sex ? '0' : '1');
  const [loading, setLoading] = useState(false);
  const [openActionDropdown, setOpenActionDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [valueDatePicker, setValueDatePicker] = useState(new Date());
  const handleContinue = () => {};
  const onChangeDate = (event: DateTimePickerEvent, date?: Date) => {
    setValueDatePicker(date || new Date());
  };
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result?.assets[0]?.uri as any);
    }
  };

  useEffect(() => {
    (async () => {
      const response = await fetchGroupCustomer(token as any);
      if (response) {
        console.log(response?.data?.listData[0]);
      }
    })();
  }, []);

  return (
    <React.Fragment>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScreenHeader
          canGoBack
          title={i18n.t("fixing-customer")}
          style={[styles.header]}
        />
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          nestedScrollEnabled={true}
        >
          <View style={styles.overlay}>
            <View style={styles.userContainer}>
              <Image
                source={{
                  uri: image ? image : user?.info_member?.avatar,
                }}
                style={styles.avatar}
                alt=""
                placeholder={{ blurhash }}
                contentFit="fill"
                transition={1000}
              />
              <Pressable style={styles.changingAvatar} onPress={pickImage}>
                <Image
                  source={cameraIcon}
                  style={styles.icon}
                  alt=""
                  placeholder={{ blurhash }}
                  contentFit="fill"
                  transition={1000}
                />
              </Pressable>
            </View>
            <View style={{ gap: 10 }}>
              <Text style={styles.label}>{i18n.t("full-name")}</Text>
              <SearchBar
                placeholder={i18n.t("typing-title")}
                keyboardType="default"
                color="white"
                value={contentName}
                setValue={setContentName}
                inputStyles={styles.input}
              />
            </View>
            <View style={{ gap: 10, zIndex: 500 }}>
              <Text style={styles.label}>{i18n.t("gender")}</Text>
              <DropdownPicker
                data={gender}
                opening={openActionDropdown}
                onOpen={setOpenActionDropdown}
                value={valueActionDropdown}
                setValue={setValueActionDropdown}
                loading={loading}
                setLoading={setLoading}
                placeholder="gender-placeholder"
              />
            </View>
            <View style={{ gap: 10 }}>
              <Text style={styles.label}>{i18n.t("phone")}</Text>
              <SearchBar
                placeholder={i18n.t("typing-title")}
                keyboardType="default"
                color="white"
                value={contentName}
                setValue={setContentName}
                inputStyles={styles.input}
              />
            </View>
            <View style={{ gap: 10 }}>
              <Text style={styles.label}>{i18n.t("present-address")}</Text>
              <SearchBar
                placeholder={i18n.t("typing-title")}
                keyboardType="default"
                color="white"
                value={contentName}
                setValue={setContentName}
                inputStyles={styles.input}
              />
            </View>
            <View style={{ gap: 10 }}>
              <Text style={styles.label}>{i18n.t("email")}</Text>
              <SearchBar
                placeholder={i18n.t("typing-title")}
                keyboardType="default"
                color="white"
                value={contentName}
                setValue={setContentName}
                inputStyles={styles.input}
              />
            </View>
            <View style={{ gap: 10, zIndex: 300 }}>
              <Text style={styles.label}>{i18n.t("date-of-birth")}</Text>

              <DateTimePicker
                minimumDate={new Date()}
                value={valueDatePicker as any}
                onChange={onChangeDate}
                show={showDatePicker}
                setShow={setShowDatePicker}
              />
            </View>
            <View style={{ gap: 10, zIndex: 500 }}>
              <Text style={styles.label}>{i18n.t("group-customer")}</Text>
              <DropdownPicker
                data={gender}
                opening={openActionDropdown}
                onOpen={setOpenActionDropdown}
                value={valueActionDropdown}
                setValue={setValueActionDropdown}
                loading={loading}
                setLoading={setLoading}
                placeholder="gender-placeholder"
              />
            </View>
            <View style={{ gap: 10 }}>
              <Text style={styles.label}>{i18n.t("facebook-page")}</Text>
              <SearchBar
                placeholder={i18n.t("typing-title")}
                keyboardType="default"
                color="white"
                value={contentName}
                setValue={setContentName}
                inputStyles={styles.input}
              />
            </View>
          </View>
        </ScrollView>
        <PrimaryButton
          style={styles.button}
          mode="contained"
          onPress={handleContinue}
        >
          {i18n.t("save-infomation")}
        </PrimaryButton>
      </KeyboardAvoidingView>
    </React.Fragment>
  );
};

export default CreatingCustomer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
  },
  nameSpecifiedContainer: {
    flexDirection: "row",
    gap: 5,
  },
  iconVerified: {
    width: 24,
    height: 24,
  },
  nameuser: {
    fontSize: 16,
    fontFamily: "quicksand-bold",
    marginTop: Platform.OS === "android" ? -3 : 3,
  },
  changingAvatar: {
    width: 36,
    height: 36,
    backgroundColor: "white",
    borderRadius: 1000,
    position: "absolute",
    bottom: -5,
    right: "35%",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    height: "15%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 20,
    height: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "space-between",
    zIndex: 2,
  },
  overlay: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 24,
    gap: 24,
    height: "100%",
    zIndex: 2,
    paddingBottom: 100,
  },
  nameContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfoContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  phoneUser: {
    lineHeight: 19.6,
    fontFamily: "quicksand-light",
    fontSize: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 1000,
  },
  label: {
    fontFamily: "quicksand-bold",
  },
  input: {
    borderColor: "#BDC1C6",
    borderWidth: 1,
  },
  button: {
    position: "absolute",
    bottom: 10,
    width: "95%",
    height: 54,
    borderRadius: 1000,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D80100",
    left: 10,
  },
});
