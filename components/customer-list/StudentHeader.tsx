import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import i18n from "@/translations";
import ButtonAdd from "@/components/Button/ButtonAdd";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
const StudentHeader = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Quản lý học sinh</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StudentHeader;

const styles = StyleSheet.create({
  container: {
    height: 200,
    paddingHorizontal: 16,
    paddingTop: 15,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontFamily: "quicksand-bold",
  },
});
