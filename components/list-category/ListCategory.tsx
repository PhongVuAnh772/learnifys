import { Pressable, StyleSheet, Text, Touchable, View,TouchableOpacity } from "react-native";
import React, { memo, useCallback,useEffect } from "react";
import { FlashList } from "@shopify/flash-list";
import i18n from "@/translations";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import { debounce } from "lodash";
import { useTranslation } from "react-i18next";

interface CategoryProps {
  data: any[];
}

interface ItemProps {
  item: any;
  style: any;
}
const ItemComponent = ({ item, style }: ItemProps) => {
  const router = useRouter();
 
  const handleItem = useCallback(
    (item:any) => {
      if (!!item.navigating) {
          router.replace(item.navigating)
      } else {
        router.push({
          pathname: "category",
          params: { children: item.children },
        });
      }
    },
    []
  );

  return (
    <TouchableOpacity style={style.itemRow} onPress={() => handleItem(item)}>
      <Text style={style.textRow}>{i18n.t(item.title)}</Text>
      <View style={style.itemRight}>
        {item.children.length > 0 && (
          <Text style={style.textLength}>{item.children.length} mục</Text>
        )}
        <Entypo name="chevron-thin-right" size={18} color="#BBBBBB" />
      </View>
    </TouchableOpacity>
  );
};

const ListCategory = ({ data }: CategoryProps) => {
  const styles = useStyles();

  
  return (
    <View style={styles.container}>
      <FlashList
      showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => <ItemComponent item={item} style={styles} />}
        estimatedItemSize={200}
      />
    </View>
  );
};

export default memo(ListCategory);

const useStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      borderRadius: 10,
      marginTop: 10,
    },
    itemRow: {
      padding: 16,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    textRow: {
      fontSize: 18,
      fontFamily: "quicksand-medium",
    },
    textLength: {
      fontSize: 14,
      fontFamily: "quicksand-light",
    },
    itemRight: {
      flexDirection: "row",
      gap: 10,
    },
  });
