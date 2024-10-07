import { StyleSheet, Text, View,Pressable } from "react-native";
import React from "react";
import i18n from "@/translations";
import { useTranslation } from "react-i18next";

interface EmptyRenderProps {
  message: string;
  message_action: string;
  action: () => void;
}

const EmptyRenderFlatlist = ({ message,message_action, action }: EmptyRenderProps) => {
   
  return (
    <View style={styles.emptytextHeader}>
      <Text style={styles.emptyMessage}>{i18n.t(message)}</Text>
      <Pressable onPress={action} style={styles.button}>
        <Text style={styles.emptyMessageButton}>{i18n.t(message_action)}</Text>
      </Pressable>
    </View>
  );
};

export default EmptyRenderFlatlist;

const styles = StyleSheet.create({
  emptytextHeader: {
    flex: 1,
    alignItems: "center",
    gap: 20,
    paddingTop: '50%'
  },
  emptyMessage: {
    fontFamily:"quicksand-bold",
    fontSize: 17,
    textAlign: "center",
    paddingHorizontal: 15
  },
  button: {
        backgroundColor:"#D80100",
        borderRadius:32,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "rgb(227, 144, 144)",
        borderWidth:3,
        paddingHorizontal: 15,
        paddingVertical: 8
  },
  emptyMessageButton: {
    fontFamily:"quicksand-bold",
    fontSize: 17,
    textAlign: "center",
    paddingHorizontal: 15,
    color: "white",
  }
});
