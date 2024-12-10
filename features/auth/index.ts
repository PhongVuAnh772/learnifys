import { ImageSourcePropType } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import loginSticker from "@/assets/stickers/loading.png";
import { useEffect, useState } from "react";
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { usePathname } from "expo-router";
import { ExpoRouter } from "expo-router/types/expo-router";
import { supabase } from "@/supabase";
import * as WebBrowser from "expo-web-browser";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import { storage } from "@/mmkv";
import Toast from "react-native-toast-message";

export enum Strategy {
  Google = "oauth_google",
  Github = "oauth_github",
  Facebook = "oauth_facebook",
}

GoogleSignin.configure({
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  webClientId:
    "966849267872-ui30rjss2nkrfal240vkb7hjptodre31.apps.googleusercontent.com",
  iosClientId:
    "966849267872-6ilbh0ul236kfslupu200hvdkfg7l1lj.apps.googleusercontent.com",
});

export const useAuthViewModel = (
  show: (
    title?: string | undefined,
    description?: string | undefined,
    image?: ImageSourcePropType | undefined
  ) => void,
  hide: () => void,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
  hideLoadingContent: () => void,
  showLoadingContent: () => void,
  router: ExpoRouter.Router,
  redirectTo: any
) => {
  const [confirm, setConfirm] = useState(null);
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [registerEmail, setRegisterEmail] = useState('')

  const [registerPassword, setRegisterPassword] = useState('')


  const createSessionFromUrl = async (url: string) => {
    const { params, errorCode } = QueryParams.getQueryParams(url);

    if (errorCode) throw new Error(errorCode);
    const { access_token, refresh_token } = params;

    if (!access_token) return;

    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });
    createUserToDataBase(data);
    setTimeout(() => {
      hide();
    }, 1500);
    if (error) throw error;
    return data.session;
  };

  const handlePositionNavigate = () => {
    router.navigate("choosing");
  };

  async function signUpWithCommonAuth() {
    const { data, error } = await supabase.auth.signUp({
      email: registerEmail,
      password: registerPassword,
    });
    showLoadingContent()
    if (error !== null) {
      hideLoadingContent()
      Toast.show({
        type: 'error',
        text1: 'Đăng nhập thất bại,hãy thử lại',
      });
      return;
    }
    hideLoadingContent()
    console.log(data)
  }
  async function signInWithCommonAuth() {
    showLoadingContent()
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });
    if (error !== null) {
      hideLoadingContent()
      Toast.show({
        type: 'error',
        text1: 'Đăng nhập thất bại, hãy thử lại',
      });
      return;
    }
    console.log(data)
    hideLoadingContent()
  }
  async function signInWithFacebook() {
    show("login-loading-title", "login-loading-description", loginSticker);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: redirectTo,
        skipBrowserRedirect: true,
      },
    });
    if (error !== null) {
      hide();
      Toast.show({
        type: 'error',
        text1: 'Đăng nhập thất bại,hãy thử lại',
      });
    }

    const res = await WebBrowser.openAuthSessionAsync(
      data?.url ?? "",
      redirectTo
    );

    if (res.type === "success") {
      const { url } = res;

      await createSessionFromUrl(url);
    }
  }

  const performOAuthWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("userInfo", userInfo);

      if (userInfo.data?.idToken) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: userInfo.data?.idToken,
        });

        console.log(error, data);
        console.log(userInfo.data?.idToken);
      } else {
        throw new Error("no ID token present!");
      }
    } catch (error) {
      throw new Error("no ID token present!");
    }
  };

  const createUserToDataBase = async (dataUser: any) => {
    const { data, error } = await supabase
      .from("users")
      .insert(
        { email: dataUser?.user?.email, role: storage.getString("role"), login_with: "facebook", device_token: "", password: "" },
      )
      .select();
    console.log(data, error, "createUserToDataBase")
  };

  const performOAuthWithGithub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: redirectTo,
        skipBrowserRedirect: true,
      },
    });
    console.log(data);
    if (error) throw error;

    const res = await WebBrowser.openAuthSessionAsync(
      data?.url ?? "",
      redirectTo
    );

    if (res.type === "success") {
      show();
      const { url } = res;
      await createSessionFromUrl(url);
      setTimeout(() => {
        hide();
      }, 1500);
    }
  };

  return {
    performOAuthWithGithub,
    confirm,
    setConfirm,
    Strategy,
    performOAuthWithGoogle,
    signInWithFacebook,
    signUpWithCommonAuth,
    handlePositionNavigate,
    setLoginEmail,
    setLoginPassword,
    setRegisterEmail,
    setRegisterPassword,
    signInWithCommonAuth,
    loginEmail,
    loginPassword,
    registerEmail,
    registerPassword
  };
};
