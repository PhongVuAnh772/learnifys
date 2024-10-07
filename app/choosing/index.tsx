import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import i18n from "@/translations";
import Greeting from "@/components/greeting/Greeting";
import SearchBar from "@/components/Search/SearchBar";
import searchIcon from "@/assets/icons/search.png";
import DropdownPicker from "../common/DropdownPicker";
import PrimaryButton from "@/atoms/PrimaryButton";
import { Entypo } from "@expo/vector-icons";
import useAsyncStorage from "@/hooks/useAsyncStorage";
import { fetchSystem } from "@/services/system.service";
import { useTranslation } from "react-i18next";

interface Props {
  name: string;
  counting: number;
}

const ChoosingAgency: React.FC<Props> = ({ name, counting }) => { 
  const { data, saveData, loadingStorage, error } = useAsyncStorage("agency");
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleEnterPress = async () => {
    
  };

  const handleContinue = () => {
    saveData({ value: JSON.stringify(value) });
    router.push("login");
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSystem();
      const formattedData = data.map((item: any, index: number) => ({
        label: item.system_name,
        value: item.id
      }));
      setItems(formattedData);
    };
    fetchData();
  }, []);

  return (
    <Greeting
      title="phoenix-tech"
      description="greeting-choosing"
      overlayDescription="invite-choosing"
    >
      <SearchBar
        placeholder={i18n.t("dealer-lookup")}
        keyboardType="numeric"
        color="#f5f5f5"
        handleEnterPress={handleEnterPress}
        value={searchValue}
        setValue={setSearchValue}
        maxLength={10}
        icon={searchIcon}
      />
      <DropdownPicker
        data={items}
        opening={open}
        onOpen={setOpen}
        value={value}
        setValue={setValue}
        loading={loading}
        setLoading={setLoading}
        placeholder="select-item-dropdown"
      />
      <PrimaryButton
        style={{
          position: "absolute",
          bottom: "20%",
          width: "100%",
          height: 54,
          borderRadius: 1000,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#D80100",
        }}
        mode="contained"
        onPress={handleContinue}
      >
        {i18n.t("continue")}
      </PrimaryButton>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 20,
          width: "100%",
          height: 54,
          borderRadius: 1000,
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          flexDirection: "row",
        }}
      >
        <Image
          source={require("@/assets/icons/signup-button.png")}
          style={styles.iconStyle}
        />
        <Text style={styles.signupText}>{i18n.t("signup-system")}</Text>
      </TouchableOpacity>
    </Greeting>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    width: 20,
    height: 20,
  },
  signupText: {
    fontSize: 16,
    fontFamily: "quicksand-bold",
  },
});

export default React.memo(ChoosingAgency);
