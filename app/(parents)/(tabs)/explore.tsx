import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, View, Text, FlatList,Dimensions,
  TouchableOpacity,
  ActivityIndicator, } from "react-native";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Mapbox, { UserLocation } from "@rnmapbox/maps";
import { Accuracy } from "expo-location";
import { useFocusEffect, useNavigation } from "expo-router";
import MapboxGL, {Logger} from '@rnmapbox/maps';
import ColorfulCard from '@freakycoder/react-native-colorful-card';

const routeProfiles = [
  {id: 'walking', label: 'Walking', icon: 'walking'},
  {id: 'cycling', label: 'Cylcing', icon: 'bicycle'},
  {id: 'driving', label: 'Driving', icon: 'car'},
];

Mapbox.setAccessToken(
  "pk.eyJ1IjoicGhvbmd2dWFuaDc3MiIsImEiOiJjbTIyM3ViMGUwMzIzMmtwc2x3OWZodzA0In0.Aa8KkZQXO713qrQB2fzVHw"
);
Logger.setLogCallback(log => {
  const {message} = log;

  if (
    message.match('Request failed due to a permanent error: Canceled') ||
    message.match('Request failed due to a permanent error: Socket Closed')
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

const useLocation = (): {
  location: any;
  errorMsg: string | null;
  setLocation: any;
  coordinates: any;
} => {
  const navigation = useNavigation();
  const focused = navigation.isFocused();
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<[number, number]>([
    105.0011377, 20.8444899,
  ]);
  const [routeDirections, setRouteDirections] = useState<any | null>(null);
  const [coords, setCoords] = useState<[number, number]>([12.48839, 50.72724]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState<[number, number]>([
    12.48839, 50.72724,
  ]);
  const [loading, setLoading] = useState(true);
  const [selectedRouteProfile, setselectedRouteProfile] =
    useState<string>('walking');
  
  async function createRouterLine(
    coords: [number, number],
    routeProfile: string,
  ): Promise<void> {
    const startCoords = `${coords[0]},${coords[1]}`;
    const endCoords = `${[store.longitude, store.latitude]}`;
    const geometries = 'geojson';
    const url = `https://api.mapbox.com/directions/v5/mapbox/${routeProfile}/${startCoords};${endCoords}?alternatives=true&geometries=${geometries}&steps=true&banner_instructions=true&overview=full&voice_instructions=true&access_token=${APIKEY}`;

    try {
      let response = await fetch(url);
      let json = await response.json();

      const data = json.routes.map((data: any) => {
        console.log(data);
        setDistance((data.distance / 1000).toFixed(2));
        setDuration((data.duration / 3600).toFixed(2));
      });

      let coordinates = json['routes'][0]['geometry']['coordinates'];
      let destinationCoordinates =
        json['routes'][0]['geometry']['coordinates'].slice(-1)[0];
      setDestinationCoords(destinationCoordinates);
      if (coordinates.length) {
        const routerFeature = makeRouterFeature([...coordinates]);
        setRouteDirections(routerFeature);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

  useEffect(() => {
    getPermissionLocation();
    //console.log(store.longitude);
    if (selectedRouteProfile !== null) {
      createRouterLine(coords, selectedRouteProfile);
    }
  }, [selectedRouteProfile]);

  function makeRouterFeature(coordinates: [number, number][]): any {
    let routerFeature = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: coordinates,
          },
        },
      ],
    };
    return routerFeature;
  }

  async function createRouterLine(
    coords: [number, number],
    routeProfile: string,
  ): Promise<void> {
    const startCoords = `${coords[0]},${coords[1]}`;
    const endCoords = `${[store.longitude, store.latitude]}`;
    const geometries = 'geojson';
    const url = `https://api.mapbox.com/directions/v5/mapbox/${routeProfile}/${startCoords};${endCoords}?alternatives=true&geometries=${geometries}&steps=true&banner_instructions=true&overview=full&voice_instructions=true&access_token=${APIKEY}`;

    try {
      let response = await fetch(url);
      let json = await response.json();

      const data = json.routes.map((data: any) => {
        console.log(data);
        setDistance((data.distance / 1000).toFixed(2));
        setDuration((data.duration / 3600).toFixed(2));
      });

      let coordinates = json['routes'][0]['geometry']['coordinates'];
      let destinationCoordinates =
        json['routes'][0]['geometry']['coordinates'].slice(-1)[0];
      setDestinationCoords(destinationCoordinates);
      if (coordinates.length) {
        const routerFeature = makeRouterFeature([...coordinates]);
        setRouteDirections(routerFeature);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

  const renderItem = ({
    item,
  }: {
    item: {id: string; label: string; icon: string};
  }) => (
    <TouchableOpacity
      style={[
        styles.routeProfileButton,
        item.id == selectedRouteProfile && styles.selectedRouteProfileButton,
      ]}
      onPress={() => setselectedRouteProfile(item.id)}>
      <Text
        style={[
          styles.routeProfileButtonText,
          item.id == selectedRouteProfile &&
            styles.selectedRouteProfileButtonText,
        ]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
  useFocusEffect(
    useCallback(() => {
      Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      })
        .then((res) => {
          setCoordinates([res.coords.longitude, res.coords.latitude]); // Access coords correctly
          console.log(res);
        })
        .catch((e) => console.log(e));
    }, [])
  );

  return { location, errorMsg, setLocation, coordinates };
};

const MapScreen: React.FC = () => {
  const { location, errorMsg, setLocation, coordinates } = useLocation();
  const mapRef = useRef<null>(null);
  const [calloutVisible, setCalloutVisible] = useState(false);

  const onMarkerPress = () => {
    setCalloutVisible(true);
  };

  const loadAnnotationUK = () => {
    if (!location) {
      return null;
    }

    return (
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
            backgroundColor: "green",
            borderColor: "black",
            borderWidth: 2,
            borderRadius: 50,
          }}
        ></View>
        <Mapbox.MarkerView coordinate={coordinates}></Mapbox.MarkerView>
      </Mapbox.PointAnnotation>
    );
  };

  return (
    <View style={styles.container}>
      <Mapbox.MapView style={styles.map} rotateEnabled={true}>
        <Mapbox.Camera
          zoomLevel={15}
          centerCoordinate={coordinates}
          animationMode={"flyTo"}
          animationDuration={6000}
        />
        <View>{loadAnnotationUK()}</View>
        <UserLocation
          animated={true}
          androidRenderMode={'gps'}
          showsUserHeadingIndicator={true}
        />
        <MapboxGL.MapView
        style={styles.map}
        zoomEnabled={true}
        styleURL="mapbox://styles/mapbox/navigation-night-v1"
        rotateEnabled={true}
        onDidFinishLoadingMap={async () => {
          await createRouterLine(coords, selectedRouteProfile);
        }}>
        <MapboxGL.Camera
          zoomLevel={5}
          centerCoordinate={[12.48839, 50.72724]}
          animationMode={'flyTo'}
          animationDuration={6000}
        />
        {routeDirections && (
          <MapboxGL.ShapeSource id="line1" shape={routeDirections}>
            <MapboxGL.LineLayer
              id="routerLine01"
              style={{
                lineColor: '#FA9E14',
                lineWidth: 4,
              }}
            />
          </MapboxGL.ShapeSource>
        )}
        {destinationCoords && (
          <MapboxGL.PointAnnotation
            id="destinationPoint"
            coordinate={destinationCoords}>
            <View style={styles.destinationIcon}>
              <Ionicons name="storefront" size={24} color="#E1710A" />
            </View>
          </MapboxGL.PointAnnotation>
        )}
        <MapboxGL.UserLocation
          animated={true}
          androidRenderMode={'gps'}
          showsUserHeadingIndicator={true}
        />
      </MapboxGL.MapView>
      <FlatList
        data={routeProfiles}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
              title={`${store.name}`}
              value={`${duration} h`}
              footerTitle="Distance"
              footerValue={`${distance} km`}
              iconImageSource={require('../assets/icons/info.png')}
              style={{backgroundColor: '#33495F'}}
              onPress={() => {}}
            />
          </View>
        )
      )}
      </Mapbox.MapView>
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
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0 ,0 , 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 2,
  },
  cardContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  destinationIcon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeProfileList: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  flatList: {
    position: 'absolute',
    bottom: 20,
    left: Dimensions.get('window').width / 2 - 40,
    right: 0,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  routeProfileButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginHorizontal: 8,
    borderColor: '#fff',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  selectedRouteProfileButton: {
    backgroundColor: '#FA9E14',
    borderColor: '#FA9E14',
  },
  routeProfileButtonText: {
    color: '#fff',
    marginTop: 5,
  },
  selectedRouteProfileButtonText: {
    color: 'white',
  },
});

export default MapScreen;



