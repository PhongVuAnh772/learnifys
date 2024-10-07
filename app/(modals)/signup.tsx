import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import i18n from "@/translations";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { defaultStyles } from "@/constants/Styles";
import AskingSignUp from "@/components/asking/AskingSignUp";

enum Strategy {
  Google = "oauth_google",
  Github = "oauth_github",
  Facebook = "oauth_facebook",
}

const Page = () => {
  useWarmUpBrowser();
  const router = useRouter();
   
  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />

      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>{i18n.t("continue")}</Text>
      </TouchableOpacity>
      <View style={styles.askingSignUpContainer}><AskingSignUp /></View>

      <View style={styles.seperatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.seperator}>{i18n.t("or")}</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>

      <View style={{ gap: 20 }}>
        <TouchableOpacity style={styles.btnOutline}>
          <Ionicons
            name="mail-outline"
            size={24}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>
            {i18n.t("continue-with-phone")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 26,
  },

  seperatorView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 30,
  },
  seperator: {
    fontFamily: "cereal-medium",
    color: Colors.grey,
    fontSize: 16,
  },
  btnOutline: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "cereal-medium",
  },
  askingSignUpContainer: {
    marginLeft: -20,
    paddingTop: 5
  }
});
