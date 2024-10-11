import React, { ReactNode } from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { BaseToastProps } from "react-native-toast-message";
import {
  ToastErrorSvgIcon,
  ToastInfoSvgIcon,
  ToastSuccessSvgIcon,
} from "./icons";

type ToastViewType = {
  props: BaseToastProps;
  icon: ReactNode;
  currentStyles: StyleProp<ViewStyle>;
};

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: 0.5,
    alignItems: "center",
  },
  success: {
    backgroundColor: "green",
    borderColor: "green",
  },
  error: {
    backgroundColor: "red",
    borderColor: "red",
  },
  warning: {
    backgroundColor: "yellow",
    borderColor: "yellow",
  },
});

const ToastView: React.FC<ToastViewType> = ({ props, icon, currentStyles }) => {
  return (
    <View style={[{ paddingHorizontal: 25, width: "100%" }]}>
      <View style={[styles.container, currentStyles, { flexDirection: "row" }]}>
        <View style={{ marginHorizontal: 15 }}>{icon}</View>
        <View style={{ flex: 1 }}>
          {typeof props.text1 === "string" ? <Text>{props.text1}</Text> : null}
          {typeof props.text2 === "string" ? <Text>{props.text2}</Text> : null}
        </View>
      </View>
    </View>
  );
};

const ToastConfig = {
  success: (props: BaseToastProps) => (
    <ToastView
      props={props}
      icon={ToastSuccessSvgIcon}
      currentStyles={styles.success}
    />
  ),
  error: (props: BaseToastProps) => (
    <ToastView
      props={props}
      icon={ToastErrorSvgIcon}
      currentStyles={styles.error}
    />
  ),
  info: (props: BaseToastProps) => (
    <ToastView
      props={props}
      icon={ToastInfoSvgIcon}
      currentStyles={styles.warning}
    />
  ),
};

export default ToastConfig;
