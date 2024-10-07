import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import { Facebook } from "react-content-loader";
import { Image } from "expo-image";
import { blurhash } from "@/constants/BlurHash";
import i18n from "@/translations";
import { useTranslation } from "react-i18next";

const DATA = [
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
];

interface Props {
  item: any;
  t: TFunction<"translation", undefined>
}
const RenderItem = ({ item,t }: Props) => (
  <View style={styles.container}>
    <Image
      source={{
        uri: "https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/431950848_1466647250941777_8807338962286312656_n.jpg?stp=dst-jpg_p200x200&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=SGP71mtKArYQ7kNvgE7aEKC&_nc_ht=scontent.fhan2-3.fna&oh=00_AYBzl1h26daSGIA-hUokIdJmiSnb4yhHtiTA2doAqYr3iQ&oe=6676D2BC",
      }}
      style={styles.image}
      alt=""
      placeholder={{ blurhash }}
      contentFit="fill"
      transition={1000}
    />
    <View style={styles.informationContainer}>
      <View style={styles.overviewContainer}>
        <View style={styles.userContainer}>
          <Text style={styles.time}>Lúc 9:16 giờ</Text>
          <Text style={styles.phone}>0816560000</Text>
        </View>
        <Text style={styles.name}>Trần Ngọc Mạnh</Text>
      </View>
      <Text style={styles.content}>
        {i18n.t("content-appointment")}: Sáng mai mình qua sớm
      </Text>
    </View>
  </View>
);

const CustomerListAppointment = () => {
   
  return (
   
        <FlashList
      data={DATA}
      renderItem={({ item }) => <RenderItem item={item} />}
      estimatedItemSize={200}
      showsVerticalScrollIndicator={false}
      // ListEmptyComponent={() => <Facebook />}
    />
    
  );
};

export default CustomerListAppointment;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff", 
    flexDirection: "row",
    width: "100%",
    padding: 16,
    marginVertical: 10,
    shadowColor: "235, 223, 223",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 3,
        borderRadius: 12
  },
  image: {
    width: 96,
    height: 85,
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
    justifyContent: "space-between",
  },
  phone: {
        fontFamily: "quicksand-regular",

  },
  time: {
        fontFamily: "quicksand-bold",
    color:'#D80100'
  }
});
