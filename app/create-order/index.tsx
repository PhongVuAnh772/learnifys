import verifiedIcon from "@/assets/icons/verified.png";
import ScreenHeader from "@/atoms/HeaderComponent";
import PrimaryButton from "@/atoms/PrimaryButton";
import DateTimePicker from "@/common/DateTimePicker";
import SearchBar from "@/components/Search/SearchBar";
import { blurhash } from "@/constants/BlurHash";
import i18n from "@/translations";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DropdownPicker from "../common/DropdownPicker";

const CreatingAppointment = () => {
  const params = useLocalSearchParams();
  const { itemString } = params;
  const item = itemString ? JSON.parse(itemString as any) : null;
  const [contentValue, setContentValue] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [valueDatePicker, setValueDatePicker] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const onChangeDate = (event: DateTimePickerEvent, date?: Date) => {
    setValueDatePicker(date || new Date());
  };

  return (
    <React.Fragment>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
      >
        <ScreenHeader
          canGoBack
          title={i18n.t("make-appointment")}
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
                  uri: item.avatar,
                }}
                style={styles.avatar}
                alt=""
                placeholder={{ blurhash }}
                contentFit="fill"
                transition={1000}
              />
              <View style={styles.userInfoContainer}>
                <View style={styles.nameContainer}>
                  <View style={styles.nameSpecifiedContainer}>
                    <Text style={styles.nameuser}>{item.full_name}</Text>
                    <Image
                      source={verifiedIcon}
                      style={styles.iconVerified}
                      alt=""
                      placeholder={{ blurhash }}
                      contentFit="fill"
                      transition={1000}
                    />
                  </View>
                </View>
                <Text style={styles.phoneUser}>{item.phone}</Text>
              </View>
            </View>
            <View style={{ gap: 10 }}>
              <Text style={styles.label}>{i18n.t("time-caring")}</Text>

              <DateTimePicker
                minimumDate={new Date()}
                value={valueDatePicker as any}
                onChange={onChangeDate}
                show={showDatePicker}
                setShow={setShowDatePicker}
              />
            </View>
            <View style={{ gap: 10 }}>
              <Text style={styles.label}>{i18n.t("action-caring")}</Text>
              <DropdownPicker
                data={items}
                opening={open}
                onOpen={setOpen}
                value={value}
                setValue={setValue}
                loading={loading}
                setLoading={setLoading}
                placeholder=""
              />
            </View>
            <View style={{ gap: 10 }}>
              <Text style={styles.label}>{i18n.t("status")}</Text>
              <DropdownPicker
                data={items}
                opening={open}
                onOpen={setOpen}
                value={value}
                setValue={setValue}
                loading={loading}
                setLoading={setLoading}
                placeholder=""
              />
            </View>
            <View style={{ gap: 10 }}>
              <Text style={styles.label}>{i18n.t("content-caring")}</Text>
              <SearchBar
                placeholder={i18n.t("typing-title")}
                keyboardType="numeric"
                color="white"
                value={contentValue}
                setValue={setContentValue}
                maxLength={10}
                inputStyles={styles.input}
              />
            </View>
          </View>
        </ScrollView>
        <PrimaryButton
          style={styles.button}
          mode="contained"
          // onPress={handleContinue}
        >
          {i18n.t("continue")}
        </PrimaryButton>
      </KeyboardAvoidingView>
    </React.Fragment>
  );
};

export default CreatingAppointment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  header: {
    paddingBottom: 10,
    paddingHorizontal: 12,
    height: "10%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
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
  },
  phoneUser: {
    lineHeight: 19.6,
    fontFamily: "quicksand-light",
    fontSize: 15,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
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
