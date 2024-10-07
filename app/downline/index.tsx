import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import i18n from "@/translations";
import SearchBar from "@/components/Search/SearchBar";
import DownlineList from "@/components/downline/DownlineList";
import ScreenHeader from "@/atoms/HeaderComponent";
import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ButtonAdd from "@/components/Button/ButtonAdd";
import searchIcon from "@/assets/icons/search.png";
import {  useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

const Downline = () => {
  const router = useRouter()
  const { top } = useSafeAreaInsets();
  const [value, setValue] = useState("");
  const handleNavigation = () => {
    router.push("create-downline")
  }
   

  const handleEnterPress = () => {};
  return (
    <View style={styles.container}>
      <ScreenHeader
        canGoBack
        title={i18n.t("downline-system")}
        style={[styles.header]}
        right={<ButtonAdd navigation={handleNavigation} />}
      />
      <SearchBar
        color="white"
        placeholder="Tìm kiếm"
        keyboardType="default"
        handleEnterPress={handleEnterPress}
        value={value}
        setValue={setValue}
        icon={searchIcon}
      />
      <Text style={styles.title}>{i18n.t("list-downline-systems")}</Text>
      <DownlineList />
    </View>
  );
};

export default Downline;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f3f4",
    paddingTop: 30,
    paddingHorizontal: 16,
  },
  title: {
    paddingTop: 20,
    paddingBottom: 10,
    fontFamily: "quicksand-light",
  },
  header: {
    paddingBottom: 10,
  },
});
