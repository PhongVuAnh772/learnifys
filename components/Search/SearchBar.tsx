import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardTypeOptions,
  StyleProp,
  TextStyle,
  ViewStyle,
  ImageSourcePropType,
} from "react-native";
import React, { ReactNode, useMemo, ReactElement } from "react";
import { Image } from "expo-image";
import i18n from "@/translations";
import searchIcon from "@/assets/icons/search.png";
import PrimaryButton from "@/atoms/PrimaryButton";
type HeaderButton = {
  icon: ReactNode;
  color?: string;
  onPress?: () => void;
  badge?: number | string;
};

interface Props {
  color: string;
  placeholder: string;
  handleEnterPress?: () => void;
  keyboardType: KeyboardTypeOptions;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  maxLength?: number;
  icon?: ReactNode | ImageSourcePropType;
  inputStyles?: StyleProp<ViewStyle>;
  secureTextEntry?: boolean;
  rightIcons?: HeaderButton[];
  right?: ReactElement;
}

const SearchBar = ({
  maxLength,
  color,
  placeholder,
  handleEnterPress,
  value,
  setValue,
  keyboardType,
  icon,
  inputStyles,
  secureTextEntry,
  rightIcons,
  right,
}: Props) => {
  const rightButtons = useMemo(
    () => [...(rightIcons ? rightIcons : [])],
    [rightIcons]
  );

  return (
    <View
      style={[styles.searchContainer, { backgroundColor: color }, inputStyles]}
    >
      {typeof icon === "number" ? (
        <Image source={icon as ImageSourcePropType} style={styles.iconSearch} />
      ) : (
        (icon as React.ReactNode)
      )}

      <TextInput
        style={[styles.input]}
        placeholder={placeholder}
        placeholderTextColor="gray"
        returnKeyType="done"
        onSubmitEditing={handleEnterPress}
        keyboardType={keyboardType}
        onChangeText={setValue}
        value={value}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
      />
      {right}
      {rightButtons.map((item: any, index: number) => {
        return (
          <PrimaryButton
            style={{
              position: "absolute",
              bottom: 20,
              width: "100%",
              height: 54,
              borderRadius: 1000,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#D80100",
            }}
            mode="outlined"
            onPress={() => console.log("Pk")}
          >
            {item}
          </PrimaryButton>
        );
      })}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    width: "100%",
    gap: 8,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    padding: 12,
  },
  searchBtn: {
    backgroundColor: "#fff",
    flexDirection: "row",
    gap: 10,
    padding: 14,
    alignItems: "center",
    width: 270,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#c2c2c2",
    borderRadius: 30,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: "quicksand-medium",
  },

  iconSearch: {
    width: 18,
    height: 18,
  },
});
