import { StyleSheet, Text, View } from "react-native";
import React,{useState} from "react";
import SearchBar from "../Search/SearchBar";
import filterIcon from "@/assets/icons/filter.png";
import { Image } from "expo-image";
import i18n from "@/translations";
import searchIcon from "@/assets/icons/search.png";
import { useTranslation } from "react-i18next";

const SearchCustomer = () => {
  const [value,setValue]=useState('')
   
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBarContainer}>
        <SearchBar
          color="white"
          placeholder={i18n.t("finding")}
          icon={searchIcon}
          setValue={setValue}
          value={value}
          keyboardType="default"
          handleEnterPress={() =>{}}
        />
      </View>
      <View style={styles.filterContainer}>
        <Image source={filterIcon} style={styles.iconFilter} />
      </View>
    </View>
  );
};

export default SearchCustomer;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBarContainer: {
    flex: 0.95,
  },
  filterContainer: {
    height: 48,
    width: 48,
    borderRadius: 12,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  iconFilter: {
    width: 24,
    height: 24,
  },
});
