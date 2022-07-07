import React, { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Text, Icon } from "native-base";

import * as Location from "expo-location";
import { AntDesign } from "@expo/vector-icons";
import { HP, WP } from "../../config/responsive";
import { TouchableOpacity } from "react-native-gesture-handler";
const Face = ({ icon, title, color, full }) => {
  return (
    <View style={styles.faceGroup}>
      {full ? (
        <View style={{ backgroundColor: color, borderRadius: 40 }}>
          <Icon name={icon} size={36} color={"#000"} />
        </View>
      ) : (
        <Icon name={icon} size={36} color={color} />
      )}

      <Text style={[styles.faceText, { color }]}>{title}</Text>
    </View>
  );
};

const Rating = ({ rating }) => {
  return (
    <View style={styles.rating}>
      {Array(5)
        .fill(0)
        .map((_, i) => {
          if (rating > i) {
            return (
              <AntDesign
                name="star"
                color="#FA8D00"
                style={{ marginRight: 5 }}
              />
            );
          }
          return <AntDesign name="staro" style={{ marginRight: 5 }} />;
        })}
    </View>
  );
};

export const CardHome = ({ title, info, noHeader, noFooter, book }) => {
  return (
    <View style={styles.cardContainer}>
      {!noHeader && <View style={styles.cardHeaderContaner}></View>}
      <View style={styles.cardBody}>
        <View style={styles.cardBodyTop}>
          <Image
            style={styles.cardAvatar}
            source={{
              uri: "https://www.americangeosciences.org/sites/default/files/styles/ci__650_x_430_/public/CI_267_WildfireThomasFire_USFS_190124_1200x800px.jpg",
            }}
          />
          <View style={styles.cardLeftSide}>
            <Text style={styles.tag}>{info.tag}</Text>
            <Text style={styles.cardName}>{info.name}</Text>
            <Text style={styles.cardTime}>{info.time}</Text>
            <Text style={styles.cardAddress}>{info.address}</Text>
            <Text style={styles.cardAddress}>{info.detail}</Text>
            {info.rating && <Rating rating={info.rating} />}
          </View>
        </View>
      </View>
    </View>
  );
};

let apiKey = "f0aaf130ca6e4d849bda5e9780058332";

function NearbyFiresScreen({ navigation }) {
  const [location, setLocation] = useState();
  const [fires, setFires] = useState();
  const [locationState, setGeocodedLocation] = useState();
  const [distance, setDistance] = useState();

  let calculateDistance = (longitude, latitude) => {
    let latitudeDifference = Math.abs(
      (location.coords.latitude - latitude) * 69
    );
    let longitudeDifference = Math.abs(
      (location.coords.longitude - longitude) * 54.6
    );
    let totalDistance =
      Math.pow(latitudeDifference, 2) + Math.pow(longitudeDifference, 2);
    let finalDistance = Math.pow(totalDistance, 1 / 2);
    if (finalDistance > 600) {
      return false;
    } else {
      setDistance(finalDistance);
      return true;
    }
  };
  let reverseGeocode = (fire) => {
    let amendedFires = [];
    let arrayLocations = [];
    let latestLocation = [];
    console.log("originalfires" + fire.length);
    for (let i = 0; i < fire.length; i++) {
      if (
        calculateDistance(
          fire[i].geometry[0].coordinates[0],
          fire[i].geometry[0].coordinates[1]
        )
      ) {
        fire[i].geometry[0].coordinates.push(distance);
        amendedFires.push(fire[i]);
        setDistance(0);
        fetch(`
      https://api.bigdatacloud.net/data/reverse-geocode?latitude=${fire[i].geometry[0].coordinates[0]}&longitude=${fire[i].geometry[0].coordinates[1]}&localityLanguage=en&key=bdc_89fda6dbbb724d5a87e4ca549ea669bf`)
          .then((response) => response.json())
          .then((res) => {
            console.log(res);
            let resultsTitle = `${res.events}, ${res.principalSubdivisionCode}`;
            //console.log(resultsTitle)
            //console.log(res)
            arrayLocations.push(resultsTitle);
          });
      }
      setGeocodedLocation(arrayLocations);
    }
    console.log("amednfiresd:" + amendedFires.length);
    return amendedFires;
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        console.log("about to fetch");

        fetch(`https://eonet.gsfc.nasa.gov/api/v3/events?category=wildfires`)
          .then((response) => response.json())
          .then((res) => {
            setFires(reverseGeocode(res.events));
            //console.log(res.events)
          });
      } else {
        <ActivityIndicator />;
      }
    })();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>Fires Nearby</Text>
          <Text style={styles.desc}>View nearby fires</Text>
        </View>
        <FlatList
          data={fires}
          renderItem={({ item }) => (
            <CardHome
              title=""
              info={{
                name: `${item.title} Location: 115 Bear Creek Road, Martinez, CA 94553 Martinez California United States`,
                time: `Distance away: ${item.geometry[0].coordinates[2]} miles`,
                address: "Fire-Type: Wildfire",
                tag: `Update-time: ${item.geometry[0].date}`,
                detail: `Source: Local Authority${"\n"}Status: Active${"\n"}Fire-Cause: Unknown${"\n"}Percentage Contained: N/a`,
              }}
            />
          )}
        />
        <View style={{paddingBottom: 10}}>

        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate("Map Screen")}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>View Map</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default NearbyFiresScreen;

const styles = StyleSheet.create({
  rating: {
    flexDirection: "row",
    marginTop: HP(0.59),
  },
  tag: {
    color: "#B066A4",
  },
  cardContainer: {
    paddingVertical: HP(1.78),
    paddingHorizontal: WP(3.85),
  },
  margin: {
    height: 1,
    backgroundColor: "#F0F1F2",
    width: "100%",
    marginVertical: HP(1.18),
  },
  cardBodyBottom: {
    marginTop: HP(1.18),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardBottomTitle: {
    fontSize: 14,
    marginTop: HP(0.59),
    color: "#FF5934",
  },
  cardGroupIcon: {
    justifyContent: "center",
    alignItems: "center",
    color: "#6A63F6",
  },
  iconMore: {
    position: "absolute",
    bottom: HP(0),
    right: WP(0),
  },
  iconLike: {
    position: "absolute",
    top: HP(0),
    right: WP(0),
  },
  cardBody: {
    paddingVertical: HP(1.78),
    paddingHorizontal: WP(3.85),
    backgroundColor: "#000",
    marginTop: HP(1.78),
    borderRadius: 10,
    shadowColor: "#fff",
    shadowOffset: { width: WP(0), height: HP(0.24) },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardBodyTop: {
    flexDirection: "row",
  },
  cardLeftSide: {
    paddingHorizontal: WP(2.56),
    flex: 1,
  },
  cardName: {
    color: "#A8A8A8",
    fontSize: HP(2.13),
    fontWeight: "bold",
  },
  cardTime: {
    color: "#798497",
    fontSize: HP(1.9),
    fontWeight: "500",
    marginTop: HP(0.59),
  },
  cardAddress: {
    color: "#798497",
    fontSize: 15,
    fontWeight: "500",
    marginTop: HP(0.59),
  },
  cardAvatar: {
    height: HP(7.11),
    width: WP(15.38),
    backgroundColor: "gray",
    borderRadius: 60,
  },
  cardHeaderContaner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardHeading: {
    fontSize: HP(2.84),
    fontWeight: "bold",
  },
  cardMore: {
    fontWeight: "bold",
    color: "#7B6C95",
  },
  faceGroup: {
    justifyContent: "center",
    alignItems: "center",
  },
  faceContainer: {
    backgroundColor: "#000",
    paddingVertical: HP(2.37),
    paddingHorizontal: WP(5.13),
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 20,
    marginHorizontal: WP(5.13),
    shadowColor: "#fff",
    shadowOffset: { width: WP(0), height: HP(0.24) },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: HP(2.37),
  },
  faceText: {
    fontSize: HP(1.9),
    marginTop: HP(0.71),
  },

  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  headerContainer: {
    paddingHorizontal: WP(7.7),
    marginTop: HP(6.16),
  },
  heading: {
    fontSize: HP(3.79),
    fontWeight: "bold",
    color: "#fff",
  },
  desc: {
    fontSize: HP(2.37),
    fontWeight: "400",
    color: "#798497",
    marginTop: HP(0.59),
  },
  buttonBooks: {
    flexDirection: "row",
    marginTop: HP(2.37),
  },
  button: {
    width: WP(80),
    height: HP(7),
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF5349",
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: HP(2.5),
  },
  btnGradient: {
    paddingVertical: HP(1.18),
    paddingHorizontal: WP(2.56),
    borderRadius: 40,
  },
  btnBookText: {
    fontSize: HP(1.66),
    fontWeight: "bold",
    color: "#fff",
  },
});
