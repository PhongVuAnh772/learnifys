import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TimelineCalendarScreen from "@/screens/calendars";
import SearchCustomer from "@/components/search-customer/SearchCustomer";
import ButtonAdd from "@/components/Button/ButtonAdd";
const Calendar = () => {
  return (
    <View style={styles.container}>
      <SearchCustomer />
      <TimelineCalendarScreen />
        <ButtonAdd navigation="" style={styles.buttonAdd}/>
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonAdd: {
    position: 'absolute',
    bottom:30,
    right: 20
  }
});
