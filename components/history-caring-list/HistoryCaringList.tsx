import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useRef, useMemo, useCallback } from "react";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import moreIcon from "@/assets/icons/more.png";
import verifiedIcon from "@/assets/icons/verified.png";
import { blurhash } from "@/constants/BlurHash";
import i18n from "@/translations";
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";
import DownlineBottomSheet from "../bottom-sheet/DownlineBottomSheet";
import LockingBottomSheet from "../bottom-sheet/LockingBottomSheet";
import { useDimensions } from "@/hooks/useDimensions";
import doneNotifyIcon from "@/assets/stickers/cart-notify.png";
import waitingNotifyIcon from "@/assets/stickers/approve-notify.png";
import EmptyRenderFlatlist from "@/common/EmptyRenderFlatlist";
import { useRouter } from "expo-router";
import { FetchingDataLoader } from "../loading/LoadingFetch";
import { useTranslation } from "react-i18next";

interface Props {
  item: any;
  customer: any;
}

interface HistoryCaringProps {
  loading: boolean;
  history: any[];
  customer: any;
  t: any;
}

const RenderItem = ({ item, customer, t}: Props) => (
  <View style={[styles.itemContainer]}>
    <View style={styles.userContainer}>
      <View
        style={[
          styles.iconContainer,
          { borderColor: item?.status === "new" ? "#FCD369" : "#34C759" },
        ]}
      >
        <Image
          source={item?.status === "new" ? waitingNotifyIcon : doneNotifyIcon}
          alt=""
          style={styles.icon}
          placeholder={{ blurhash }}
          contentFit="fill"
          transition={1000}
        />
      </View>
      <View style={[styles.userInfoContainer, { paddingLeft: 10 }]}>
        <View style={[styles.nameContainer]}>
          <View style={styles.nameSpecifiedContainer}>
            <Text style={styles.nameuser}>{customer?.full_name}</Text>
          </View>
          <Image
            source={moreIcon}
            style={styles.icon}
            alt=""
            placeholder={{ blurhash }}
            contentFit="fill"
            transition={1000}
          />
        </View>
        <Text style={styles.phoneUser}>{customer?.phone}</Text>
        <Text style={styles.phoneUser}>{i18n.t("order-tab")}</Text>
      </View>
    </View>

    <View style={styles.seperator}></View>
    <View style={styles.group}>
      <Text style={styles.titleGroup}>{i18n.t("content")}</Text>
      <Text
        style={[
          styles.contentGroup,
          { fontSize: Platform.OS === "android" ? 10 : 13 },
        ]}
        numberOfLines={1}
      >
        {item?.note_now}
      </Text>
    </View>

    <View style={styles.buttonContainer}>
      <View style={[styles.button, { backgroundColor: item?.status === "new" ? "#FFEDBF" : "#AFF9D1" }]}>
        <Text style={[styles.textButton, { color: item?.status === "new" ? "#D19600" : "#064C26" }]}>
          {i18n.t("get-money")}
        </Text>
      </View>
    </View>
  </View>
);

const HistoryCaringList = ({
  loading,
  history,
  customer,
}: HistoryCaringProps) => {
  const isSmallScreen = useDimensions();
  const modalRef = useRef<BottomSheetModal>(null);
  const lockingRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["40%"], []);
  const router = useRouter();
 
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

  const handleAddingHistory = () => {
    router.push({
      pathname: "(modals)/appointment",
      params: { itemString: JSON.stringify(customer) },
    });
  };

  return (
    <>
      {loading ? (
        <FetchingDataLoader />
      ) : (
        <FlashList
        showsVerticalScrollIndicator={false}
        data={history}
        renderItem={({ item }) => <RenderItem item={item} customer={customer} />}
        estimatedItemSize={200}
        ListEmptyComponent={
          <EmptyRenderFlatlist
            message="empty-history-caring"
            message_action="empty-history-caring-action"
            action={handleAddingHistory}
          />
        }
      />
      )}
      
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

export default HistoryCaringList;

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
    width: 30,
    height: 30,
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
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
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
  textButton: {
    fontFamily: "quicksand-bold",
    fontSize: 15,
  },
  contentHighlight: {
    color: "#D80100",
  },
  boughtText: {
    fontFamily: "quicksand-bold",
    lineHeight: 19.6,
    fontSize: 15,
    paddingRight: 25,
  },
  contentGroup: {
    fontFamily: "quicksand-bold",
    fontSize: 13,
  },
  titleGroup: {
    fontFamily: "quicksand-light",
    fontSize: 15,
  },
  itemContainer: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 16,
    marginVertical: 10,
    borderRadius: 16,
  },
  discountTitle: {
    fontFamily: "quicksand-medium",
    fontSize: 15,
  },
  discountTitleOutstanding: {
    fontFamily: "quicksand-bold",
  },
  seperator: {
    backgroundColor: "#F1F2F4",
    width: "100%",
    height: 1,
    marginVertical: 10,
  },
  group: {
    flexDirection: "row",
    gap: 7,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "quicksand-light",
    fontSize: 17,
    paddingVertical: 10,
  },
  listContainer: {
    paddingTop: 15,
    flex: 1,
  },
  avatar: {
    width: 68,
    height: 68,
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
    alignItems: "center",
  },
  phone: {
    fontFamily: "quicksand-regular",
  },
  time: {
    fontFamily: "quicksand-bold",
    color: "#D80100",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 3,
    paddingTop: 30,
  },
  button: {
    width: "100%",
    height: 38,
    justifyContent: "center",
    borderRadius: 25,
    alignItems: "center",
  },
});
