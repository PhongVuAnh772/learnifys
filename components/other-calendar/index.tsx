import React, { useRef, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar } from 'react-native-calendars';
import testIDs from './mocks/testIDs';
import { agendaItems, getMarkedDates } from './mocks/agendaItems';
import AgendaItem from './mocks/AgendaItem'
import { getTheme, themeColor, lightThemeColor } from './mocks/theme'
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';

const leftArrowIcon = <MaterialIcons name="chevron-left" size={24} color="black" />

const rightArrowIcon = <MaterialIcons name="chevron-right" size={24} color="black" />
const ITEMS: any[] = agendaItems;

interface Props {
  weekView?: boolean;
  dataCalendar: any;
}

const ExpandableCalendarScreen = (props: Props) => {
  const { weekView } = props;
  const marked = useRef(getMarkedDates());
  const theme = useRef(getTheme());
  const todayBtnTheme = useRef({
    todayButtonTextColor: themeColor
  });

  const onDateChanged = useCallback((date: string, updateSource: string) => {
    console.log('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
  }, []);

  const onMonthChange = useCallback(({ dateString }: any) => {
    console.log('ExpandableCalendarScreen onMonthChange: ', dateString);
  }, []);

  const renderItem = useCallback(({ item }: any) => {
    return <AgendaItem item={item} />;
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CalendarProvider
        date={ITEMS[1]?.title}
        // onDateChanged={onDateChanged}
        // onMonthChange={onMonthChange}
        showTodayButton
        disabledOpacity={0.6}
        theme={todayBtnTheme.current}
        todayBottomMargin={16}
        style={{ flex: 1 }}
      >
        {weekView ? (
          <WeekCalendar testID={testIDs.weekCalendar.CONTAINER} firstDay={1} markedDates={marked.current} />
        ) : (
          <ExpandableCalendar
            testID={testIDs.expandableCalendar.CONTAINER}
            theme={theme.current}
            firstDay={1}
            markedDates={marked.current}
            // leftArrowImageSource={leftArrowIcon}
            // rightArrowImageSource={rightArrowIcon}
            animateScroll
            closeOnDayPress={false}
          />
        )}
        <AgendaList
          sections={ITEMS}
          renderItem={renderItem}
          scrollToNextEvent
          sectionStyle={styles.section}
          dayFormat={'yyyy-MM-d'}
        />
      </CalendarProvider>
    </SafeAreaView>
  );
};

export default ExpandableCalendarScreen;

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20
  },
  header: {
    backgroundColor: 'lightgrey'
  },
  section: {
    backgroundColor: lightThemeColor,
    color: 'grey',
    textTransform: 'capitalize'
  }
});
