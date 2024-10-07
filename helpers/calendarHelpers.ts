import React, { useEffect } from "react";
import { StyleSheet, View, Text, Button, Platform } from "react-native";
import * as Calendar from "expo-calendar";

export const getCalendarPermissions = async () => {
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
        return({ calendars });
      }
    })();
  }, []);
};
