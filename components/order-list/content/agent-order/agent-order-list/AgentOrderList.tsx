import { StyleSheet, Text, View, TouchableOpacity,Platform } from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import { Facebook } from "react-content-loader";
import { Image } from "expo-image";
import { blurhash } from "@/constants/BlurHash";
import i18n from "@/translations";
import moreIcon from "@/assets/icons/more.png";
import verifiedIcon from "@/assets/icons/verified.png";
import { useDimensions } from "@/hooks/useDimensions";
import TotalRevenue from "@/components/total-revenue/TotalRevenue";
import { useTranslation } from "react-i18next";

const DATA = [
  {
    title: "First Item",
    price: 10000000,
    discount: 30,
    counting: 10
  },
  {
    title: "Second Item",
    price: 100000000,
    discount: 30,
    counting: 10
  },
];

interface Props {
  item: any;
}
const RenderItem = ({ item }: Props) => {
    const isSmallScreen = useDimensions();
 
  return (
  <View style={[styles.container, {height: isSmallScreen ? 280 : 300}]}>
    <View style={styles.userContainer}>
      <Image
        source={{
          uri: "https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/431950848_1466647250941777_8807338962286312656_n.jpg?stp=dst-jpg_p200x200&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=SGP71mtKArYQ7kNvgE7aEKC&_nc_ht=scontent.fhan2-3.fna&oh=00_AYBzl1h26daSGIA-hUokIdJmiSnb4yhHtiTA2doAqYr3iQ&oe=6676D2BC",
        }}
        style={styles.avatar}
        alt=""
        placeholder={{ blurhash }}
        contentFit="fill"
        transition={1000}
      />
      <View style={styles.userInfoContainer}>
        <View style={styles.nameContainer}>
          <View style={styles.nameSpecifiedContainer}>
            <Text style={styles.nameuser}>Nguyễn Hiền Anh</Text>
            
          </View>
          <Image
            source={moreIcon}
            style={styles.icon}
            alt=""
            placeholder={{ blurhash }}
            contentFit="fill"
            transition={1000}
          />
        </View>
        <Text style={styles.phoneUser}>0398622314</Text>
        <Text style={styles.phoneUser}>{i18n.t("order-tab")}</Text>
      </View>
    </View>

    <View style={styles.seperator}></View>
    <View style={styles.group}>
      <Text style={styles.titleGroup}>{i18n.t("product")}</Text>
      <Text style={[styles.contentGroup, {fontSize: Platform.OS === "android" ? 10 : 13}]}>
        BẢN ĐỒ KINH DOANH THÀNH CÔNG 6/2024
      </Text>
    </View>
    <View style={[styles.group, { paddingTop: 8 }]}>
      <Text style={styles.titleGroup}>{i18n.t("price-bought")}</Text>
      <Text style={styles.contentGroup}>
        <Text style={styles.contentHighlight}>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', 'đ')}</Text>
      </Text>
    </View>
    <View style={[styles.group, { paddingTop: 8 }]}>
      <Text style={styles.titleGroup}>{i18n.t("counting")}</Text>
      <Text style={styles.contentGroup}>
        <Text style={[styles.contentHighlight, {color:'black'}]}>{item.counting}</Text>
      </Text>
    </View>
    <View style={[styles.group, { paddingTop: 25 }]}>
      <Text style={styles.discountTitle}>{i18n.t("discount")}: <Text style={styles.discountTitleOutstanding}>{item.discount}%</Text></Text>
      <Text style={styles.contentGroup}>
        <Text style={styles.contentHighlight}>{(item.price * (1 - item.discount / 100) * item.counting).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', 'đ')}</Text> 
      </Text>
    </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={[styles.button, { backgroundColor: "white",borderColor: 'black',borderWidth: 1 }]}>
        <Text style={[styles.textButton, { color: "black" }]}>
          {i18n.t("cancel")}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: "#34C759" }]}>
        <Text style={[styles.textButton, { color: "white" }]}>
          {i18n.t("accept")}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: "red" }]}>
        <Text style={[styles.textButton, { color: "white" }]}>
          {i18n.t("get-money")}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);
}
const RetailOrderList = () => {
  return (
    <FlashList
    showsVerticalScrollIndicator={false}
      data={DATA}
      renderItem={({ item }) => <RenderItem item={item} />}
      estimatedItemSize={200}
      ListHeaderComponent={      <TotalRevenue total={100000000} />}
      // ListEmptyComponent={() => <Facebook />}
    />
  );
};

export default RetailOrderList;

const styles = StyleSheet.create({
  textButton: {
    fontFamily: "quicksand-bold",
    fontSize: 15,
  },
  nameSpecifiedContainer: {
    flexDirection: "row",
  },
  phoneUser: {
    lineHeight: 19.6,
    fontFamily: "quicksand-light",
    fontSize: 15,
  },
  contentHighlight: {
    color: "#D80100",
  },
  nameContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  boughtText: {
    fontFamily: "quicksand-bold",
    lineHeight: 19.6,
    fontSize: 15,
    paddingRight: 25,
  },
  contentGroup: {
    fontFamily: "quicksand-bold",
    fontSize: 13,
  },
  titleGroup: {
    fontFamily: "quicksand-light",
    fontSize: 15,
  },
  container: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 16,
    marginVertical: 10,
    height: 280,
    borderRadius: 16,
  },
  discountTitle: {
    fontFamily: "quicksand-medium",
    fontSize: 15,
  },
  discountTitleOutstanding:{
        fontFamily: "quicksand-bold",

  },
  seperator: {
    backgroundColor: "#F1F2F4",
    width: "100%",
    height: 1,
    marginVertical: 10,
  },
  userInfoContainer: {
    flex: 1,
    paddingLeft: 10,
    justifyContent:'space-between'
  },
  group: {
    flexDirection: "row",
    gap: 7,
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontFamily: "quicksand-light",
    fontSize: 17,
    paddingVertical: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconVerified: {
    width: 24,
    height: 24,
  },
  listContainer: {
    paddingTop: 15,
    flex: 1,
  },
  nameuser: {
    fontSize: 16,
    fontFamily: "quicksand-bold",
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 12,
  },
  informationContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
    paddingLeft: 15,
  },
  content: {
    fontFamily: "quicksand-regular",
  },
  name: {
    fontFamily: "quicksand-bold",
    fontSize: 17,
  },
  overviewContainer: {
    flexDirection: "column",
    gap: 5,
  },
  userContainer: {
    flexDirection: "row",
    alignItems:'center'
  },
  phone: {
    fontFamily: "quicksand-regular",
  },
  time: {
    fontFamily: "quicksand-bold",
    color: "#D80100",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 3
  },
  button: {
    width: "32%",
    height: 38,
    justifyContent: "center",
    borderRadius: 25,
    alignItems: "center",
  },
});
