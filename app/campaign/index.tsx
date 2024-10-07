import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import i18n from "@/translations";
import SearchBar from "@/components/Search/SearchBar";
import ScreenHeader from "@/atoms/HeaderComponent";
import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ButtonAdd from "@/components/Button/ButtonAdd";
import CampaignList from "@/components/campaign/CampaignList";
import searchIcon from "@/assets/icons/search.png";
import { useTranslation } from "react-i18next";

const Campaign = () => {
   
  const { top } = useSafeAreaInsets();
  const handleEnterPress = () => {};
  const [value, setValue] = useState("");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScreenHeader
          canGoBack
          title={i18n.t("campaign")}
          style={[styles.header]}
          right={<ButtonAdd navigation="" />}
        />
        <SearchBar
          color="white"
          placeholder="Tìm kiếm"
          keyboardType="default"
          handleEnterPress={handleEnterPress}
          icon={searchIcon}
          value={value}
          setValue={setValue}
        />
        <Text style={styles.title}>{i18n.t("list-campaign")}</Text>
        <CampaignList />
      </View>
    </SafeAreaView>
  );
};

export default Campaign;

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
    paddingBottom: 15,
    paddingTop: 0,
  },
});
