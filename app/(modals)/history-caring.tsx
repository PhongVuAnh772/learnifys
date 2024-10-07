import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useRef, useState,useEffect } from "react";
import i18n from "@/translations";
import ScreenHeader from "@/atoms/HeaderComponent";
import ButtonAdd from "@/components/Button/ButtonAdd";
import HistoryCaringList from "@/components/history-caring-list/HistoryCaringList";
import { useRouter, useLocalSearchParams } from "expo-router";
import { getCaring } from "@/services/caring.service";
import { getTokenFromState } from "@/auth/ctx";
import { useTranslation } from "react-i18next";

const HistoryCaring = () => {
   
  const isMoreIconPressed = useLocalSearchParams();
  const router = useRouter();
  const token = getTokenFromState() as string;
  const [dataHistory, setDataHistory] = useState<any>([]);
  const [loading,setLoading] = useState(false);
  const handleNavigation = () => {
    router.push({
      pathname: "(modals)/appointment",
      params: { itemString: JSON.stringify(isMoreIconPressed) },
    });
  };
  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await getCaring(token, 20, isMoreIconPressed.id as any);
      if (response) {
        console.log(response);
        setDataHistory(response.listData);
        setLoading(false);
      }
    })()
  }, [])
  
  return (
    <View style={styles.container}>
      <ScreenHeader
        canGoBack
        title={i18n.t("history-caring")}
        style={[styles.header]}
        right={<ButtonAdd navigation={handleNavigation} />}
      />

      <HistoryCaringList loading={loading} history={dataHistory} customer={isMoreIconPressed} />
    </View>
  );
};

export default HistoryCaring;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f3f4",
    paddingTop: 30,
    paddingHorizontal: 16,
  },
  title: {
    paddingTop: 20,
    paddingBottom: 10,
    fontFamily: "quicksand-light",
  },
  header: {
    paddingBottom: 10,
  },
});
