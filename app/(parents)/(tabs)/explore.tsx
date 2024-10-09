import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Mapbox from '@rnmapbox/maps';

const LOCATION_TASK_NAME = "background-location-task";
Mapbox.setAccessToken('pk.eyJ1IjoicGhvbmd2dWFuaDc3MiIsImEiOiJjbTIyM3ViMGUwMzIzMmtwc2x3OWZodzA0In0.Aa8KkZQXO713qrQB2fzVHw');

interface LocationCoords {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const useLocation = (): {
  region:  null;
  error: string;
  statusGranted: boolean;
} => {
  const [region, setRegion] = useState<null>(null);
  const [error, setError] = useState<string>("");
  const [statusGranted, setStatusGranted] = useState<boolean>(false);
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setStatusGranted(true);
        await getLocationAsync();
      } else {
        setStatusGranted(false);
        setError("Location services needed");
      }
    };

    const getLocationAsync = async () => {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.High,
        distanceInterval: 1,
        timeInterval: 500,
      });

      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 1,
          timeInterval: 500,
        },
        (newLocation) => {
          const { latitude, longitude } = newLocation.coords;
          const region: any = {
            latitude,
            longitude,
            latitudeDelta: 0.045,
            longitudeDelta: 0.045,
          };
          setRegion(region);
          console.log(latitude, longitude)
        }
      );
    };

    requestPermissions();
  }, []);

  return { region, error, statusGranted };
};

const MapScreen: React.FC = () => {
  const { region, error, statusGranted } = useLocation();
  const mapRef = useRef<null>(null);

  if (!statusGranted) {
    return (
      <View style={styles.container}>
        <Text>{statusGranted}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <Mapbox.MapView style={styles.map} />
    </View>
  );
};

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.log(error);
    return;
  }
  if (data) {
    const { locations } = data as { locations: Location.LocationObject[] };
    const lat = locations[0].coords.latitude;
    const long = locations[0].coords.longitude;
    const userId = (await AsyncStorage.getItem("userId")) || "none";
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    flex: 1
  }
});

export default MapScreen;
