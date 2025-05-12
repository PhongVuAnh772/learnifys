import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import SearchBar from "@/components/Search/SearchBar";
import { useLocalSearchParams } from "expo-router";
import searchIcon from "@/assets/icons/search.png";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { blurhash } from "@/constants/BlurHash";

const Searching = () => {
  const params = useLocalSearchParams();
  const keyword = typeof params.keyword === "string" ? params.keyword : "";
  const [searchValue, setSearchValue] = useState(keyword);
  const [results, setResults] = useState<any[]>([]);

  const handleEnterPress = () => {
    const mockData = [
      {
        id: 1,
        avatar: "https://placekitten.com/80/80",
        name: "Thầy Nguyễn Văn A",
        phone: "0123456789",
      },
      {
        id: 2,
        avatar: "https://placekitten.com/81/81",
        name: "Lớp Toán nâng cao 7A",
        phone: "Không áp dụng",
      },
    ];
    setResults(
      mockData.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

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
    if (keyword) {
      setSearchValue(keyword);
      handleEnterPress();
    }
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Tìm kiếm lớp học hoặc giáo viên"
        keyboardType="default"
        color="white"
        handleEnterPress={handleEnterPress}
        value={searchValue}
        setValue={setSearchValue}
        maxLength={50}
        icon={searchIcon}
      />
      <Text style={styles.title}>Kết quả tìm kiếm</Text>
      <FlashList
        data={results}
        renderItem={({ item }) => <RenderItem item={item} />}
        estimatedItemSize={200}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Không có kết quả nào.
          </Text>
        }
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
  title: {
    fontSize: 14,
    lineHeight: 19.6,
    fontFamily: "quicksand-bold",
  },
  outer: {
    width: "100%",
    height: 84,
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 12,
    gap: 10,
  },
  avatar: {
    height: 60,
    width: 76,
    borderRadius: 12,
  },
  textOuter: {
    flex: 1,
    paddingHorizontal: 12,
  },
  name: {
    color: "#050431",
    fontFamily: "quicksand-bold",
    fontSize: 18,
  },
  phone: {
    color: "#050431",
    fontFamily: "quicksand-light",
    fontSize: 14,
  },
});
