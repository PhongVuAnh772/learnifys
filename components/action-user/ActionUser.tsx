import rightIcon from "@/assets/icons/right.png";
import { blurhash } from "@/constants/BlurHash";
import i18n from "@/translations";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";

interface Props {
  icon: any;
  title: string;
  navigation?: string;
  action?: () => void;
  usingSwitch?: boolean;
  onToggleSwitchLocation?: () => void;
  isSwitchOnLocation?: boolean;
}

const ActionUser = ({
  icon,
  title,
  navigation,
  action,
  usingSwitch,
  onToggleSwitchLocation,
  isSwitchOnLocation,
}: Props) => {
  const router = useRouter();

  const handlePress = () => {
    if (action) {
      action();
    }
    if (navigation) {
      router.push(navigation as any);
    }
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View style={styles.iconContainer}>
        <Image
          source={icon}
          style={styles.icon}
          alt=""
          placeholder={{ blurhash }}
          contentFit="fill"
          transition={1000}
        />
        <Text
          style={[
            styles.title,
            { color: title === "log-out" ? "red" : "black" },
          ]}
        >
          {i18n.t(title)}
        </Text>
      </View>
      {usingSwitch ? (
        <Switch
          value={isSwitchOnLocation}
          onValueChange={onToggleSwitchLocation}
        />
      ) : (
        <Image
          source={rightIcon}
          style={styles.rightIcon}
          alt=""
          placeholder={{ blurhash }}
          contentFit="fill"
          transition={1000}
        />
      )}
    </Pressable>
  );
};

export default ActionUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: "quicksand-medium",
    fontSize: 16,
    paddingLeft: 10,
  },
  rightIcon: {
    width: 20,
    height: 20,
  },
});
