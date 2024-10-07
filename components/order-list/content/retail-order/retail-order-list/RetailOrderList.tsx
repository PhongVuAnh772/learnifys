import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import OrderChildren from "@/common/OrderChildren";
import { getTokenFromState } from "@/auth/ctx";
import { getDataOrderList } from "@/services/order.service";
import { useTranslation } from "react-i18next";

interface Props {
  item: any;
}
const RenderItem = ({ item }: Props) => {
  return <OrderChildren />;
};
const RetailOrderList = () => {
  const [orderList, setOrderList] = useState<[]>([]);
  const tokens = getTokenFromState() as string;
  const { t } = useTranslation();
  useEffect(() => {
    const fetchData = async () => {
      const response = (await getDataOrderList(tokens, 20)) as any;
      if (response && response?.listData) {
        setOrderList(response.listData);
      } else {
        setOrderList([]);
      }
    };
    fetchData();
  }, []);
  return (
    <FlashList
    showsVerticalScrollIndicator={false}
      data={orderList}
      renderItem={({ item }) => <RenderItem item={item} />}
      estimatedItemSize={200}
    />
  );
};

export default RetailOrderList;

const styles = StyleSheet.create({
  textButton: {
    fontFamily: "quicksand-bold",
    fontSize: 15,
  },
  nameSpecifiedContainer: {
    flexDirection: "row",
  },
  phoneUser: {
    lineHeight: 19.6,
    fontFamily: "quicksand-light",
    fontSize: 15,
  },
  contentHighlight: {
    color: "#D80100",
  },
  nameContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
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
  container: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 16,
    marginVertical: 10,
    height: 280,
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
  userInfoContainer: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: "space-between",
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
  },
  button: {
    width: "100%",
    height: 38,
    justifyContent: "center",
    borderRadius: 25,
    alignItems: "center",
  },
});
