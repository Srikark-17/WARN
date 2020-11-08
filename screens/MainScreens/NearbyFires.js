import React, { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  View,
  StyleSheet,
  StatusBar,
  Linking,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
} from "native-base";

import * as Location from "expo-location";
import * as Permissions from 'expo-permissions'
import { AntDesign, Fontisto, Feather } from "@expo/vector-icons";
import * as firebase from "firebase";
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
const ExampleArray = [{
  "metadata": null,
  "data": {
      "datetime": "2020-11-08T09:00:00Z",
      "data_available": true,
      "fires": [
          {
              "update_time": "2020-11-08T00:39:13Z",
              "source": "Local Authority",
              "confidence": null,
              "position": {
                  "lat": 37.958683,
                  "lon": -122.19745,
                  "distance": {
                      "value": 16.35,
                      "units": "mi"
                  },
                  "direction": 44
              },
              "details": {
                  "fire_name": "CREEK",
                  "status": "Active",
                  "time_discovered": "2020-11-07T20:33:17Z",
                  "fire_behavior": null,
                  "fire_type": "Wildfire",
                  "fire_cause": "Unknown",
                  "percent_contained": null,
                  "size": {
                      "value": null,
                      "units": "ac"
                  }
              }
          }
      ]
  },
  "error": null
}]
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
              uri:
                "https://www.americangeosciences.org/sites/default/files/styles/ci__650_x_430_/public/CI_267_WildfireThomasFire_USFS_190124_1200x800px.jpg",
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

let apiKey = 'f0aaf130ca6e4d849bda5e9780058332'
  
function HomeScreen (){
  const [location, setLocation] = useState();
  const [fires, setFires] = useState()
  const[locationState, setGeocodedLocation] = useState()
  useEffect(() => {
    (async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if(status === 'granted'){
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        console.log('about to fetch')
      fetch (`https://api.breezometer.com/fires/v1/current-conditions?lat=37.788472&lon=-122.405711&key=f0aaf130ca6e4d849bda5e9780058332&units=imperial`).then((response) => response.json()).then((res) => {
      setFires(res.data.fires)
      reverseGeocode()
      console.log(res.data.fires)
    })
      }
      else{
        <ActivityIndicator/>
      }
    })();
  }, []);
  let reverseGeocode = () => {
    
    let arrayLocations = []
    for (let i = 0; i < fires.length; i++){
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${fires[i].position.lat}&longitude=${fires[i].lon}&localityLanguage=en`).then((response) => response.json()).then((res) => {
      
      let resultsTitle = `${res.city}, ${res.principalSubdivisionCode}`
      console.log(resultsTitle)
      console.log(res)
      arrayLocations.push(resultsTitle)
    } )
    setGeocodedLocation(arrayLocations)
  }
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>Fires Nearby</Text>
          <Text style={styles.desc}>View nearby fires</Text>
        </View>
        <FlatList
      data={fires}
      renderItem = {({item}) => (
        
          <CardHome
          title=""
          info={{
            name: `Location: 115 Bear Creek Road, Martinez, CA 94553 Martinez California United States`,
            time: "Distance away: 16.35 miles",
            address: "Fire-Type: Wildfire",
            tag: 'Update-time: 2020-11-08T00:39:13Z',
            detail: `Source: Local Authority${"\n"}Status: Active${"\n"}Fire-Cause: Unknown${"\n"}Percentage Contained: N/a`,
          }}
        />
        
      )
    }
      
      />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  rating: {
    flexDirection: "row",
    marginTop: 5,
  },
  tag: {
    color: "#B066A4",
  },
  cardContainer: {
    padding: 15,
    paddingBottom: 0,
  },
  margin: {
    height: 1,
    backgroundColor: "#F0F1F2",
    width: "100%",
    marginVertical: 10,
  },
  cardBodyBottom: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardBottomTitle: {
    fontSize: 14,
    marginTop: 5,
    color: "#FF5934",
  },
  cardGroupIcon: {
    justifyContent: "center",
    alignItems: "center",
    color: "#6A63F6",
  },
  iconMore: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  iconLike: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  cardBody: {
    padding: 15,
    backgroundColor: "#000",
    marginTop: 15,
    borderRadius: 10,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardBodyTop: {
    flexDirection: "row",
  },
  cardLeftSide: {
    paddingHorizontal: 10,
    flex: 1,
  },
  cardName: {
    color: "#A8A8A8",
    fontSize: 18,
    fontWeight: "bold",
  },
  cardTime: {
    color: "#798497",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 5,
  },
  cardAddress: {
    color: "#798497",
    fontSize: 15,
    fontWeight: "500",
    marginTop: 5,
  },
  cardAvatar: {
    height: 60,
    width: 60,
    backgroundColor: "gray",
    borderRadius: 60,
  },
  cardHeaderContaner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardHeading: {
    fontSize: 24,
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
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 20,
    marginHorizontal: 20,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 20,
  },
  faceText: {
    fontSize: 16,
    marginTop: 6,
  },

  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  headerContainer: {
    padding: 0,
    paddingHorizontal: 30,
    marginTop: 52,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  desc: {
    fontSize: 20,
    fontWeight: "400",
    color: "#798497",
    marginTop: 5,
  },
  buttonBooks: {
    flexDirection: "row",
    marginTop: 20,
  },
  btnGradient: {
    padding: 10,
    borderRadius: 40,
  },
  btnBookText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
});
