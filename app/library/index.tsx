import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useEffect } from "react";
import { Link, useRouter } from "expo-router";
import i18n from "@/translations";
import ScreenHeader from "@/atoms/HeaderComponent";
import ButtonAdd from "@/components/Button/ButtonAdd";
import OrderHeader from "@/screens/tabs/message/Header/MessageHeader";
import TrainingList from "@/components/training-list/CustomerList";
import { useTranslation } from "react-i18next";

const LibraryScreen = () => {
  const router = useRouter();
   
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <ScreenHeader
          canGoBack
          title={i18n.t("training")}
          style={[styles.header]}
        />
        <TrainingList />
      </View>
    </SafeAreaView>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "quicksand-bold",
  },
  addContainer: {
    padding: 8,
    gap: 10,
    borderRadius: 32,
    backgroundColor: "#D80100",
  },
  header: {
    paddingBottom: 10,
  },
});
