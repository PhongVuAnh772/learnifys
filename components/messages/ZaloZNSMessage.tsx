import { StyleSheet, View, Text,ScrollView } from "react-native";
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
    <>
    <ScrollView style={styles.container}>
      <FeeCost fee={fee} />
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
      </View><View style={styles.picker}>
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
      </View><View style={styles.picker}>
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
      </View><View style={styles.picker}>
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
      
    </ScrollView>
    <PrimaryButton
        style={{
          position: "absolute",
          bottom: -30,
          width: "100%",
          height: 54,
          borderRadius: 1000,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#D80100",
          left: 15
        }}
        mode="contained"
        // onPress={handleContinue}
      >
        {i18n.t("continue")}
      </PrimaryButton></>
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
