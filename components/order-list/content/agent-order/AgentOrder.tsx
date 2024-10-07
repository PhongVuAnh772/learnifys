import { StyleSheet, Text, View } from "react-native";
import React, {useEffect,useState} from "react";
import TotalRevenue from "@/components/total-revenue/TotalRevenue";
import i18n from "@/translations";
import AgentOrderList from "./agent-order-list/AgentOrderList";
import { getDataOrderList } from "@/services/order.service";
import { getTokenFromState } from "@/auth/ctx";
import { useTranslation } from "react-i18next";

const AgentOrder = () => {
  const token = getTokenFromState();
  const [dataAgentOrder, setDataAgentOrder] = useState([])
  useEffect(() => {
    (async () => {
      const response = await getDataOrderList(token as string, 20, )
      if (response) {
        setDataAgentOrder(response.listData)
        console.log(response.listData)
      }
    })()
  }, [])
   
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t("order-list")}</Text>
      <AgentOrderList />
    </View>
  );
};

export default AgentOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "5%",
  },
  title: {
    fontFamily: "quicksand-light",
    fontSize: 17,
    paddingVertical: 10,
  },
});
