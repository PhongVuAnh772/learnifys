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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { commonEnum } from "@/enum/keymap";

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
  const [loginEmail, setLoginEmail] = useState("phongadmin@gmail.com");
  const [loginPassword, setLoginPassword] = useState("22092002");
  const [registerEmail, setRegisterEmail] = useState("phongstudent1@gmail.com");
  const [registerPassword, setRegisterPassword] = useState("22092002");

  const loginWithBackendOAuth = async (email: string) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/login-with-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();
      if (result?.result) {
        console.log("OAuth backend login success", result.data);
      } else {
        console.log(
          "OAuth backend login failed",
          result.messageEN || result.messageVI
        );
      }
    } catch (err) {
      console.error("Error calling backend OAuth login:", err);
    }
  };

  const loginWithBackendAPI = async () => {
    showLoadingContent();
    try {
      const response = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const result = await response.json();
      hideLoadingContent();

      if (result?.result) {
        Toast.show({
          type: "success",
          text1: "Đăng nhập thành công!",
        });

        await AsyncStorage.setItem("userData", JSON.stringify(result));

        console.log("Backend login success", result.data);
        switch (result.data.roleId) {
          case commonEnum.roleId.STUDENT:
            router.replace("/(student)/(tabs)");
            break;
          case commonEnum.roleId.TEACHER:
            router.replace("/(teacher)/(tabs)");
            break;
          case commonEnum.roleId.ADMIN:
            router.replace("/(admin)");
            break;
          case commonEnum.roleId.PARENTS:
            router.replace("/(parents)/(tabs)");
            break;
          default:
            router.replace("/choosing");
        }
      } else {
        Toast.show({
          type: "error",
          text1: result?.messageVI || "Đăng nhập thất bại!",
        });
      }
    } catch (error) {
      hideLoadingContent();
      console.error("Backend login error:", error);
      Toast.show({
        type: "error",
        text1: "Có lỗi xảy ra!",
      });
    }
  };

  const createSessionFromUrl = async (url: string) => {
    const { params, errorCode } = QueryParams.getQueryParams(url);
    if (errorCode) throw new Error(errorCode);
    const { access_token, refresh_token } = params;
    if (!access_token) return;

    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    if (error) throw error;

    await createUserToDataBase(data);
    await loginWithBackendOAuth(data?.user?.email ?? "");
    setTimeout(() => {
      hide();
    }, 1500);

    return data.session;
  };

  const handlePositionNavigate = () => {
    router.navigate("choosing");
  };

  async function signUpWithCommonAuth() {
    const role = storage.getString("role") as string;

    const profileData = {
      email: registerEmail,
      password: registerPassword,
      roleId: role,
      language: "vi",
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        return;
      }

      Toast.show({
        type: "success",
        text1: "Đăng ký thành công! Vui lòng nhập thêm thông tin",
      });
      router.push({
        pathname: "/(modals)/register-info",
        params: {
          registerEmail,
          registerPassword,
          roleId: role,
        },
      });
      // router.replace("/(modals)/login");
    } catch (error) {
      console.error("Submit error:", error);
    }
  }

  async function signInWithCommonAuth() {
    showLoadingContent();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });
    if (error !== null) {
      hideLoadingContent();
      Toast.show({
        type: "error",
        text1: "Đăng nhập thất bại, hãy thử lại",
      });
      return;
    }
    console.log(data);
    hideLoadingContent();
  }

  async function signInWithFacebook() {
    try {
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
          type: "error",
          text1: "Đăng nhập thất bại, hãy thử lại",
        });
        return;
      }

      const res = await WebBrowser.openAuthSessionAsync(
        data?.url ?? "",
        redirectTo
      );

      if (res.type === "success") {
        await createSessionFromUrl(res.url);
      }
    } catch {
      hide();
      Toast.show({
        type: "error",
        text1: "Đăng nhập thất bại!",
      });
    }
  }

  const performOAuthWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("userInfo", userInfo);
    } catch (error) {
      console.error("Google login error:", error);
      Toast.show({
        type: "error",
        text1: "Đăng nhập Google thất bại",
      });
    }
  };

  const createUserToDataBase = async (dataUser: any) => {
    if (!dataUser?.user?.email) {
      console.error("Email is missing from dataUser");
      return;
    }

    const email = dataUser.user.email;

    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error fetching user:", fetchError);
      return;
    }

    if (existingUser) {
      console.log("User already exists:", existingUser);
      return existingUser;
    }

    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert({
        email,
        role: storage.getString("role"),
        login_with: "facebook",
        device_token: "",
        password: "",
      })
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting user:", insertError);
      return;
    }

    console.log("User created:", newUser);
    return newUser;
  };

  const performOAuthWithGithub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: redirectTo,
        skipBrowserRedirect: true,
      },
    });

    if (error) {
      Toast.show({
        type: "error",
        text1: "Đăng nhập GitHub thất bại",
      });
      return;
    }

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
    registerPassword,
    loginWithBackendAPI,
  };
};
