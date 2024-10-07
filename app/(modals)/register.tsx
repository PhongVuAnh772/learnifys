import { View, StyleSheet, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { useRouter, useNavigation } from "expo-router";
import i18n from "@/translations";
import Greeting from "@/components/greeting/Greeting";
import SearchBar from "@/components/Search/SearchBar";
import PrimaryButton from "@/atoms/PrimaryButton";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useLoadingOverlay } from "@/components/loading/LoadingOverlay";
import { RootState, AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin } from "@/redux/actions/auth.action";
import useAsyncStorage from "@/hooks/useAsyncStorage";
import { useTranslation } from "react-i18next";
import { useAuthViewModel, Strategy } from "@/features/auth";
import { useLoadingContent } from "@/components/loading/LoadingContent";
import Typography from "@/atoms/Typography/Typography";
import googleLogo from "@/assets/icons/google.png";
import facebookLogo from "@/assets/icons/facebook.png";
import githubLogo from "@/assets/icons/git-hub.png";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { ActivityIndicator } from "react-native-paper";
import * as WebBrowser from 'expo-web-browser'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '@/firebase'
interface Props {
  name: string;
  counting: number;
}

const Register: React.FC<Props> = ({ name, counting }) => {
  useWarmUpBrowser();
  WebBrowser.maybeCompleteAuthSession()
  const { show, hide } = useLoadingOverlay();
  const router = useRouter();
  const navigation = useNavigation();
  const [username, setUsername] = useState<string>("vuanhphong555@gmail.com");
  const [password, setPassword] = useState<string>("123456");
  const [rePassword, setRePassword] = useState<string>("123456");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { hideLoadingContent, showLoadingContent } = useLoadingContent();
  const { error, loading } = useSelector((state: RootState) => state.auth);
  const { data, saveData, loadingStorage } = useAsyncStorage("tokens");
  const {
    handleLoginAction,
    confirm,
    setConfirm,
    signInWithPhoneNumber,
    loadingStrategy,
    handleRegisterAction,
    
  } = useAuthViewModel(
    show,
    hide,
    dispatch,
    navigation,
    hideLoadingContent,
    showLoadingContent,
    router,
    auth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
  );

    
  const renderButtonContent = (strategy: Strategy, iconName: any) => {
    const isLoading = loadingStrategy === strategy;
    return (
      <>
        {isLoading ? (
          <>
            <ActivityIndicator size="small" color="#D80100" />
          </>
        ) : (
          <>
            <Image source={iconName} style={styles.logo} />
          </>
        )}
      </>
    );
  };

  return (
    <>
      <Greeting
        title="register"
        description="greeting-register"
        otherDescription="invite-register"
      >
        <SearchBar
          placeholder={i18n.t("your-phone")}
          keyboardType="default"
          color="white"
          // handleEnterPress={handleEnterPress}
          value={username}
          setValue={setUsername}
          icon={<Feather name="phone" size={18} color="#A5A5A9" />}
          inputStyles={styles.input}
        />
        <SearchBar
          placeholder={i18n.t("password")}
          keyboardType="numeric"
          color="white"
          // handleEnterPress={handleEnterPress}
          value={password}
          setValue={setPassword}
          maxLength={10}
          icon={<Ionicons name="key-outline" size={18} color="#A5A5A9" />}
          inputStyles={styles.input}
          secureTextEntry
        />
        <SearchBar
          placeholder={i18n.t("password")}
          keyboardType="numeric"
          color="white"
          // handleEnterPress={handleEnterPress}
          value={password}
          setValue={setRePassword}
          maxLength={10}
          icon={<Ionicons name="key-outline" size={18} color="#A5A5A9" />}
          inputStyles={styles.input}
          secureTextEntry
        />
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </Greeting>
      <View
        style={{
          position: "absolute",
          bottom: 10,
          left: 10,
          width: "95%",
          justifyContent: "space-between",
          gap: 25
        }}
      >
        <PrimaryButton
          style={{
            height: 54,
            borderRadius: 1000,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#D80100",
            width: "95%",
            alignSelf: "center",
          }}
          mode="contained"
          onPress={() => handleRegisterAction(username, password, setErrorMessage)}
        >
          {i18n.t("continue")}
        </PrimaryButton>
        
        <PrimaryButton
          style={{
            height: 54,
            borderRadius: 1000,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#F1F3F4",
            width: "95%",
            alignSelf: "center",
          }}
          mode="contained"
          onPress={() => router.back()}
        >
          <Text style={{ color: "black" }}>{i18n.t("login")}</Text>
        </PrimaryButton>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    width: 24,
    height: 24,
  },
  signupText: {
    fontSize: 16,
    fontFamily: "quicksand-bold",
  },
  input: {
    borderColor: "#BDC1C6",
    borderWidth: 1,
  },
  error: {
    color: "red",
  },
  separator: {
    flex: 1,
    backgroundColor: "#DADCE0",
    height: 1,
  },
  wrapSocial: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separatorText: {
    color: "#DADCE0",
    fontFamily: "quicksand-bold",
    marginBottom: 5,
  },
  logo: {
    width: 24,
    height: 24,
  },
  logoContainer: {
    height: 60,
    width: 60,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 5,
  },
});

export default React.memo(Register);
