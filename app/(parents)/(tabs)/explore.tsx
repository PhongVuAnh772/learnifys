import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Region, MapViewProps } from "react-native-maps";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const LOCATION_TASK_NAME = "background-location-task";

interface LocationCoords {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const useLocation = (): {
  region: Region | null;
  error: string;
  statusGranted: boolean;
} => {
  const [region, setRegion] = useState<Region | null>(null);
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
        timeInterval: 5000,
      });

      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 1,
          timeInterval: 10000,
        },
        (newLocation) => {
          const { latitude, longitude } = newLocation.coords;
          const region: Region = {
            latitude,
            longitude,
            latitudeDelta: 0.045,
            longitudeDelta: 0.045,
          };
          setRegion(region);
        }
      );
    };

    requestPermissions();
  }, []);

  return { region, error, statusGranted };
};

const MapScreen: React.FC = () => {
  const { region, error, statusGranted } = useLocation();
  const mapRef = useRef<MapView | null>(null);

  if (!statusGranted) {
    return (
      <View style={styles.container}>
        <Text>{statusGranted}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={region || undefined}
        showsCompass={true}
        showsUserLocation={true}
        rotateEnabled={true}
        ref={mapRef}
        style={{ flex: 1 }}
      />
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

    // Storing received Lat & Long to DB by logged In User Id
    axios.post("http://000.000.0.000/phpServer/ajax.php", {
      action: "saveLocation",
      userId,
      lat,
      long,
    });
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default MapScreen;
