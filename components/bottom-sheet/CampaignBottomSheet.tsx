import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { forwardRef } from "react";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import i18n from "@/translations";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";

interface Props {
  snapPoints: string[];
  handleLockingPress: () => void;
  handleSnapPress: () => void;
  handleSnapClosing: () => void;
}

const CampaignBottomSheet = forwardRef<BottomSheetModal, Props>(
  (
    { snapPoints, handleLockingPress, handleSnapPress, handleSnapClosing },
    ref
  ) => {
     
    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        detached={true}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            opacity={0.5}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
        handleIndicatorStyle={{ backgroundColor: "transparent" }}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Link href="/information/123" asChild>
            <Pressable style={styles.contentAction}>
              <Text style={styles.titleButton}>
                {i18n.t("participants-list")}
              </Text>
            </Pressable>
          </Link>
          <BottomSheetView style={styles.contentAction}>
            <Text style={styles.titleButton}>{i18n.t("campaign-edit")}</Text>
          </BottomSheetView>
          <Pressable style={styles.contentAction} onPress={handleLockingPress}>
            <Text style={[styles.titleButton, { color: "red" }]}>
              {i18n.t("campaign-delete")}
            </Text>
          </Pressable>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default CampaignBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(253, 253, 253)",
    paddingBottom: 30,
    paddingHorizontal: 10,
  },
  contentAction: {
    flex: 1,
    height: 50,
    width: "100%",
    backgroundColor: "white",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  titleButton: {
    lineHeight: 24,
    fontFamily: "quicksand-bold",
    fontSize: 16,
  },
});
