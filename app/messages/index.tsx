import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import i18n from "@/translations";
import SearchBar from "@/components/Search/SearchBar";
import ScreenHeader from "@/atoms/HeaderComponent";
import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ButtonAdd from "@/components/Button/ButtonAdd";
import CampaignList from "@/components/campaign/CampaignList";
import searchIcon from "@/assets/icons/search.png";
import AccountBalance from "@/components/account-balance/AccountBalance";
import { messagesData } from "@/assets/data/messages";
import * as Haptics from "expo-haptics";
import Colors from "@/constants/Colors";
import SendMessage from "@/components/messages/SendMessage";
import { useTranslation } from "react-i18next";

const Messsages = () => {
  const { top } = useSafeAreaInsets();
  const handleEnterPress = () => {};
  const [value, setValue] = useState("");
  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [category, setCategory] = useState<string>("retail-revenue");
 
  const onCategoryChanged = (category: string) => {
    setCategory(category);
  };

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);
    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChanged(messagesData[index].name);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScreenHeader
          canGoBack
          title={i18n.t("send-message")}
          style={[styles.header]}
        />
        <AccountBalance />
        <View style={styles.scrollview}>
          <ScrollView
            horizontal
            ref={scrollRef}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: "center",
              gap: 23,
              height: 80,
              paddingVertical: 10,
            }}
          >
            {messagesData.map((item, index) => (
              <TouchableOpacity
                ref={(el) => (itemsRef.current[index] = el)}
                key={index}
                style={
                  activeIndex === index
                    ? styles.categoriesBtnActive
                    : styles.categoriesBtn
                }
                onPress={() => selectCategory(index)}
              >
                <Text
                  style={
                    activeIndex === index
                      ? styles.categoryTextActive
                      : styles.categoryText
                  }
                >
                  {i18n.t(item.name)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <SendMessage category={category} />
      </View>
    </SafeAreaView>
  );
};

export default Messsages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f3f4",
    paddingTop: 30,
  },
  title: {
    paddingTop: 20,
    paddingBottom: 10,
    fontFamily: "quicksand-light",
  },
  header: {
    paddingBottom: 15,
    paddingTop: 0,
    paddingHorizontal: 16,
  },
  categoriesBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
    paddingHorizontal: 0,
  },
  categoriesBtnActive: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#27A376",
    borderBottomWidth: 2,
    paddingBottom: 8,
  },
  categoryTextActive: {
    fontSize: 14,
    fontFamily: "quicksand-bold",
    color: "#27A376",
  },
  categoryText: {
    fontSize: 14,
    fontFamily: "quicksand-bold",
    color: Colors.grey,
    fontWeight: "400",
  },
  scrollview: {
    paddingLeft: 16
  },
});
