import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import FeeCost from "./FeeCost";
import DropdownPicker from "@/app/common/DropdownPicker";
import i18n from "@/translations";
import PrimaryButton from "@/atoms/PrimaryButton";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import SearchBar from "../Search/SearchBar";
import { useTranslation } from "react-i18next";

interface ZaloFollowMessageProps {
  fee: number;
}

const ZaloFollowMessage: React.FC<ZaloFollowMessageProps> = ({ fee }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [items, setItems] = useState([
    {
      label: "Apple",
      value: "apple",
    },
    {
      label: "Banana",
      value: "banana",
    },
  ]);
   
  const handleEnterPress = () => {};
  return (
    <View style={styles.container}>
      <FeeCost fee={fee} />
      <View style={styles.picker}>
        <Text style={styles.label}>{i18n.t("notification-type")}</Text>
        <View style={styles.checkboxContainer}>
          <BouncyCheckbox
            size={20}
            fillColor="red"
            unFillColor="#FFFFFF"
            iconStyle={{ borderColor: "red" }}
            innerIconStyle={{ borderWidth: 1 }}
            textStyle={{ fontFamily: "JosefinSans-Regular" }}
            onPress={(isChecked: boolean) => {
              console.log(isChecked);
            }}
          />
          <Text style={styles.checkboxLabel}>
            {i18n.t("follow-OA")}
          </Text>
        </View>
        <View style={styles.checkboxContainer}>
          <BouncyCheckbox
            size={20}
            fillColor="red"
            unFillColor="#FFFFFF"
            iconStyle={{ borderColor: "red" }}
            innerIconStyle={{ borderWidth: 1 }}
            textStyle={{ fontFamily: "JosefinSans-Regular" }}
            onPress={(isChecked: boolean) => {
              console.log(isChecked);
            }}
          />
          <Text style={styles.checkboxLabel}>
            {i18n.t("interact-48h")}
          </Text>
        </View>
      </View>
      <View style={styles.picker}>
        <Text style={styles.label}>{i18n.t("notification-type")}</Text>
        <SearchBar
        placeholder={i18n.t("typing-title")}
        keyboardType="numeric"
        color="white"
        handleEnterPress={handleEnterPress}
        value={searchValue}
        setValue={setSearchValue}
        maxLength={10}
        // icon={<Ionicons name="key-outline" size={18} color="#A5A5A9" />}
        inputStyles={styles.input}
      />
      </View>
      <PrimaryButton
        style={{
          position: "absolute",
          bottom: 10,
          width: "100%",
          height: 54,
          borderRadius: 1000,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#D80100",
        }}
        mode="contained"
        // onPress={handleContinue}
      >
        {i18n.t("continue")}
      </PrimaryButton>
    </View>
  );
};

export default ZaloFollowMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  picker: {
    paddingVertical: 10,
    gap: 15,
  },
  label: {
    fontFamily: "quicksand-bold",
  },
  input: {
    borderColor: "#BDC1C6",
    borderWidth: 1,
  },
  checkboxContainer: {
    flexDirection: "row",
  },
  checkboxLabel: {
    fontFamily: "quicksand-medium",
    paddingTop:2
  }
});
