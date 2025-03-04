import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import TimelineCalendarScreen from "@/screens/calendars";
import SearchCustomer from "@/components/search-customer/SearchCustomer";
import ButtonAdd from "@/components/Button/ButtonAdd";
import ExpandableCalendarScreen from "@/components/other-calendar";
const Calendar = () => {
  const [dataCalendar, setDataCalendar] = useState<any>([])

  useEffect(() => {

    const getData = async () => {
    }
    getData()
  }, [])
  return (
    <View style={styles.container}>
      <ExpandableCalendarScreen dataCalendar={dataCalendar} />
      <ButtonAdd navigation={() => console.log('ok')} style={styles.buttonAdd} />
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
    bottom: 30,
    right: 20
  }
});
