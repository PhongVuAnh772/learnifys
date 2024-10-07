import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image, ImageBackground } from "expo-image";
import { blurhash } from "@/constants/BlurHash";
import agencyOrderIcon from "@/assets/card/agency-order.png";
import newCustomerIcon from "@/assets/card/new-customer.png";
import retailOrderIcon from "@/assets/card/retail-order.png";
import revenueIcon from "@/assets/card/revenue.png";
import increaseIcon from "@/assets/icons/increase.png";
import i18n from "@/translations";
import { useTranslation } from "react-i18next";
const TodayStatisticsUser = () => {
   
  return (
    <View style={styles.container}>
      <Text style={styles.titleMain}>{i18n.t("monthly-statistical")}</Text>
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
          <View style={styles.descriptionContainer}>
            <Text style={styles.number}>12</Text>
            <View style={styles.growthRateContainer}>
              <Image
                source={increaseIcon}
                style={styles.icon}
                alt=""
                placeholder={{ blurhash }}
                contentFit="fill"
                transition={1000}
              />
              <Text style={styles.increaseNumber}>+25,5%</Text>
            </View>
          </View>
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
          <View style={styles.descriptionContainer}>
            <Text style={styles.number}>12</Text>
            <View style={styles.growthRateContainer}>
              <Image
                source={increaseIcon}
                style={styles.icon}
                alt=""
                placeholder={{ blurhash }}
                contentFit="fill"
                transition={1000}
              />
              <Text style={styles.increaseNumber}>+25,5%</Text>
            </View>
          </View>
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
          <Text style={[styles.title, { color: "black" }]}>
            {i18n.t("newCustomer")}
          </Text>
          <View style={styles.descriptionContainer}>
            <Text style={[styles.number,{color: '#111827'}]}>12</Text>
            <View style={styles.growthRateContainer}>
              <Image
                source={increaseIcon}
                style={styles.icon}
                alt=""
                placeholder={{ blurhash }}
                contentFit="fill"
                transition={1000}
              />
              <Text style={styles.increaseNumber}>+25,5%</Text>
            </View>
          </View>
        </ImageBackground>
        <ImageBackground
          source={revenueIcon}
          style={styles.image}
          alt=""
          placeholder={{ blurhash }}
          contentFit="fill"
          transition={1000}
        >
          <Text style={[styles.title, { color: "black" }]}>
            {i18n.t("revenue")}
          </Text>
          <View style={styles.descriptionContainer}>
            <Text style={[styles.number,{color: '#111827'}]}>12</Text>
            <View style={styles.growthRateContainer}>
              <Image
                source={increaseIcon}
                style={styles.icon}
                alt=""
                placeholder={{ blurhash }}
                contentFit="fill"
                transition={1000}
              />
              <Text style={styles.increaseNumber}>+25,5%</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default TodayStatisticsUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20
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
    paddingTop: 15,
  },
  title: {
    fontFamily: "quicksand-bold",
    color: "white",
    fontSize: 15,
  },
  number: {
    color: "white",
    fontSize: 32,
    fontWeight: "700",
    fontFamily: "quicksand-bold",
  },
  titleMain: {
    fontWeight: "700",
    fontFamily: "quicksand-bold",
    fontSize: 18,
    textAlign:'center'
  },
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  growthRateContainer: {
    height: "90%",
    width: "70%",
    backgroundColor: "white",
    marginLeft: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  icon: {
    width: 18,
    height: 18,
  },
  increaseNumber: {
    fontSize: 12,
    fontFamily: "manrope-bold",
    paddingLeft: 5,
    color: "#27A376",
  },
});
