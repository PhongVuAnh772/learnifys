import {useEffect} from "react";
import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import {useAppDispatch, useAppSelector} from "@/redux/store";
import {setDeviceToken} from "@/redux/actions/app.action";
import useAuth from "@/hooks/useAuth";
import {PermissionsAndroid, Platform} from "react-native";
import notifee, {AndroidImportance, EventType, Event} from '@notifee/react-native'
import {useNavigation} from "@react-navigation/native";

export const getDeviceToken = async () => {
  const authorizationStatus = await messaging().requestPermission();
  if (authorizationStatus) {
    if (messaging().isDeviceRegisteredForRemoteMessages) {
      try {
        return await messaging().getToken();
      } catch (e) {
      }
    } else {
      try {
        await messaging().registerDeviceForRemoteMessages();
        const apnsToken = await messaging().getAPNSToken();
        if (apnsToken) {
          await messaging().setAPNSToken(apnsToken);
        }
        return await messaging().getToken();
      } catch (e) {
        console.log(e);
      }
    }
  }
};

export const NotificationHelper = () => {
  const dispatch = useAppDispatch();
  const {loggedIn} = useAuth();
  const {deviceToken} = useAppSelector(state => state.app);
  const navigation = useNavigation();

  useEffect(() => {
    if (!deviceToken) {
      getDeviceToken().then(token => {
        console.log('deviceToken', token);
        if (loggedIn && token) {
          dispatch(setDeviceToken(token));
        }
      });
    }
  }, [deviceToken, loggedIn]);

  useEffect(() => {
    checkPermission().then()
    if (loggedIn) {
      const unsubscribeNotifee = notifee.onForegroundEvent(message => {
        console.log(message)
        handleForegroundEvent(message, navigation);
      });

      const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log('remoteMessage', remoteMessage);
        await handleDisplayNotification(remoteMessage);

      });

      return () => {
        unsubscribe();
        unsubscribeNotifee();
      };
    }
  }, [loggedIn]);

  const checkPermission = async () => {
    if (Platform.OS !== 'ios') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    } else {
      await messaging().requestPermission();
    }
  };

  return <></>
}

export const handleDisplayNotification = async (
  message:
    | {
    notification: {
      title?: string;
      body?: string;
    };
    data?: any;
  }
    | FirebaseMessagingTypes.RemoteMessage,
) => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: message.notification?.title || '',
    body: message.notification?.body || '',
    data: message.data || {},
    android: {
      channelId,
      importance: AndroidImportance.HIGH,
      smallIcon: 'ic_notification',
      pressAction: {
        id: 'default',
      },
    },
  });
};

const handleForegroundEvent = (event: Event, navigation: any) => {
  // if (event.detail.notification?.data?.email) {
  //   if (event.type === EventType.PRESS) {
  //     // TODO navigate to mail detail
  //     return;
  //   }
  // } else {
  if (event.type === EventType.PRESS) {
    navigation.navigate('Notifications')
    return;
  }
  // }
  console.log('event', JSON.stringify(event));
};
