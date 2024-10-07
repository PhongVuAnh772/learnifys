import { AuthProvider } from "@/auth/ctx";
import { ToastProvider } from "@/common/ToastProvider";
import ButtonAdd from "@/components/Button/ButtonAdd";
import { LoadingContentProvider } from "@/components/loading/LoadingContent";
import { LoadingOverlayProvider } from "@/components/loading/LoadingOverlay";
import Colors from "@/constants/Colors";
import { usePushNotifications } from "@/hooks/useNotificationHelper";
import { store } from "@/redux/store";
import i18n from "@/translations/index";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import "expo-dev-client";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  UIManager,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";
import { Switch } from "react-native-switch";
import { Provider } from "react-redux";
import * as Notifications from "expo-notifications";
import { NotificationProvider } from "@/components/notifications";
import { AndroidNotificationPriority } from "expo-notifications";

SplashScreen.preventAutoHideAsync();

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

Notifications.setNotificationHandler({
  handleNotification: async (notification: any) => {
    console.log(notification)
    const isManualAndroidNotification = Platform.OS === 'android' && !notification.request.trigger;
    if (Platform.OS === 'android' && notification.request.trigger) {
      const appNotification = notification.request.trigger['remoteMessage'].notification;
      await Notifications.scheduleNotificationAsync({
        content: {
          title: appNotification?.title || '',
          body: appNotification?.body || '',
          sound: true,
        },
        trigger: null,
      });
    }

    return {
      shouldShowAlert: Platform.OS === 'ios' || isManualAndroidNotification,
      shouldPlaySound: Platform.OS === 'ios' || isManualAndroidNotification,
      shouldSetBadge: false,
    };
  },
});

export default function RootLayout() {
  const router = useRouter();
  const [loaded, error] = useFonts({
    "quicksand-bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "quicksand-light": require("../assets/fonts/Quicksand-Light.ttf"),
    "quicksand-medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "quicksand-regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "quicksand-semiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "manrope-bold": require("../assets/fonts/Manrope-Bold.ttf"),
    "manrope-medium": require("../assets/fonts/Manrope-Medium.ttf"),
  });
  
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <NotificationProvider>
          <AuthProvider>
            <RootSiblingParent>
              <LoadingOverlayProvider>
                <LoadingContentProvider>
                  <ToastProvider>
                    {Platform.OS === "ios" && (
                      <StatusBar barStyle="light-content" />
                    )}
                    {Platform.OS === "android" && (
                      <StatusBar barStyle="light-content" />
                    )}
                    <RootLayoutNav />
                  </ToastProvider>
                </LoadingContentProvider>
              </LoadingOverlayProvider>
            </RootSiblingParent>
          </AuthProvider>
          </NotificationProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}

function RootLayoutNav() {
  const router = useRouter();

  return (
    <Stack initialRouteName="(modals)/loading">
      <Stack.Screen
        name="(modals)/loading"
        options={{
          title: i18n.t("login-title"),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(modals)/register"
        options={{
          animation: "slide_from_right",
          title: i18n.t("login-title"),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(modals)/login"
        options={{
          animation: "slide_from_bottom",
          title: i18n.t("login-title"),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="in-call/index"
        options={{
          title: i18n.t("login-title"),
          headerShown: false,
        }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/information"
        options={{
          presentation: "modal",
          title: i18n.t("changing-information"),
          headerTitleStyle: {
            fontFamily: "quicksand-bold",
          },

          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="(modals)/notification"
        options={{
          presentation: "modal",
          title: i18n.t("notifications"),
          headerTitleStyle: {
            fontFamily: "quicksand-bold",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.button}
            >
              <Entypo name="chevron-small-left" size={28} color="black" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: "rgb(241, 243, 244)",
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.buttonNotification}
            >
              <Ionicons name="checkmark-done" size={28} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      {/* <Stack.Screen
        name="(modals)/signup"
        options={{
          animation: "fade",
          title: i18n.t("sign-up"),
          headerTitleStyle: {
            fontFamily: "quicksand-bold",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          ),
        }}
      /> */}
      <Stack.Screen
        name="(modals)/appointment"
        options={{
          animation: "slide_from_bottom",
          title: i18n.t("notifications"),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="downline/index"
        options={{
          animation: "slide_from_right",
          headerTransparent: true,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="messages/index"
        options={{
          animation: "slide_from_right",
          headerTransparent: true,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="campaign/index"
        options={{
          animation: "slide_from_right",
          headerTransparent: true,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="calendars/index"
        options={{
          animation: "slide_from_bottom",
          title: i18n.t("booking"),
          headerTransparent: true,
          headerTitleStyle: {
            fontFamily: "quicksand-bold",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.button}
            >
              <Entypo name="chevron-small-left" size={28} color="black" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: "rgb(241, 243, 244)",
          },
          headerRight: () => (
            <Switch
              value={false}
              onValueChange={(val) => console.log(val)}
              disabled={false}
              activeText={"On"}
              inActiveText={"Off"}
              circleSize={25}
              barHeight={25}
              circleBorderWidth={0}
              backgroundActive={"white"}
              backgroundInactive={"white"}
              circleActiveColor={"#27A376"}
              circleInActiveColor={"#27A376"}
              renderInsideCircle={() => {
                return true ? (
                  <AntDesign name="appstore-o" color="white" />
                ) : (
                  <Feather name="server" color="white" />
                );
              }}
              changeValueImmediately={true}
              innerCircleStyle={{
                alignItems: "center",
                justifyContent: "center",
              }}
              outerCircleStyle={{}}
              renderActiveText={false}
              renderInActiveText={false}
              switchLeftPx={2}
              switchWidthMultiplier={2}
              switchBorderRadius={30}
            />
          ),
        }}
      />
      <Stack.Screen
        name="training/index"
        options={{
          animation: "slide_from_right",
          headerTransparent: true,
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="(modals)/join"
        options={{
          presentation: "transparentModal",
          animation: "fade",
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                backgroundColor: "#fff",
                borderColor: Colors.grey,
                borderRadius: 20,
                borderWidth: 1,
                padding: 4,
              }}
            >
              <Ionicons name="close-outline" size={22} />
            </TouchableOpacity>
          ),
        }}
      /> */}
      {/* <Stack.Screen
        name="room/index"
        options={{
          animation: "slide_from_right",
          headerTransparent: true,
          headerShown: false,
        }}
      /> */}
      {/* <Stack.Screen
        name="call/index"
        options={{
          animation: "slide_from_right",
          headerTransparent: true,
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name="(modals)/booking"
        options={{
          presentation: "transparentModal",
          animation: "fade",
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                backgroundColor: "#fff",
                borderColor: Colors.grey,
                borderRadius: 20,
                borderWidth: 1,
                padding: 4,
              }}
            >
              <Ionicons name="close-outline" size={22} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="(modals)/searching"
        options={{
          presentation: "modal",
          title: i18n.t("searching"),
          headerTitleStyle: {
            fontFamily: "quicksand-bold",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.button}
            >
              <Entypo name="chevron-small-left" size={28} color="black" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: "rgb(241, 243, 244)",
          },
        }}
      />
      <Stack.Screen
        name="qr/[id]"
        options={{
          presentation: "transparentModal",
          animation: "fade_from_bottom",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="qr-recharge/index"
        options={{
          presentation: "transparentModal",
          animation: "fade_from_bottom",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="create-downline/index"
        options={{
          presentation: "transparentModal",
          animation: "fade_from_bottom",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="create-customer/index"
        options={{
          animation: "fade_from_bottom",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(modals)/history-caring"
        options={{
          animation: "fade_from_bottom",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="changing-customer/index"
        options={{
          animation: "fade_from_bottom",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="caring/[id]"
        options={{
          presentation: "transparentModal",
          title: i18n.t("history-caring"),
          headerTitleStyle: {
            fontFamily: "quicksand-bold",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.button}
            >
              <Entypo name="chevron-small-left" size={28} color="black" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: "rgb(241, 243, 244)",
          },
          headerRight: () => <ButtonAdd navigation={() => {}} />,
        }}
      />
      <Stack.Screen
        name="choosing/index"
        options={{
          presentation: "transparentModal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="category/index"
        options={{
          presentation: "transparentModal",
          animation: "slide_from_bottom",
          headerTransparent: true,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="recharge/index"
        options={{
          animation: "slide_from_right",
          headerTransparent: true,
          headerShown: false,
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 1000,
    marginRight: 10,
  },
  buttonNotification: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 1000,
  },
  statusBarUnderlay: {},
});
