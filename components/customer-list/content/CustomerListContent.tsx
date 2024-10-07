import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Pressable,
  FlatList,
} from "react-native";
import React, { useCallback, useMemo, useRef,useState,useEffect } from "react";
import { FlashList } from "@shopify/flash-list";
import { Facebook } from "react-content-loader";
import { Image } from "expo-image";
import { blurhash } from "@/constants/BlurHash";
import i18n from "@/translations";
import moreIcon from "@/assets/icons/more.png";
import verifiedIcon from "@/assets/icons/verified.png";
import Seperator from "@/components/seperator/Seperator";
import CustomerBottomSheet from "@/components/bottom-sheet/CustomerBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import LockingCustomerBottomSheet from "@/components/bottom-sheet/LockingCustomerBottomSheet";
import { parseDate } from "@/helpers/parseDateHelpers";
import { useRouter } from "expo-router";
import { getTokenFromState } from "@/auth/ctx";
import { getCustomer } from "@/services/customer.service";
import { useTranslation } from "react-i18next";

interface Props {
  item: any;
  handleLockingPress: () => void;
  handleSnapPress: () => void;
  handleSnapClosing: () => void;
  isMoreIconPressed: number | null; 
  setIsMoreIconPressed: React.Dispatch<React.SetStateAction<number | null>>;
}
const RenderItem = ({ item, handleSnapPress, handleSnapClosing,isMoreIconPressed,setIsMoreIconPressed }: Props) => {
  const router = useRouter();
  const itemString = JSON.stringify(item);
  const [nextPage, setNextPage] = useState('');
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<[]>([]);
  const tokens = getTokenFromState() as string;
  const handleAppointment = () => {
    router.push({
      pathname: "(modals)/appointment",
      params: { itemString: itemString },
    });
  };
  const handleMore = () => {
    setIsMoreIconPressed(item);
    handleSnapPress();
  }
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = (await getCustomer(tokens, 20)) as any;
      if (response && response?.listData) {
        setCustomers(response.listData);
        setLoading(false);
        console.log(response)
      } else {
        setCustomers([]);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          source={{
            uri: item.avatar,
          }}
          style={styles.avatar}
          alt=""
          placeholder={{ blurhash }}
          contentFit="fill"
          transition={1000}
        />
        <View style={styles.userInfoContainer}>
          <View style={styles.nameContainer}>
            <View style={styles.nameSpecifiedContainer}>
              <Text style={styles.nameuser}>{item.full_name}</Text>
              <Image
                source={verifiedIcon}
                style={styles.iconVerified}
                alt=""
                placeholder={{ blurhash }}
                contentFit="fill"
                transition={1000}
              />
            </View>
            <Pressable onPress={handleMore} style={styles.icon}>
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
          <Text style={styles.phoneUser}>{item.phone}</Text>
        </View>
      </View>
      <View style={[styles.userContainer, { paddingTop: 3 }]}>
        <View style={{ width: 44, height: 2 }}></View>
        <View
          style={[
            styles.userInfoContainer,
            { justifyContent: "space-between", flexDirection: "row" },
          ]}
        >
          <Text style={styles.phoneUser}>{i18n.t("order-tab")}</Text>
          <Text style={styles.boughtText}>{`${i18n.t("bought")} 6 ${i18n.t(
            "order-tab-light"
          )}`}</Text>
        </View>
      </View>
      <Seperator />

      {item.groups && (
        <View style={[styles.group, { paddingBottom: 10 }]}>
          <Text style={styles.titleGroup}>{i18n.t("group-customer")}</Text>
          <Text style={styles.contentGroup}>
            BẢN ĐỒ KINH DOANH THÀNH CÔNG 6/2024
          </Text>
        </View>
      )}
      <View style={[styles.group, { paddingBottom: 10 }]}>
        <Text style={styles.titleGroup}>{i18n.t("take-care")}</Text>
        <Text style={styles.contentGroup}>
          <Text style={styles.contentHighlight}>
            {item?.history?.time_now && parseDate(item?.history?.time_now)}
          </Text>{" "}
          {item?.history?.note_now}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { borderColor: "#0E1013", borderWidth: 1 }]}
          onPress={handleAppointment}
        >
          <Text style={[styles.textButton, { color: "#0E1013" }]}>
            {i18n.t("make-appointment")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: "red" }]}>
          <Text style={[styles.textButton, { color: "white" }]}>
            {i18n.t("create-order")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CustomerListAppointment = (customer: any) => {
  const modalRef = useRef<BottomSheetModal>(null);
  const lockingRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["40%"], []);
  const [isMoreIconPressed, setIsMoreIconPressed] = useState<number | null>(null);
  const handleSnapPress = useCallback(() => {
    modalRef.current?.present();
  }, []);
  const handleLockingPress = useCallback(() => {
    lockingRef.current?.present();
  }, []);
  const handleSnapClosing = useCallback(() => {
    modalRef.current?.forceClose();
  }, []);
  const handleLockingClosing = useCallback(() => {
    lockingRef.current?.close();
  }, []);
   
  return (
    <View style={styles.listContainer}>
      <Text style={styles.title}>{i18n.t("customer-list")}</Text>

      {
        <FlashList
        showsVerticalScrollIndicator={false}
          data={customer?.customer}
          renderItem={({ item }) => (
            <RenderItem
              item={item}
              handleLockingPress={handleLockingPress}
              handleSnapPress={handleSnapPress}
              handleSnapClosing={handleSnapClosing}
              isMoreIconPressed={isMoreIconPressed}
            setIsMoreIconPressed={setIsMoreIconPressed}
           
            />
          )}
          estimatedItemSize={200}
          // onRefresh={}
        />
      }
      <CustomerBottomSheet
        ref={modalRef}
        snapPoints={snapPoints}
        handleLockingPress={handleLockingPress}
        handleSnapPress={handleSnapPress}
        handleSnapClosing={handleSnapClosing}
        isMoreIconPressed={isMoreIconPressed}
        setIsMoreIconPressed={setIsMoreIconPressed}
      />
      <LockingCustomerBottomSheet
        ref={lockingRef}
        snapPoints={snapPoints}
        handleLockingPress={handleLockingPress}
        handleSnapPress={handleSnapPress}
        handleLockingClosing={handleLockingClosing}
        handleSnapClosing={handleSnapClosing}
        isMoreIconPressed={isMoreIconPressed}
        setIsMoreIconPressed={setIsMoreIconPressed}
      />
    </View>
  );
};

export default CustomerListAppointment;

const styles = StyleSheet.create({
  textButton: {
    fontFamily: "quicksand-bold",
    fontSize: 15,
  },
  nameSpecifiedContainer: {
    flexDirection: "row",
    gap: 5,
  },
  phoneUser: {
    lineHeight: 19.6,
    fontFamily: "quicksand-light",
    fontSize: 15,
  },
  contentHighlight: {
    color: "#D80100",
    fontSize: Platform.OS === "android" ? 13 : 15,
  },
  nameContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  boughtText: {
    fontFamily: "quicksand-bold",
    lineHeight: 19.6,
    fontSize: 15,
    paddingRight: 25,
  },
  contentGroup: {
    fontFamily: "quicksand-bold",
    fontSize: 15,
  },
  titleGroup: {
    fontFamily: "quicksand-light",
    fontSize: 15,
  },
  container: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 16,
    marginVertical: 10,
    borderRadius: 16,
  },

  userInfoContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  group: {
    flexDirection: "column",
    gap: 7,
  },
  title: {
    fontFamily: "quicksand-light",
    fontSize: 17,
    paddingVertical: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconVerified: {
    width: 24,
    height: 24,
  },
  listContainer: {
    paddingTop: 15,
    flex: 1,
  },
  nameuser: {
    fontSize: 16,
    fontFamily: "quicksand-bold",
    marginTop: Platform.OS === "android" ? -3 : 3,
  },
  avatar: {
    width: 44,
    height: 44,
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
  },
  button: {
    width: "48%",
    height: 38,
    justifyContent: "center",
    borderRadius: 25,
    alignItems: "center",
  },
});
