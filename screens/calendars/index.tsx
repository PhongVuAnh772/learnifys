import React, { Fragment } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  CalendarProvider,
  Calendar,
  TimelineList,
  TimelineProps,
  CalendarUtils,
  Timeline,
} from "react-native-calendars";
import { groupBy, filter, find } from "lodash";
import { timelineEvents, getDate } from "./mocks/timelineEvents";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
interface DotProps {
  color: string;
}
import { useTranslation } from "react-i18next";

const INITIAL_TIME = { hour: 9, minutes: 0 };
const INITIAL_DATE = "2022-07-06";

const EVENTS = timelineEvents;

const MyCustomComponent = (item: any) => (
  <View style={styles.customTimeline}></View>
);

const renderItem = (timelineProps: any, info: any) => {
  return (
    <Timeline
      {...timelineProps}
      // renderEvent={(item) => <MyCustomComponent item={item} />}
      styles={styles.timeline}
    />
  );
};

const CustomHeader = () => {
  const daysOfWeek = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  return (
    <Fragment>
      <View style={styles.titleContainer}>
        <View style={styles.titleContent}>
          <Text style={styles.title}>Tháng 6,2024</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 25 }}>
          <TouchableOpacity
          //  onPress={onPressPrev}
          >
            <MaterialIcons name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
          //  onPress={onPressNext}
          >
            <MaterialIcons name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.headerContainer}>
        {daysOfWeek.map((day) => (
          <Text key={day} style={styles.headerText}>
            {day}
          </Text>
        ))}
      </View>
    </Fragment>
  );
};

const Dot = ({ color }: DotProps) => (
  <View style={[styles.dot, { backgroundColor: color }]} />
);

export default class TimelineCalendarScreen extends React.Component {
  state = {
    currentDate: getDate(),
    events: EVENTS,
    eventsByDate: groupBy(EVENTS, (e: any) =>
      CalendarUtils.getCalendarDateString(e.start)
    ),
  };

  onDateChanged = (date: any, source: any) => {
    console.log("TimelineCalendarScreen onDateChanged: ", date, source);
    this.setState({ currentDate: date });
  };

  onMonthChange = (month: any, updateSource: any) => {
    console.log("TimelineCalendarScreen onMonthChange: ", month, updateSource);
  };

  createNewEvent = (timeString: any, timeObject: any) => {
    const { eventsByDate } = this.state;
    const hourString = `${(timeObject.hour + 1).toString().padStart(2, "0")}`;
    const minutesString = `${timeObject.minutes.toString().padStart(2, "0")}`;

    const newEvent = {
      id: "draft",
      start: `${timeString}`,
      end: `${timeObject.date} ${hourString}:${minutesString}:00`,
      title: "New Event",
      color: "white",
    };

    if (timeObject.date) {
      if (eventsByDate[timeObject.date]) {
        eventsByDate[timeObject.date] = [
          ...eventsByDate[timeObject.date],
          newEvent,
        ];
        this.setState({ eventsByDate });
      } else {
        eventsByDate[timeObject.date] = [newEvent];
        this.setState({ eventsByDate: { ...eventsByDate } });
      }
    }
  };

  approveNewEvent = (_timeString: any, timeObject: any) => {
    const { eventsByDate } = this.state;
  };

  private timelineProps = {
    format24h: true,
    onBackgroundLongPress: this.createNewEvent,
    onBackgroundLongPressOut: this.approveNewEvent,
    unavailableHours: [
      { start: 0, end: 6 },
      { start: 22, end: 24 },
    ],
    overlapEventsSpacing: 8,
    rightEdgeSpacing: 24,
  };

  render() {
    const { currentDate, eventsByDate } = this.state;

    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
          marginTop: 50,
          borderRadius: 14,
        }}
      >
        <CalendarProvider
          date={currentDate}
          showTodayButton
          disabledOpacity={0.6}
        >
          <Calendar
            style={styles.calendar}
            current={INITIAL_DATE}
            markingType={"multi-dot"}
            enableSwipeMonths
            markedDates={{
              [getDate(2)]: {
                selected: true,
                dots: [
                  { key: "vacation", color: "blue", selectedDotColor: "red" },
                  { key: "massage", color: "red", selectedDotColor: "white" },
                ],
              },
              [getDate(3)]: {
                disabled: true,
                dots: [
                  { key: "vacation", color: "green", selectedDotColor: "red" },
                  { key: "massage", color: "red", selectedDotColor: "green" },
                ],
              },
            }}
            customHeader={CustomHeader}
            theme={{
              textDayFontWeight: "500",
              textMonthFontWeight: "500",
              textDayHeaderFontWeight: "500",
            }}
          />
          <View style={styles.footer}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Dot color="#D80100" />
              <Text style={styles.footerText}>Có lịch</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Dot color="#1263FB" />
              <Text style={styles.footerText}>Chưa xử lý</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Dot color="#34C759" />
              <Text style={styles.footerText}>Đã hoàn thành</Text>
            </View>
          </View>
          <ScrollView style={{ flex: 1 }}>
            <TimelineList
              events={eventsByDate}
              timelineProps={this.timelineProps}
              showNowIndicator
              scrollToNow
              scrollToFirst
              initialTime={INITIAL_TIME}
              renderItem={renderItem}
            />
          </ScrollView>
        </CalendarProvider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  calendar: {
    borderRadius: 14,
    minHeight: 350,
  },
  titleContent: {
    backgroundColor: "#2E3134",

    width: 169,
    height: 36,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    backgroundColor: "white",
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  title: {
    color: "white",
    fontFamily: "quicksand-bold",
  },

  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    backgroundColor: "white",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  headerText: {
    fontSize: 16,
    color: "#A5A5A9",
    flex: 1,
    textAlign: "center",
    fontFamily: "quicksand-light",
  },
  footer: {
    height: 50,
    backgroundColor: "white",
    elevation: 1,
    zIndex: 1,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    gap: 15,
    paddingTop: 10,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 1000,
  },
  footerText: {
    fontFamily: "quicksand-light",
    fontSize: 14,
  },
  customTimeline: {
    width: 200,
    height: 50,
    backgroundColor: "rgb(255, 255, 255)",
  },
  timeline: {},
});
