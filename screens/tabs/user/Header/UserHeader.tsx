import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
} from "react-native";
import { useRef, useState } from "react";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Link, useRouter } from "expo-router";
import i18n from "@/translations/index";
import background from "@/assets/images/background-home.png";
import bellIcon from "@/assets/icons/bell-icon.png";
import ActionRow from "@/components/action-header/ActionRow";
import SearchBar from "@/components/Search/SearchBar";
import { storage } from "@/mmkv";
import { useAuth } from "@/auth/ctx";

interface Props {
  name: string;
  email: number;
  avatar_url: string;
}

const UserHeader = ({ name, email,avatar_url }: Props) => {
  const {role} = useAuth();
  const getRoleString = () => {
    if (role === "student") {
          return i18n.t('student')
        } else if (role === "teacher") {
          return i18n.t('teacher')
        } else if (role === "admin") {
          return i18n.t('admin') 
        } else if (role === "parent") {
          return i18n.t('parent')
        }
  }
  return (
    <ImageBackground
      style={styles.container}
      source={background}
      imageStyle={{ borderRadius: 15}}
    >
        <View style={styles.actionRow}>
            <Image
              source={{
                uri: avatar_url,
              }}
              style={styles.avatar}
            />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.companyName}>{`Chức vụ : ${getRoleString()}`}</Text>
              <Text style={styles.phone}>{email}</Text>
            </View>
          
        </View>
        
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 301,
  },
  actionRow: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    flex: 1,
    
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
  companyName: {
    fontFamily: "quicksand-medium",
    color:'white',
    fontSize: 18
  },
  phone: {
    fontFamily: "quicksand-light",
    color:'white',
    fontSize: 18
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 20,
    gap: 10
  },
  greeting: {
    fontFamily: "quicksand-light",
    color: "white",
  },
  name: {
    fontFamily: "quicksand-bold",
    color: "white",
    fontSize: 20,
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
    maxHeight: 200,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
});

export default UserHeader;
