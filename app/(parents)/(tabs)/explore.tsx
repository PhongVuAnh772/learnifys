import { showToast } from "@/helpers/ToastHelpers";
import ColorfulCard from "@freakycoder/react-native-colorful-card";
import { Logger, default as Mapbox, default as MapboxGL } from "@rnmapbox/maps";
import * as Location from "expo-location";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const routeProfiles = [
  { id: "walking", label: "Walking", icon: "walking" },
  { id: "cycling", label: "Cylcing", icon: "bicycle" },
  { id: "driving", label: "Driving", icon: "car" },
];

Mapbox.setAccessToken(
  "sk.eyJ1IjoicGhvbmd2dWFuaDc3MiIsImEiOiJjbTI0NG56eHowZTVpMmtzZHJzbnd0MnJtIn0.B5aYUvqWo_LJbVDLaiMKCQ"
);
Logger.setLogCallback((log) => {
  const { message } = log;

  if (
    message.match("Request failed due to a permanent error: Canceled") ||
    message.match("Request failed due to a permanent error: Socket Closed")
  ) {
    return true;
  }
  return false;
});

interface LocationCoords {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const MapScreen: React.FC = () => {
  const [location, setLocation] = useState<any>(null);
  const [coordinates, setCoordinates] = useState<[number, number]>([
    105.0011377, 20.8444899,
  ]);
  const [routeDirections, setRouteDirections] = useState<any | null>(null);
  const [coords, setCoords] = useState<[number, number]>([12.48839, 50.72724]);
  const [distance, setDistance] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;
  const [destinationCoords, setDestinationCoords] = useState<[number, number]>([
    12.48839, 50.72724,
  ]);
  const [loading, setLoading] = useState(true);
  const [selectedRouteProfile, setselectedRouteProfile] =
    useState<string>("walking");
  useFocusEffect(
    useCallback(() => {
      Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      })
        .then((res) => {
          setCoordinates([res.coords.longitude, res.coords.latitude]);
          console.log(res);
        })
        .catch((e) => console.log(e));
    }, [])
  );
  const [calloutVisible, setCalloutVisible] = useState(false);
  const onMarkerPress = () => {
    setCalloutVisible(true);
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Error to get permission");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  useFocusEffect(
    useCallback(() => {
      getCurrentLocation();
    }, [])
  );
  async function createRouterLine(
    coords: [number, number],
    routeProfile: string
  ): Promise<void> {
    const geometries = "geojson";
    const url = `https://api.mapbox.com/directions/v5/mapbox/${"driving"}/${coordinates};${`-112.406417,37.785834`}?alternatives=true&geometries=${geometries}&steps=true&banner_instructions=true&overview=full&voice_instructions=true&access_token=${`sk.eyJ1IjoicGhvbmd2dWFuaDc3MiIsImEiOiJjbTI0NG56eHowZTVpMmtzZHJzbnd0MnJtIn0.B5aYUvqWo_LJbVDLaiMKCQ`}`;
    try {
      let response = await fetch(url);
      let json = await response.json();
      console.log("json", json);
      if (json?.code === "NoRoute") {
        showToast({
          msg: "No Route",
          type: "error",
        });
      }

      json?.coordinates?.map((data: any) => {
        setDistance((data.distance / 1000).toFixed(2));
        setDuration((data.duration / 3600).toFixed(2));
      });
      let coordinates = json["routes"][0]["geometry"]["coordinates"];
      console.log("coordinates", coordinates);
      setDistance(json["routes"][0]?.distance);
      let destinationCoordinates =
        json["routes"][0]["geometry"]["coordinates"].slice(-1)[0];
      setDestinationCoords(destinationCoordinates);
      if (coordinates.length) {
        const routerFeature = makeRouterFeature([...coordinates]);
        setRouteDirections(routerFeature);
      }
      setLoading(false);
      console.log("routeDirections", routeDirections);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

  useEffect(() => {
    if (selectedRouteProfile !== null) {
      createRouterLine(coords, selectedRouteProfile);
    }
  }, [selectedRouteProfile]);

  function makeRouterFeature(coordinates: [number, number][]): any {
    let routerFeature = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: coordinates,
          },
        },
      ],
    };
    return routerFeature;
  }
  const renderItem = ({
    item,
  }: {
    item: { id: string; label: string; icon: string };
  }) => (
    <TouchableOpacity
      style={[
        styles.routeProfileButton,
        item.id == selectedRouteProfile && styles.selectedRouteProfileButton,
      ]}
      onPress={() => setselectedRouteProfile(item.id)}
    >
      <Text
        style={[
          styles.routeProfileButtonText,
          item.id == selectedRouteProfile &&
            styles.selectedRouteProfileButtonText,
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        style={styles.map}
        zoomEnabled={true}
        styleURL="mapbox://styles/mapbox/navigation-night-v1"
        rotateEnabled={true}
        onDidFinishLoadingMap={async () => {
          await createRouterLine(coords, selectedRouteProfile);
        }}
      >
        <MapboxGL.Camera
          zoomLevel={14}
          centerCoordinate={coordinates}
          animationMode={"easeTo"}
          animationDuration={6000}
        />
        {routeDirections && (
          <MapboxGL.ShapeSource id="line1" shape={routeDirections}>
            <MapboxGL.LineLayer
              id="routerLine01"
              style={{
                lineColor: "red",
                lineWidth: 4,
              }}
            />
          </MapboxGL.ShapeSource>
        )}
        {destinationCoords && (
          <Mapbox.PointAnnotation
            key="annotationUK"
            id="annotationUK"
            coordinate={coordinates}
            onSelected={onMarkerPress}
          >
            <View
              style={{
                height: 20,
                width: 20,
                backgroundColor: "red",
                borderColor: "black",
                borderWidth: 2,
                borderRadius: 50,
              }}
            ></View>
            <Mapbox.MarkerView coordinate={coordinates}></Mapbox.MarkerView>
          </Mapbox.PointAnnotation>
        )}
        <MapboxGL.UserLocation
          animated={true}
          androidRenderMode={"gps"}
          showsUserHeadingIndicator={true}
        />
      </MapboxGL.MapView>
      <FlatList
        data={routeProfiles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        contentContainerStyle={styles.routeProfileList}
        showsHorizontalScrollIndicator={false}
        style={styles.flatList}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="white"
          style={styles.loadingIndicator}
        />
      ) : (
        routeDirections && (
          <View style={styles.cardContainer}>
            <ColorfulCard
              title=""
              value={`${distance} h`}
              footerTitle="Distance"
              footerValue={`${distance} km`}
              style={{ backgroundColor: "green", left: 10, top: 10 }}
              onPress={() => {}}
            />
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
    backgroundColor: "rgba(0, 0 ,0 , 0.5)",
    borderRadius: 20,
    padding: 8,
  },
  loadingIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 2,
  },
  cardContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  },
  destinationIcon: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  routeProfileList: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "transparent",
    zIndex: 1,
  },
  flatList: {
    position: "absolute",
    bottom: 20,
    left: 0,
    backgroundColor: "transparent",
    zIndex: 1,
  },
  routeProfileButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginHorizontal: 8,
    borderColor: "#fff",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  selectedRouteProfileButton: {
    backgroundColor: "#FA9E14",
    borderColor: "#FA9E14",
  },
  routeProfileButtonText: {
    color: "#fff",
    marginTop: 5,
  },
  selectedRouteProfileButtonText: {
    color: "white",
  },
});

export default MapScreen;
