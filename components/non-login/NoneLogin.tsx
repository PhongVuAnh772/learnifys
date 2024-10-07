import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import { defaultStyles } from "@/constants/Styles";
import LoginButton from "../Button/LoginButton";

interface Props {
  title: string;
  description_outstanding: string;
  description_extra: string;
}

const NoneLogin = ({
  title,
  description_outstanding,
  description_extra,
}: Props) => {
  return <View style={[ styles.container]}>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.descriptionView}>
          <Text style={styles.outstandingText}>{description_outstanding}</Text>

    <Text style={styles.extraText}>{description_extra}</Text>
    
    </View>
    <LoginButton />
  </View>;
};

export default NoneLogin;

const styles = StyleSheet.create({
  container: {
    paddingTop: "25%",
    paddingHorizontal: 20,
    
  },
  title: {
    fontSize: 30,
    fontFamily:"cereal-medium",
  },
  descriptionView: {
    paddingVertical: '10%'
  },
  outstandingText: {
    fontSize: 25,
    fontFamily:"cereal-medium",
    paddingBottom: 10
  },
  extraText: {
    fontSize: 17,
    fontFamily:"cereal-light",
  }
});
