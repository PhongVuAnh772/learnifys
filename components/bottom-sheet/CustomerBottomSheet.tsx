import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { forwardRef } from "react";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import i18n from "@/translations";
import { Link, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

interface Props {
  snapPoints: string[];
  handleLockingPress: () => void;
  handleSnapPress: () => void;
  handleSnapClosing: () => void;
  isMoreIconPressed: number | null;
  setIsMoreIconPressed: React.Dispatch<React.SetStateAction<number | null>>;
}

const CustomerBottomSheet = forwardRef<BottomSheetModal, Props>(
  (
    { snapPoints, handleLockingPress, handleSnapPress, handleSnapClosing,isMoreIconPressed,setIsMoreIconPressed },
    ref
  ) => {
    const router = useRouter();
     
    const handleFixing = () => {
      handleSnapClosing();
      router.push({ pathname: `changing-customer`, params: isMoreIconPressed as any })
    }
    const handleLinkPress = (href: string) => {
      handleSnapClosing();
      router.push(href);
    };
    const handleHistoryCaring = () => {
      handleSnapClosing();
      router.push({ pathname: "history-caring", params: isMoreIconPressed as any })
    }
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
            onPress={() => {

            }}
          />
        )}
        handleIndicatorStyle={{ backgroundColor: "transparent" }}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Pressable
            style={styles.contentAction}
            onPress={() => handleLinkPress("/information/123")}
          >
            <Text style={styles.titleButton}>{i18n.t("order-list")}</Text>
          </Pressable>
          <Pressable
            style={styles.contentAction}
            onPress={handleHistoryCaring}
          >
            <Text style={styles.titleButton}>{i18n.t("history-caring")}</Text>
          </Pressable>
          <Pressable style={styles.contentAction} onPress={handleFixing}>
            <Text style={styles.titleButton}>{i18n.t("fixing-information-customer")}</Text>
          </Pressable>
          <Pressable style={styles.contentAction} onPress={handleLockingPress}>
            <Text style={[styles.titleButton, { color: "red" }]}>
              {i18n.t("customer-delete")}
            </Text>
          </Pressable>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default CustomerBottomSheet;

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
