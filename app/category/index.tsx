import {
  View,
  StyleSheet,
  ImageBackground,
} from "react-native";
import {
  SafeAreaView,
} from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import Colors from "@/constants/Colors";
import i18n from "@/translations/index";
import background from "@/assets/images/background-home.png";
import ScreenHeader from "@/atoms/HeaderComponent";
import { dataCategory } from "@/assets/data/list";
import ListCategory from "@/components/list-category/ListCategory";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";

interface Props {
  name: string;
  counting: number;
}

const Category = ({ name, counting }: Props) => {
   
  const router = useRouter();
  const params = useLocalSearchParams();
  const [data, setData] = useState<Object>(dataCategory);

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      setData(params);
    }
  }, []);

  return (
    <ImageBackground
      style={styles.container}
      source={background}
      imageStyle={{
        borderBottomLeftRadius: 15,
        height: 200,
        width: "100%",
        borderBottomRightRadius: 15,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.containerContent}>
          <ScreenHeader
            canGoBack
            title={i18n.t("list")}
            style={[styles.header]}
            colorTitle="white"
          />
          <ListCategory data={data as any} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfcfc",
  },
  containerContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  
  header: {
    paddingBottom: 10,
  },
});

export default Category;
