import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef, useMemo, useCallback } from "react";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import moreIcon from "@/assets/icons/more.png";
import verifiedIcon from "@/assets/icons/verified.png";
import { blurhash } from "@/constants/BlurHash";
import i18n from "@/translations";
import RegistrationList from "./RegistrationList";
import QRRedirect from "../QR/QRRedirect";
import Seperator from "../seperator/Seperator";
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";
import DownlineBottomSheet from "../bottom-sheet/DownlineBottomSheet";
import LockingBottomSheet from "../bottom-sheet/LockingBottomSheet";

interface Props {
  item: any;
}

const DownlineList = () => {
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
    },
    {
      title: "Second Item",
    },
  ];

  const RenderItem = ({ item }: Props) => (
    <View style={styles.container}>
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
        <Text style={styles.phoneUser}>
          21 Lê Văn Lương, Thanh Xuân, Hà Nội
        </Text>
        <Text style={styles.phoneUser}>0398622314</Text>
        <RegistrationList />
        <Seperator />
        <QRRedirect navigation="/qr/123" />
      </View>
    </View>
  );

  return (
    <>
      <FlashList
      showsVerticalScrollIndicator={false}
        data={DATA}
        renderItem={({ item }) => <RenderItem item={item} />}
        estimatedItemSize={200}
      />
      <DownlineBottomSheet
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

export default DownlineList;

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
});
