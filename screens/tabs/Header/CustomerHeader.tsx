import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import React from 'react';
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import i18n from "@/translations";
import ButtonAdd from "@/components/Button/ButtonAdd";
import { useTranslation } from "react-i18next";

const CustomerHeader = () => {
   
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: insets.top }}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{i18n.t("customer")}</Text>
          <ButtonAdd navigation="" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CustomerHeader;

const styles = StyleSheet.create({
  container: {
    height: 200,
    paddingHorizontal: 16,
    paddingTop: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontFamily: 'quicksand-bold',
  },
});
