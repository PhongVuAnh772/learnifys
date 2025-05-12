import PrimaryButton from "@/atoms/PrimaryButton";
import Greeting from "@/components/greeting/Greeting";
import { useLoadingOverlay } from "@/components/loading/LoadingOverlay";
import SearchBar from "@/components/Search/SearchBar";
import i18n from "@/translations";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import facebookLogo from "@/assets/icons/facebook.png";
import githubLogo from "@/assets/icons/git-hub.png";
import googleLogo from "@/assets/icons/google.png";
import { useLoadingContent } from "@/components/loading/LoadingContent";
import { Strategy, useAuthViewModel } from "@/features/auth";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import Toast from "react-native-toast-message";
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
  const [errorMessage] = useState<string | null>(null);
  const { hideLoadingContent, showLoadingContent } = useLoadingContent();

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
    signInWithCommonAuth,
    setLoginEmail,
    setLoginPassword,
    loginEmail,
    loginPassword,
    loginWithBackendAPI,
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
          placeholder={"Hãy nhập Email của bạn"}
          keyboardType="default"
          color="white"
          value={loginEmail}
          setValue={setLoginEmail}
          icon={<Feather name="phone" size={18} color="#A5A5A9" />}
          inputStyles={styles.input}
        />
        <SearchBar
          placeholder={i18n.t("password")}
          keyboardType="default"
          color="white"
          handleEnterPress={signInWithCommonAuth}
          value={loginPassword}
          setValue={setLoginPassword}
          icon={<Ionicons name="key-outline" size={18} color="#A5A5A9" />}
          inputStyles={styles.input}
          secureTextEntry
        />
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        <PrimaryButton
          style={{
            height: 54,
            borderRadius: 1000,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#D80100",
            width: "100%",
            alignSelf: "center",
            marginBottom: 10,
          }}
          mode="contained"
          onPress={() => {
            if (loginEmail && loginPassword) {
              loginWithBackendAPI();
            } else {
              Toast.show({
                type: "error",
                text1: "Vui lòng nhập đầy đủ email và mật khẩu",
              });
            }
          }}
          textColor="white"
        >
          {i18n.t("continue")}
        </PrimaryButton>

        <View style={[styles.wrapSocial, { alignItems: "center" }]}>
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
            width: "100%",
            alignSelf: "center",
          }}
          mode="contained"
          onPress={() => router.push("(modals)/register" as any)}
        >
          <Text style={{ color: "black" }}>{i18n.t("register")}</Text>
        </PrimaryButton>
      </Greeting>
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
    paddingHorizontal: 5,
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
