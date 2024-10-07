import { View, StyleSheet, Text, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter, useNavigation } from "expo-router";
import i18n from "@/translations";
import Greeting from "@/components/greeting/Greeting";
import SearchBar from "@/components/Search/SearchBar";
import PrimaryButton from "@/atoms/PrimaryButton";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useLoadingOverlay } from "@/components/loading/LoadingOverlay";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

import { useAuthViewModel, Strategy } from "@/features/auth";
import { useLoadingContent } from "@/components/loading/LoadingContent";
import googleLogo from "@/assets/icons/google.png";
import facebookLogo from "@/assets/icons/facebook.png";
import githubLogo from "@/assets/icons/git-hub.png";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
WebBrowser.maybeCompleteAuthSession();

interface Props {
  name: string;
  counting: number;
}
WebBrowser.maybeCompleteAuthSession(); // required for web only
const redirectTo = makeRedirectUri();

const Login: React.FC<Props> = ({ name, counting }) => {
  useWarmUpBrowser();
  const { show, hide } = useLoadingOverlay();
  const router = useRouter();
  const navigation = useNavigation();
  const [username, setUsername] = useState<string>("0816560000");
  const [password, setPassword] = useState<string>("123456");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { hideLoadingContent, showLoadingContent } = useLoadingContent();
  const [userInfo, setUserInfo] = useState();

  const discovery = {
    authorizationEndpoint: "https://github.com/login/oauth/authorize",
    tokenEndpoint: "https://github.com/login/oauth/access_token",
    revocationEndpoint: `https://github.com/settings/connections/applications/Ov23liOVyRodoWyLgcw8`,
  };

  const [response] = useAuthRequest(
    {
      clientId: `Ov23liOVyRodoWyLgcw8`,
      scopes: ["identity", "user:email", "user:follow"],
      redirectUri: makeRedirectUri(),
    },
    discovery
  );

  const handleResponse = () => {
    console.log(response);
  };

  React.useEffect(() => {
    handleResponse();
  }, [response]);

  const {
    performOAuthWithGithub,
    performOAuthWithGoogle,
    signInWithFacebook,
    signUpWithCommonAuth,
  } = useAuthViewModel(
    show,
    hide,
    navigation,
    hideLoadingContent,
    showLoadingContent,
    router,
    redirectTo
  );

  const renderButtonContent = (strategy: Strategy, iconName: any) => {
    return <Image source={iconName} style={styles.logo} />;
  };

  return (
    <>
      <Greeting
        title="login"
        description="greeting-login"
        otherDescription="invite-login"
        overlayDescription="overlay-login"
      >
        <SearchBar
          placeholder={i18n.t("your-phone")}
          keyboardType="default"
          color="white"
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
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </Greeting>
      <View
        style={{
          position: "absolute",
          bottom: 10,
          left: 10,
          width: "95%",
          height: "32%",
          justifyContent: "space-between",
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
          onPress={signUpWithCommonAuth}
        >
          {i18n.t("continue")}
        </PrimaryButton>
        <View
          style={[
            styles.wrapSocial,
            { gap: 15, alignItems: "center", paddingBottom: 15 },
          ]}
        >
          <View style={[styles.separator]} />
          <Text style={styles.separatorText}>{i18n.t("or")}</Text>
          <View style={[styles.separator]} />
        </View>
        <View
          style={[
            styles.wrapSocial,
            {
              gap: 25,
              alignItems: "center",
              paddingBottom: 15,
              justifyContent: "center",
            },
          ]}
        >
          <Pressable
            style={styles.logoContainer}
            onPress={() => performOAuthWithGithub()}
          >
            {renderButtonContent(Strategy.Github, githubLogo)}
          </Pressable>
          <Pressable
            style={styles.logoContainer}
            onPress={() => signInWithFacebook()}
          >
            {renderButtonContent(Strategy.Facebook, facebookLogo)}
          </Pressable>
          <Pressable
            style={styles.logoContainer}
            onPress={() => {
              performOAuthWithGoogle();
            }}
          >
            {renderButtonContent(Strategy.Google, googleLogo)}
          </Pressable>
        </View>
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
          onPress={() => router.push("(modals)/register" as any)}
        >
          <Text style={{ color: "black" }}>{i18n.t("register")}</Text>
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

export default React.memo(Login);
