import React, { useState } from "react";
import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  Button,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
import calendarIcon from "@/assets/icons/calendar.png";
import { Image } from "expo-image";
import { blurhash } from "@/constants/BlurHash";
import i18n from "@/translations";
import { useTranslation } from "react-i18next";

interface DateTimePickerProps {
  bgColor?: string;
  mode?: "date" | "time" | "datetime" | undefined;
  minimumDate?: Date;
  value: Date;
  onChange: (event: DateTimePickerEvent, date?: Date) => void;
  inputStyles?: StyleProp<ViewStyle>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
}

const DateTimePickerRN = ({
  bgColor = "white",
  mode = "datetime",
  minimumDate = new Date(),
  value,
  onChange,
  inputStyles,
  show,
  setShow,
}: DateTimePickerProps) => {
  const [tempDate, setTempDate] = useState(value);
  const pickerMode =
    Platform.OS === "android" && mode === "datetime" ? "date" : mode;
 
  // Format the date to a readable string
  const formattedDate = tempDate.toLocaleDateString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || tempDate;
    setTempDate(currentDate);
  };

  const handleConfirm = () => {
    onChange(null as unknown as DateTimePickerEvent, tempDate); // Ensuring type compatibility
    setShow(false);
  };

  return (
    <TouchableWithoutFeedback onPress={() => setShow(false)}>
      <View
        style={[
          styles.searchContainer,
          { backgroundColor: bgColor },
          inputStyles,
        ]}
      >
        {show ? (
          <>
            <DateTimePicker
              mode={pickerMode}
              minimumDate={minimumDate}
              value={tempDate}
              onChange={handleDateChange}
              display="compact"
              style={styles.calendar}
            />
            <Pressable onPress={handleConfirm}>
                <Text style={styles.buttonText}>{i18n.t("accecpt")}</Text>
            </Pressable>
          </>
        ) : (
          <Text style={styles.dateText}>{formattedDate}</Text>
        )}
        <Pressable onPress={() => setShow(!show)}>
          <Image
            source={calendarIcon}
            style={styles.calendarIcon}
            alt=""
            placeholder={{ blurhash }}
            contentFit="fill"
            transition={1000}
          />
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DateTimePickerRN;

const styles = StyleSheet.create({
  searchContainer: {
    width: "100%",
    gap: 8,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    padding: 12,
    borderColor: "#BDC1C6",
    borderWidth: 1,
    justifyContent: "space-between",
  },
  calendar: {
    margin: 0,
    padding: 0,
    gap: 0,
  },
  calendarIcon: {
    width: 24,
    height: 24,
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  buttonText: {
    color:"blue"
  }
});
