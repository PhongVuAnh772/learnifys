import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Pressable,
} from "react-native";
import React, { Fragment } from "react";
import { FlashList } from "@shopify/flash-list";
import { Facebook } from "react-content-loader";
import { Image } from "expo-image";
import { blurhash } from "@/constants/BlurHash";
import i18n from "@/translations";
import moreIcon from "@/assets/icons/more.png";
import verifiedIcon from "@/assets/icons/verified.png";
import Seperator from "@/components/seperator/Seperator";
import RegistrationList from "@/components/campaign/RegistrationList";
import { useTranslation } from "react-i18next";

const DATA = [
  {
    title: "First Item",
    price: 10000000,
    discount: 30,
    counting: 10,
    status: "done"
  },
  {
    title: "Second Item",
    price: 100000000,
    discount: 30,
    counting: 10,
    status: "failed"
  },
];

interface Props {
  item: any;
}
const RenderItem = ({ item }: Props) => (
  <View style={styles.container}>
    
    {item.status === "done" && <View style={[styles.activateContent, { backgroundColor: "#AFF9D1" }]}>
      <Text style={[styles.activateText, { color: "#064C26" }]}>
        Đã hoàn thành
      </Text>
    </View>}
    {item.status === "failed" && <View style={[styles.activateContent, { backgroundColor: "#FFE1E0" }]}>
      <Text style={[styles.activateText, { color: "#DD5050" }]}>
        Trượt
      </Text>
    </View>}
    
    <Image
      source={{
        uri: "https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/431950848_1466647250941777_8807338962286312656_n.jpg?stp=dst-jpg_p200x200&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=SGP71mtKArYQ7kNvgE7aEKC&_nc_ht=scontent.fhan2-3.fna&oh=00_AYBzl1h26daSGIA-hUokIdJmiSnb4yhHtiTA2doAqYr3iQ&oe=6676D2BC",
      }}
      style={[styles.imageThumb]}
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

        <Pressable
          // onPress={handleSnapPress}
          style={styles.icon}
        >
          <Image
            source={moreIcon}
            style={styles.icon}
            alt=""
            placeholder={{ blurhash }}
            contentFit="fill"
            transition={1000}
          />
        </Pressable>
      </View>
      <Text style={[styles.contentTiming, { paddingVertical: 10 }]}>
        21:53 06/06/2024
      </Text>
      <View style={[styles.group]}>
        <Text style={styles.titleGroup}>{i18n.t("number-questions")}</Text>
        <Text style={styles.contentGroup}>
          <Text style={[styles.contentHighlight, { color: "black" }]}>
            {20} {i18n.t("sentence")}
          </Text>
        </Text>
      </View>
      <View style={[styles.group]}>
        <Text style={styles.titleGroup}>{i18n.t("counting")}</Text>
        <Text style={styles.contentGroup}>
          <Text style={[styles.contentHighlight]}>
            {18} {i18n.t("sentence")}
          </Text>
        </Text>
      </View>
      <View style={[styles.group]}>
        <Text style={styles.titleGroup}>{i18n.t("number-questions")}</Text>
        <Text style={styles.contentGroup}>
          <Text style={styles.contentHighlight}>
            {18} {i18n.t("sentence")}
          </Text>
        </Text>
      </View>
    </View>
  </View>
);
const RetailOrderList = () => {
  return (
    <FlashList
    showsVerticalScrollIndicator={false}
      data={DATA}
      renderItem={({ item }) => <RenderItem item={item} />}
      estimatedItemSize={200}
      // ListEmptyComponent={() => <Facebook />}
    />
  );
};

export default RetailOrderList;

const styles = StyleSheet.create({
  nameSpecifiedContainer: {
    flexDirection: "row",
  },
  nameContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  container: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 16,
    marginVertical: 10,
    borderRadius: 16,
  },
  discountTitle: {
    fontFamily: "quicksand-medium",
    fontSize: 15,
  },
  seperator: {
    backgroundColor: "#F1F2F4",
    width: "100%",
    height: 1,
    marginVertical: 10,
  },
  userInfoContainer: {
    flex: 1,
    justifyContent: "space-between",
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
    width: 20,
    height: 20,marginLeft: 5
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
  content: {
    fontFamily: "quicksand-regular",
  },
  name: {
    fontFamily: "quicksand-bold",
    fontSize: 17,
  },

  phone: {
    fontFamily: "quicksand-regular",
  },
  time: {
    fontFamily: "quicksand-bold",
    color: "#D80100",
  },

  activateContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    paddingBottom: 10,
  },
  activateContent: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  activateText: {
    fontFamily: "quicksand-medium",
    fontSize: 12,
    lineHeight: 16,
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textLeftFooter: {
    fontFamily: "quicksand-light",
    fontSize: 14,
    lineHeight: 19.6,
  },
  textRightFooter: {
    fontFamily: "quicksand-bold",
    fontSize: 14,
    lineHeight: 19.6,
    color: "#D80100",
  },
  imageThumb: {
    width: "100%",
    height: 120,
    marginBottom: 10,
    borderRadius: 12,
  },
  contentGroup: {
    fontFamily: "quicksand-bold",
    fontSize: 13,
  },
  titleGroup: {
    fontFamily: "quicksand-light",
    fontSize: 14,
    color: "#9AA0A6",
  },
  group: {
    flexDirection: "row",
    gap: 7,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  contentHighlight: {
    color: "#27A175",
  },
  contentTiming: {
    color: "#434343",
    fontFamily: "quicksand-medium",
  },
});
