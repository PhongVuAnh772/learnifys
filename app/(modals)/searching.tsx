import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import ScreenHeader from "@/atoms/HeaderComponent";
import i18n from "@/translations";
import SearchBar from "@/components/Search/SearchBar";
import { useLocalSearchParams } from "expo-router";
import searchIcon from "@/assets/icons/search.png";
import { FlashList } from "@shopify/flash-list";
import { Facebook } from "react-content-loader";
import { Image } from "expo-image";
import { blurhash } from "@/constants/BlurHash";
import { useTranslation } from "react-i18next";
const Searching = () => {
  const params = useLocalSearchParams();
  const agency = typeof params.agency === "string" ? params.agency : "";
  const [searchValue, setSearchValue] = useState(agency);
   
  const handleEnterPress = () => {};
  const RenderItem = ({ item }: any) => (
    <View style={styles.outer}>
      <Image
        source={{ uri: item?.avatar }}
        style={styles.avatar}
        alt=""
        placeholder={{ blurhash }}
        contentFit="fill"
        transition={1000}
      />
      <View style={styles.textOuter}>
        <Text style={styles.name}>{item.name}</Text>
         <Text style={styles.phone}>{item.phone}</Text>
      </View>
    </View>
  );
  useEffect(() => {
    if (typeof params.agency === "string") {
      setSearchValue(params.agency);
    }
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder={i18n.t("finding")}
        keyboardType="numeric"
        color="white"
        handleEnterPress={handleEnterPress}
        value={searchValue}
        setValue={setSearchValue}
        maxLength={10}
        icon={searchIcon}
      />
      <Text style={styles.title}>{i18n.t("searching-results")}</Text>
      <FlashList
        data={params.response as any}
        renderItem={({ item }) => <RenderItem item={item} />}
        estimatedItemSize={200}
        showsVerticalScrollIndicator={false}
        // ListEmptyComponent={() => <Facebook />}
      />
    </View>
  );
};

export default Searching;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f3f4",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16,
  },
  header: {
    paddingBottom: 10,
  },
  title: {
    fontSize: 14,
    lineHeight: 19.6,
    fontFamily: "quicksand-light",
  },
  outer: {
    width: "100%",
    height: 84,
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    alignItems: "center",
    flexDirection:"row",
    paddingHorizontal: 12,
    gap: 10
  },
  avatar: {
    height: 60,
    width: 76,
    borderRadius: 12
  },
  textOuter: {
    flex: 1,paddingHorizontal: 12,
  },
  name: {
    color: '#050431',
    fontFamily:"quicksand-bold",
    fontSize: 18
  },
  phone: {
    color: '#050431',
    fontFamily:"quicksand-light",
    fontSize: 14
  },
});
