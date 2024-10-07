import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef, useMemo, useCallback, Fragment } from "react";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import moreIcon from "@/assets/icons/more.png";
import verifiedIcon from "@/assets/icons/verified.png";
import { blurhash } from "@/constants/BlurHash";
import i18n from "@/translations";
import RegistrationList from "./RegistrationList";
import Seperator from "../seperator/Seperator";
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";
import CampaignBottomSheet from "../bottom-sheet/CampaignBottomSheet";
import LockingBottomSheet from "../bottom-sheet/LockingBottomSheet";
import { useTranslation } from "react-i18next";

interface Props {
  item: any;
}

const CampaignList = () => {
   
  const modalRef = useRef<BottomSheetModal>(null);
  const lockingRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["40%"], []);

  const handleSnapPress = useCallback(() => {
    modalRef.current?.present();
  }, []);
  const handleLockingPress = useCallback(() => {
    lockingRef.current?.present();
  }, []);
  const handleSnapClosing = useCallback(() => {
    modalRef.current?.close();
  }, []);
  const handleLockingClosing = useCallback(() => {
    lockingRef.current?.close();
  }, []);
  const DATA = [
    {
      title: "First Item",
      active: true,
      locate: "Hải Phòng",
    },
    {
      title: "Second Item",
      active: false,
    },
  ];

  const RenderItem = ({ item }: Props) => (
    <View style={styles.container}>
      <View style={styles.activateContainer}>
        {!item.active && (
          <Fragment>
            <View
              style={[styles.activateContent, { backgroundColor: "#FFE1E0" }]}
            >
              <Text
                style={[styles.activateText, { color: "#DD5050" }]}
              >
                Chưa kích hoạt
              </Text>
            </View>
          </Fragment>
        )}

        {item.active && (
          <Fragment>
            <View
              style={[styles.activateContent, { backgroundColor: "#AFF9D1" }]}
            >
              <Text
                style={[styles.activateText, { color: "#064C26" }]}
              >
                Đã kích hoạt
              </Text>
            </View>
            <View
              style={[styles.activateContent, { backgroundColor: "#EBE4FF" }]}
            >
              <Text
                style={[styles.activateText, { color: "#4200FF" }]}
              >
                {item.locate}
              </Text>
            </View>
          </Fragment>
        )}
      </View>
      <View style={styles.userInfoContainer}>
        <View style={styles.nameContainer}>
          <View style={styles.nameSpecifiedContainer}>
            <Text style={styles.nameuser}>Nguyễn Hiền Anh</Text>
            <Image
              source={verifiedIcon}
              style={styles.iconVerified}
              alt=""
              placeholder={{ blurhash }}
              contentFit="fill"
              transition={1000}
            />
          </View>

          <Pressable onPress={handleSnapPress} style={styles.icon}>
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
        <RegistrationList />
        <Seperator />
        <View style={styles.footer}>
          <Text style={styles.textLeftFooter}>{i18n.t("number-checkin")}</Text>
          <Text style={styles.textRightFooter}>{i18n.t("number-checkin")}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <>
      <FlashList
        data={DATA}
        renderItem={({ item }) => <RenderItem item={item} />}
        estimatedItemSize={200}
        showsVerticalScrollIndicator={false}
      />
      <CampaignBottomSheet
        ref={modalRef}
        snapPoints={snapPoints}
        handleLockingPress={handleLockingPress}
        handleSnapPress={handleSnapPress}
        handleSnapClosing={handleSnapClosing}
      />
      <LockingBottomSheet
        ref={lockingRef}
        snapPoints={snapPoints}
        handleLockingPress={handleLockingPress}
        handleSnapPress={handleSnapPress}
        handleLockingClosing={handleLockingClosing}
      />
    </>
  );
};

export default CampaignList;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    gap: 16,
    marginTop: 10,
    position: "relative",
  },
  phoneUser: {
    lineHeight: 19.6,
    fontFamily: "quicksand-light",
    fontSize: 15,
  },
  iconVerified: {
    width: 24,
    height: 24,
  },
  icon: {
    width: 24,
    height: 24,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfoContainer: {
    flex: 1,
    gap: 5,
  },
  nameSpecifiedContainer: {
    flexDirection: "row",
    gap: 5,
  },
  nameuser: {
    fontSize: 16,
    fontFamily: "quicksand-bold",
    paddingTop: 3,
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
  activateContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  activateContent: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  activateText: {
    fontFamily:"quicksand-medium",
    fontSize:12,
    lineHeight: 16
  }
});
