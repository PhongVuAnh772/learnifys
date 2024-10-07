import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useCallback, useState } from "react";
import { useRouter } from "expo-router";
import i18n from "@/translations/index";
import background from "@/assets/images/background-home.png";
import bellIcon from "@/assets/icons/bell-icon.png";
import ActionRow from "@/components/action-header/ActionRow";
import SearchBar from "@/components/Search/SearchBar";
import searchIcon from "@/assets/icons/search.png";

interface Props {
  avatar_url: string;
  name: string;
  counting: number;
}

const ExploreHeader: React.FC<Props> = ({ avatar_url, name, counting }) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const handleEnterPress = async () => {
    router.push({
      pathname: "(modals)/searching" as any,
      params: { agency: searchValue },
    });
  };
  const getCurrentGreeting = useCallback(() => {
    const currentHour = new Date().getHours();
    
    if (currentHour < 12) {
      return i18n.t('good-morning');
    } else if (currentHour < 18) {
      return i18n.t('good-afternoon');
    } else {
      return i18n.t('good-evening');
    }
  },[]);
  console.log(getCurrentGreeting())
  return (
    <ImageBackground
      style={styles.container}
      source={background}
      imageStyle={{ borderRadius: 15 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.actionRow}>
          <View style={styles.informationRow}>
            <Image
              source={{
                uri: avatar_url,
              }}
              style={styles.avatar}
            />
            <View style={styles.textContainer}>
              <Text style={styles.greeting}>{getCurrentGreeting()}</Text>
              <Text style={styles.name}>{name}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.filterBtn}
              onPress={() => router.push("/(modals)/notification")}
            >
              <Image source={bellIcon} style={styles.icon} />
              <View style={styles.notificationCounting}>
                <Text style={styles.counting}>{counting}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.actionRow}>
          <View style={styles.itemRow}>
            <SearchBar
              color="#F5F5F5"
              placeholder={i18n.t("dealer-lookup")}
              handleEnterPress={handleEnterPress}
              value={searchValue}
              setValue={setSearchValue}
              keyboardType="phone-pad"
              maxLength={10}
              icon={searchIcon}
            />
            <ActionRow />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 200,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  filterBtn: {
    width: 45,
    height: 45,
    borderWidth: 3,
    borderColor: "gray",
    borderRadius: 24,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    resizeMode: "contain",
  },
  informationRow: {
    flexDirection: "row",
  },
  icon: {
    width: 25,
    height: 25,
  },
  textContainer: {
    paddingLeft: 10,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  greeting: {
    fontFamily: "quicksand-light",
    color: "white",
  },
  name: {
    fontFamily: "manrope-bold",
    color: "white",
    fontSize: 16,
  },
  notificationCounting: {
    width: 20,
    height: 20,
    position: "absolute",
    top: -5,
    right: -10,
    backgroundColor: "rgb(216, 1, 0)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  counting: {
    color: "white",
    fontWeight: "500",
    fontSize: 13,
  },
  itemRow: {
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
});

export default React.memo(ExploreHeader);
