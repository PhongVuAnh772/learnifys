import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import FeeCost from "./FeeCost";
import DropdownPicker from "@/app/common/DropdownPicker";
import i18n from "@/translations";
import PrimaryButton from "@/atoms/PrimaryButton";
import SearchBar from "../Search/SearchBar";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

interface SMSMessageProps {
}

const SMSMessage: React.FC<SMSMessageProps> = () => {
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
      <View style={styles.picker}>
        <Text style={styles.label}>{i18n.t("notification-type")}</Text>
        <DropdownPicker
          data={items}
          opening={open}
          onOpen={setOpen}
          value={value}
          setValue={setValue}
          loading={loading}
          setLoading={setLoading}
        />
      </View>
      <View style={styles.picker}>
        <Text style={styles.label}>{i18n.t("notification-type")}</Text>
        <SearchBar
          placeholder={i18n.t("password")}
          keyboardType="numeric"
          color="white"
          handleEnterPress={handleEnterPress}
          value={searchValue}
          setValue={setSearchValue}
          maxLength={10}
          inputStyles={styles.input}
          secureTextEntry
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

export default SMSMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  picker: {
    paddingVertical: 10,
  },
  label: {
    fontFamily: "quicksand-bold",
    paddingBottom: 10,
  },
  input: {
    borderColor: "#BDC1C6",
    borderWidth: 1,
  },
});
