import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import AnimatedLoader from "react-native-animated-loader";
import { HP, WP } from "../../config/responsive";

export default function MapScreen() {
  const [longitude, setLongitude] = useState();
  const [visible, setVisible] = useState(true);
  const [latitude, setLatitude] = useState();
  const [fires, setFires] = useState([]);
  let exampleArray = {
    markers: [
      {
        title: "hello",
        coordinates: {
          latitude: 3.148561,
          longitude: 101.652778,
        },
      },
      {
        title: "hello",
        coordinates: {
          latitude: 3.149771,
          longitude: 101.655449,
        },
      },
    ],
  };

  let mapMarkers = () => {
    return fires.map((report) => (
      <Marker
        key={report.id}
        coordinate={{
          latitude: report.geometry[0].coordinates[0],
          longitude: report.geometry[0].coordinates[1],
        }}
        title={report.title}
        description={report.sources.url}
      />
    ));
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        setLongitude(location.coords.longitude);
        setLatitude(location.coords.latitude);
      } else {
        <AnimatedLoader
          visible={visible}
          overlayColor="#FF5349"
          source={require("../../assets/96830-loader-animation.json")}
          animationStyle={styles.lottie}
          speed={1}
        >
          <Text>{}</Text>
        </AnimatedLoader>;
      }
      fetch(`https://eonet.gsfc.nasa.gov/api/v3/events?category=wildfires`)
        .then((response) => response.json())
        .then((res) => {
          setFires(res.events);
          console.log(res.events);
          console.log("exiting Use Effect");
        });
    })();
  }, []);

  return latitude && latitude && fires ? (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {fires.map((report) => (
          <Marker
            key={report.id}
            image={require("./../../assets/fire2.png")}
            coordinate={{
              latitude: report.geometry[0].coordinates[0],
              longitude: report.geometry[0].coordinates[1],
            }}
            title={report.title}
            description={report.sources.url}
            
          />
        ))}
        <Marker
          location={{ longitude: longitude, latitude: latitude }}
          image={require("./navigation.png")}
        />
      </MapView>
    </View>
  ) : (
    <AnimatedLoader
      visible={visible}
      overlayColor="#000"
      source={require("../../assets/96830-loader-animation.json")}
      animationStyle={styles.lottie}
      speed={1}
    >
      <Text>{}</Text>
    </AnimatedLoader>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignContent: "flex-start"
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height*0.6,
  },
  lottie: {
    width: WP(20),
    height: HP(5),
  },
});
