import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Platform,
} from "react-native";
import React from "react";
import DropDownPicker from "react-native-dropdown-picker";
import i18n from "@/translations";
import { Entypo } from "@expo/vector-icons";

interface DropdownProps {
  data: { label: string; value: string; key: string }[];
  opening: boolean;
  onOpen: React.Dispatch<React.SetStateAction<boolean>>;
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<any>>;
  placeholder: string;
  useI18n?: boolean;
}

const DropdownPicker = ({
  data,
  opening,
  onOpen,
  value,
  setValue,
  loading,
  setLoading,
  placeholder,
  useI18n = true,
}: DropdownProps) => {
  DropDownPicker.setListMode("SCROLLVIEW");

  const displayPlaceholder = useI18n ? i18n.t(placeholder) : placeholder;

  return (
    <View style={Platform.OS === "ios" ? { zIndex: 100 } : {}}>
      <DropDownPicker
        open={opening}
        value={value}
        items={data}
        setOpen={onOpen}
        setValue={setValue}
        showTickIcon={true}
        loading={loading}
        ActivityIndicatorComponent={({ color, size }) => (
          <ActivityIndicator color={color} size={size} />
        )}
        activityIndicatorColor="red"
        placeholder={displayPlaceholder}
        placeholderStyle={{
          color: "#0E1013",
          fontFamily: "quicksand-medium",
        }}
        ArrowDownIconComponent={({ style }) => (
          <Entypo name="chevron-small-down" size={24} color="black" />
        )}
        ArrowUpIconComponent={({ style }) => (
          <Entypo name="chevron-small-up" size={24} color="black" />
        )}
        TickIconComponent={({ style }) => (
          <Entypo name="check" size={15} color="green" />
        )}
        badgeProps={{
          activeOpacity: 0.5,
        }}
        dropDownContainerStyle={{
          borderColor: "#BDC1C6",
          backgroundColor: "#fff",
          zIndex: 1000,
          elevation: 1000,
        }}
        style={{
          borderColor: "#BDC1C6",
          backgroundColor: "#fff",
        }}
        modalContentContainerStyle={{
          backgroundColor: "#fff",
        }}
        modalProps={{
          animationType: "fade",
        }}
        scrollViewProps={{
          decelerationRate: "fast",
        }}
        theme="LIGHT"
        bottomOffset={100}
      />
    </View>
  );
};

export default DropdownPicker;

const styles = StyleSheet.create({});
