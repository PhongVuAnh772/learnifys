import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { forwardRef } from "react";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import i18n from "@/translations";
import lockingSticker from "@/assets/stickers/locking.png";
import { blurhash } from "@/constants/BlurHash";
import { Image } from "expo-image";
import { useToast } from "@/common/ToastProvider";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { useLoadingContent } from "../loading/LoadingContent";import { useTranslation } from "react-i18next";

interface Props {
  snapPoints: string[];
  handleLockingPress: () => void;
  handleSnapPress: () => void;
  handleLockingClosing: () => void;
}

const LockingBottomSheet = forwardRef<BottomSheetModal, Props>(
  (
    { snapPoints, handleLockingPress, handleSnapPress, handleLockingClosing },
    ref
  ) => {
     
    const { showToast } = useToast();
    const { dismissAll: dismissAllModals } = useBottomSheetModal();
    const {showLoadingContent, hideLoadingContent} = useLoadingContent();
    const handleClosing = () => {
      dismissAllModals();
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
            pressBehavior="none"
          />
        )}
        handleIndicatorStyle={{ backgroundColor: "transparent" }}
      >
        <BottomSheetView style={styles.contentContainer}>
          <BottomSheetView style={styles.contentAction}>
            <Image
              source={lockingSticker}
              style={styles.lockingIcon}
              alt=""
              contentFit="fill"
              transition={1000}
            />
            <Text style={[styles.titleButton]}>
              {i18n.t("locking-account")}
            </Text>
            <Text style={[styles.titleDescription]}>
              {i18n.t("system")}
              <Text style={[styles.titleButton]}>
                {i18n.t("phoenix-tech")}
                <Text style={[styles.titleDescription]}>
                  {i18n.t("locking-description")}
                </Text>
              </Text>
            </Text>
            <Text style={[styles.titleDescription]}>
              {i18n.t("ask-locking")}
            </Text>
          </BottomSheetView>
          <BottomSheetView style={styles.contentButton}>
            <Pressable
              onPress={handleLockingClosing}
              style={[
                styles.button,
                { borderWidth: 1, borderColor: "#0E1013" },
              ]}
            >
              <Text
                style={[
                  styles.titleDescription,
                  { paddingTop: 0, color: "black" },
                ]}
              >
                {i18n.t("abort")}
              </Text>
            </Pressable>
            <Pressable style={[styles.button, { backgroundColor: "#D80100" }]} onPress={handleClosing}>
              <Text
                style={[
                  styles.titleDescription,
                  { paddingTop: 0, color: "white" },
                ]}
              >
                {i18n.t("lock-action")}
              </Text>
            </Pressable>
          </BottomSheetView>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default LockingBottomSheet;

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
  contentButton: {
    flex: 1,
    height: 50,
    width: "100%",
    backgroundColor: "white",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    flexDirection: "row",
    gap: 5,
  },
  titleButton: {
    lineHeight: 24,
    fontFamily: "quicksand-bold",
    fontSize: 16,
    paddingTop: 10,
  },
  titleDescription: {
    lineHeight: 24,
    fontFamily: "quicksand-medium",
    fontSize: 16,
    paddingTop: 10,
  },
  lockingIcon: {
    width: 120,
    height: 120,
  },
  button: {
    width: "45%",
    height: 54,
    borderRadius: 1000,
    alignItems: "center",
    justifyContent: "center",
  },
});
