import { StyleSheet, Text, View } from "react-native";
import React, {useEffect} from "react";
import { Image, ImageBackground } from "expo-image";
import { blurhash } from "@/constants/BlurHash";
import agencyOrderIcon from "@/assets/card/agency-order.png";
import newCustomerIcon from "@/assets/card/new-customer.png";
import retailOrderIcon from "@/assets/card/retail-order.png";
import revenueIcon from "@/assets/card/revenue.png";
import i18n from "@/translations";
import { useTranslation } from "react-i18next";

const TodayStatistics = () => {
   
  return (
    <View style={styles.container}>
      <Text style={styles.titleMain}>{i18n.t("today-statistical")}</Text>
      <View style={styles.statisticContainer}>
        <ImageBackground
          source={retailOrderIcon}
          style={styles.image}
          alt=""
          placeholder={{ blurhash }}
          contentFit="fill"
          transition={1000}
        >
          <Text style={styles.title}>{i18n.t("retailOrder")}</Text>
          <Text style={styles.number}>12</Text>
        </ImageBackground>
        <ImageBackground
          source={agencyOrderIcon}
          style={styles.image}
          alt=""
          placeholder={{ blurhash }}
          contentFit="fill"
          transition={1000}
        >
          <Text style={styles.title}>{i18n.t("agencyOrder")}</Text>
          <Text style={styles.number}>12</Text>
        </ImageBackground>
      </View>
      <View style={[styles.statisticContainer, { paddingTop: 15 }]}>
        <ImageBackground
          source={newCustomerIcon}
          style={styles.image}
          alt=""
          placeholder={{ blurhash }}
          contentFit="fill"
          transition={1000}
        >
          <Text style={[styles.title, {color:'black'}]}>{i18n.t("newCustomer")}</Text>
          <Text style={[styles.number, {color:'black'}]}>12</Text>
        </ImageBackground>
        <ImageBackground
          source={revenueIcon}
          style={styles.image}
          alt=""
          placeholder={{ blurhash }}
          contentFit="fill"
          transition={1000}
        >
          <Text style={[styles.title, {color:'black'}]}>{i18n.t("revenue")}</Text>
          <Text style={[styles.number, {color:'black'}]}>12</Text>
        </ImageBackground>
      </View>
    </View>
  );
};

export default TodayStatistics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  image: {
    width: "48%",
    height: 100,
    padding: 16,
    gap: 12,
  },
  statisticContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingTop: 15
  },
  title: {
    fontFamily: "quicksand-bold",
        color:'white',
        fontSize: 15

  },
  number: {
    color:'white',
    fontSize: 25,
    fontWeight: "700",
        fontFamily: "quicksand-bold",

  },
  titleMain: {
    fontWeight: '700',
    fontFamily:'quicksand-bold',
    fontSize: 18
  }
});
