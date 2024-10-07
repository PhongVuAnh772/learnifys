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

interface Props {
  name: string;
  counting: number;
}

const UserHeader = ({ name, counting }: Props) => {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <ImageBackground
      style={styles.container}
      source={background}
      imageStyle={{ borderRadius: 15}}
    >
        <View style={styles.actionRow}>
            <Image
              source={{
                uri: "https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/431950848_1466647250941777_8807338962286312656_n.jpg?stp=dst-jpg_p200x200&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=SGP71mtKArYQ7kNvgE7aEKC&_nc_ht=scontent.fhan2-3.fna&oh=00_AYBzl1h26daSGIA-hUokIdJmiSnb4yhHtiTA2doAqYr3iQ&oe=6676D2BC",
              }}
              style={styles.avatar}
            />
            <View style={styles.textContainer}>
              <Text style={styles.name}>Trần Ngọc Mạnh</Text>
                            <Text style={styles.companyName}>CEO Founder - Phoenix Tech</Text>

              <Text style={styles.phone}>0789 373 568</Text>
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
