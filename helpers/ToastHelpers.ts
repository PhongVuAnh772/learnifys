import Toast, { ToastType } from "react-native-toast-message";

export const showToast = ({
  msg,
  subMsg,
  type,
  visibilityTime,
}: {
  msg: string;
  subMsg?: string;
  type: ToastType;
  visibilityTime?: number;
}) => {
  try {
    Toast.show({
      type: type,
      text1: msg,
      text2: subMsg,
      visibilityTime: visibilityTime,
    });
  } catch (error) {
    console.log("Show Toast error", error);
  }
};
