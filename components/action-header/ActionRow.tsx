import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import trainIcon from "@/assets/icons/train.png";
import campaignIcon from "@/assets/icons/campaign.png";
import downlineIcon from "@/assets/icons/downline.png";
import listIcon from "@/assets/icons/list.png";
import i18n from "@/translations";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";

const ActionRow = () => {
   
  return (
    <View style={styles.container}>
      <Link href="category" asChild>
        <Pressable style={styles.actionRow}>
          <Image source={listIcon} style={styles.icon} />
          <Text style={styles.description}>{i18n.t("list")}</Text>
        </Pressable>
      </Link>
      <Link href="downline" asChild>
        <Pressable style={styles.actionRow}>
          <Image source={downlineIcon} style={styles.icon} />
          <Text style={styles.description}>{i18n.t("downline")}</Text>
        </Pressable>
      </Link>
      <Link href="campaign" asChild>
        <Pressable style={styles.actionRow}>
          <Image source={campaignIcon} style={styles.icon} />
          <Text style={styles.description}>{i18n.t("campaign")}</Text>
        </Pressable>
      </Link>
      <Link href="training" asChild>
        <Pressable style={styles.actionRow}>
          <Image source={trainIcon} style={styles.icon} />
          <Text style={styles.description}>{i18n.t("training")}</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default ActionRow;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 30,
  },
  actionRow: {
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 30,
    height: 30,
  },
  description: {
    fontFamily: "manrope-bold",
  },
});
