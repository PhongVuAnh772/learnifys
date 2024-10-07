import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { blurhash } from "@/constants/BlurHash";
import financeIcon from "@/assets/icons/finance.png";
import i18n from "@/translations";
import { useTranslation } from "react-i18next";
interface Props {
  total: number;
}

const TotalRevenue = ({ total }: Props) => {
   
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image
          source={financeIcon}
          style={styles.icon}
          alt=""
          placeholder={{ blurhash }}
          contentFit="fill"
          transition={1000}
        />
      </View>
      <View style={styles.financeContainer}>
        <Text style={styles.financePrice}>{total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', 'đ')}</Text>
        <Text style={styles.financeDescription}>{i18n.t("total-revenue")}</Text>
      </View>
    </View>
  );
};

export default TotalRevenue;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 78,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
  financeContainer: {
    flex: 1,
    height: '100%',
    paddingLeft: 10,
    justifyContent:'space-between'
  },
  financePrice: {
    color:'white',
    fontFamily: 'quicksand-bold',
    fontSize: 24
  },
  financeDescription: {
    fontFamily:"quicksand-light",
    color:'white',
    fontSize: 14
  }
});
