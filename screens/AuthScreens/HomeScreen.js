import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Button,
  ScrollView,
} from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import * as Location from "expo-location";
import * as Permissions from 'expo-permissions'
var percent = 38;
var percent1 = 58;
var percent2 = 83;

let propStyle = (percent, base_degrees) => {
  const rotateBy = base_degrees + percent * 3.6;
  return {
    transform: [{ rotateZ: `${rotateBy}deg` }],
  };
};

let renderThirdLayer = (percent) => {
  if (percent > 50) {
    return (
      <View
        style={[styles.secondProgressLayer, propStyle(percent - 50, 45)]}
      ></View>
    );
  } else {
    return <View style={styles.offsetLayer}></View>;
  }
};

function WelcomeScreen({ navigation }) {
  LayoutAnimation.easeInEaseOut();

  console.disableYellowBox = true;
  let apiKey = 'f0aaf130ca6e4d849bda5e9780058332'
  
  const [location, setLocation] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [temperature, setTemperature] = useState();
  const [aqicolor, setAQIColor] = useState();
  const [aqiLevel, setAQILevel] = useState();
  const [aqiCategory, setAQICategory] = useState();
  const [resultsTitle, setResultsTitle] = useState()
  useEffect(() => {
    (async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if(status === 'granted'){
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        console.log('about to fetch')
    fetch (`https://api.breezometer.com/air-quality/v2/current-conditions?lat=${location.coords.latitude}&lon=${location.coords.longitude}&key=${apiKey}&features=breezometer_aqi,local_aqi,health_recommendations,sources_and_effects,pollutants_concentrations,pollutants_aqi_information`).then((response) => response.json()).then((res) => {
      let aqiLevel = res.data.indexes.baqi.aqi
      setAQILevel(aqiLevel)
      setAQICategory(res.data.indexes.baqi.category)
      setAQIColor(res.data.indexes.baqi.color)
      percent2 = aqiLevel
    })
    fetch (`https://api.breezometer.com/weather/v1/current-conditions?lat=${location.coords.latitude}&lon=${location.coords.longitude}&key=${apiKey}`).then((response) => response.json()).then((res) => {
      var temperature = C2F(res.data.feels_like_temperature.value)
      setTemperature(temperature)
      percent = temperature
    })
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&localityLanguage=en`).then((response) => response.json()).then((res) => {
      
      let resultsTitle = `${res.city}, ${res.principalSubdivisionCode}`
      console.log(resultsTitle)
      console.log(res)
      setResultsTitle(resultsTitle)
    } )
      }
      else{
        <ActivityIndicator/>
      }
    })();
  }, []);
  let C2F = (Celcius) => {
    let F = (Celcius * 9/5) + 32
    let multiple = F * 10
    let roundedMultiple = Math.round(multiple)
    let finalNumber = roundedMultiple/10
    console.log(finalNumber)
    return finalNumber
  }
  let firstProgressLayerStyle;
  if (percent > 50) {
    firstProgressLayerStyle = propStyle(50, -135);
  } else {
    firstProgressLayerStyle = propStyle(percent, -135);
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Dashboard</Text>
      </View>
      <View style={styles.noteContainer}>
        <View style={styles.circleContainer1}>
          <View
            
          ></View>
        </View>
        <Text
          style={{ color: "#798497", left: 100, bottom: 23, fontWeight: "800" }}
        >
         
        </Text>
  <Text style={{ left: 220, color: "#798497" }}></Text>
        <TouchableOpacity onPress={() => navigation.navigate("Archive")}>
          <Button
            color={"#798497"}
            title={""}
            onPress={() => navigation.navigate("Archive")}
          />
          <MaterialIcons
            name="location-on"
            size={20}
            style={{ color: "#FF5934", bottom: 50, right: 35 }}
          />
          <View style={{flexDirection: 'row'}}>
          <Text
            style={{ color: "#798497", bottom: 115, fontSize: 20, right: 30 }}
          >
            Location  
          </Text>
          <Text style={{color: '#ffff', bottom: 110, right: 20, fontSize: 10, color: '#798497'}}>{Date()}</Text>
          </View>
          <Text
            style={{
              color: "#798497",
              bottom: 100,
              fontSize: 20,
              right: 30,
              paddingLeft: 20,
            }}
          >
            {resultsTitle}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.circleContainer2}>
        <View
          style={[styles.firstProgressLayer, firstProgressLayerStyle]}
        ></View>
        {renderThirdLayer(percent1)}
      </View>
      <Text
        style={{
          color: "white",
          left: 94,
          top: 242,
          fontWeight: "800",
          zIndex: 100,
        }}
      >
        {percent1}
      </Text>
      <Text
        style={{
          color: "#798497",
          fontSize: 20,
          fontWeight: "700",
          top: 120,
          zIndex: 100,
          left: 60,
        }}
      >
        Air Quality
      </Text>
      <Text
        style={{
          color: "#798497",
          fontSize: 20,
          fontWeight: "700",
          top: 140,
          zIndex: 100,
          left: 60,
        }}
      >
        {aqiLevel}-Good
      </Text>
      
        <TouchableOpacity onPress={() => navigation.navigate("Pollution")} style={styles.bicardOne}>
          <Button
            color={"#798497"}
            title={""}
            onPress={() => navigation.navigate("Air Quality")}
          />
        </TouchableOpacity>
      
      <View style={styles.circleContainer3}>
        <View
          style={[styles.firstProgressLayer, firstProgressLayerStyle]}
        ></View>
        {renderThirdLayer(percent)}
      </View>
      <Text
        style={{
          color: "white",
          left: 283,
          bottom: 43,
          fontWeight: "800",
          zIndex: 100,
        }}
      >
        {percent}°F
      </Text>
      <Text
        style={{
          color: "#798497",
          fontSize: 20,
          fontWeight: "700",
          bottom: 170,
          left: 240,
          zIndex: 100,
        }}
      >
        Temperature
      </Text>
      <Text
        style={{
          color: "#798497",
          fontSize: 20,
          fontWeight: "700",
          bottom: 147,
          zIndex: 100,
          left: 270,
        }}
      >
        {temperature}°F
      </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Pollen")}style={styles.bicardTwo}>
          <Button
            color={"#798497"}
            title={""}
            onPress={() => navigation.navigate("Archive")}
          />
        </TouchableOpacity>
        <View style={{ top: 45, zIndex: 100, left: 40 }}>
        <Text
          style={{
            color: "#798497",
            fontSize: 25,
            bottom: 205,
            fontWeight: "500",
          }}
        >
          Heatmaps
        </Text>
      </View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.fireContainer}>
          <MaterialCommunityIcons style={styles.fire} name="fire" size={45} onPress={() => navigation.navigate('Wildfires')}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.windContainer}>
          <FontAwesome5 style={styles.wind} name="wind" size={40} onPress={() => navigation.navigate('AQI Heatmap')}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flowerContainer} onPress={() => navigation.navigate('Pollen Heatmap')}>
          <MaterialCommunityIcons
            style={styles.flower}
            name="flower"
            size={40}
            onPress={() => navigation.navigate('Pollen Heatmap')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.factoryContainer} onPress={() => navigation.navigate('Pollution Heatmap')}>
          <MaterialCommunityIcons
            style={styles.factory}
            name="factory"
            size={40}
            onPress={() => navigation.navigate('Pollution Heatmap')}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  circleContainer1: {
    left: 220,
    width: 50,
    height: 50,
  },
  progressLayer1: {
    width: 50,
    height: 50,
    borderWidth: 5,
    borderRadius: 100,
    position: "absolute",
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "#FF5349",
    borderTopColor: "#FF5349",
    transform: [{ rotateZ: "-45deg" }],
  },
  offsetLayer1: {
    width: 50,
    height: 50,
    borderWidth: 5,
    borderRadius: 100,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "grey",
    borderTopColor: "grey",
    transform: [{ rotateZ: "-135deg" }],
  },
  circleContainer2: {
    left: 80,
    top: 275,
    width: 50,
    height: 50,
    borderWidth: 5,
    borderRadius: 100,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  progressLayer2: {
    width: 50,
    height: 50,
    borderWidth: 5,
    borderRadius: 100,
    position: "absolute",
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: `#FF5349`,
    borderTopColor: "#FF5349",
    transform: [{ rotateZ: "45deg" }],
  },
  offsetLayer2: {
    width: 50,
    height: 50,
    borderWidth: 5,
    borderRadius: 100,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "grey",
    borderTopColor: "grey",
    transform: [{ rotateZ: "220deg" }],
  },
  circleContainer3: {
    left: 275,
    bottom: 10,
    width: 50,
    height: 50,
    borderWidth: 5,
    borderRadius: 100,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  progressLayer3: {
    width: 50,
    height: 50,
    borderWidth: 5,
    borderRadius: 100,
    position: "absolute",
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "#FF5349",
    borderTopColor: "#FF5349",
    transform: [{ rotateZ: "55deg" }],
  },
  offsetLayer3: {
    width: 50,
    height: 50,
    borderWidth: 5,
    borderRadius: 100,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "grey",
    borderTopColor: "grey",
    transform: [{ rotateZ: "240deg" }],
  },
  firstProgressLayer: {
    width: 50,
    height: 50,
    borderWidth: 5,
    borderRadius: 100,
    position: "absolute",
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "#FF5349",
    borderTopColor: "#FF5349",
    transform: [{ rotateZ: "-135deg" }],
  },
  secondProgressLayer: {
    width: 50,
    height: 50,
    position: "absolute",
    borderWidth: 5,
    borderRadius: 100,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "#FF5349",
    borderTopColor: "#FF5349",
    transform: [{ rotateZ: "45deg" }],
  },
  offsetLayer: {
    width: 50,
    height: 50,
    position: "absolute",
    borderWidth: 5,
    borderRadius: 100,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "black",
    borderTopColor: "black",
    transform: [{ rotateZ: "-135deg" }],
  },
  fireContainer: {
    padding: 10,
    height: 60,
    width: 60,
    marginRight: 20,
    borderRadius: 100,
    backgroundColor: "#FF5349",
  },
  fire: {
    left: -2,
    bottom: 3,
    color: "orange",
  },
  windContainer: {
    padding: 10,
    height: 60,
    width: 60,
    marginRight: 20,
    borderRadius: 100,
    backgroundColor: "#89CFF0",
  },
  wind: {
    left: -2,
    bottom: 3,
    color: "white",
  },
  flowerContainer: {
    padding: 10,
    height: 60,
    width: 60,
    borderRadius: 100,
    backgroundColor: "#7EC850",
  },
  flower: {
    color: "#FCC200",
  },
  factoryContainer: {
    padding: 10,
    height: 60,
    width: 60,
    borderRadius: 100,
    marginLeft: 20,
    backgroundColor: "#6F7691",
  },
  factory: {
    left: -2,
    bottom: 3,
    color: "black",
  },
  noteContainer: {
    top: 100,
    marginLeft: 30,
    paddingTop: 10,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: "#2B2D2F",
    borderRadius: 12,
    width: 350,
    height: 120,
    zIndex: 0,
  },
  bicardOne: {
    top: 50,
    marginLeft: 30,
    paddingTop: 10,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: "#2B2D2F",
    borderRadius: 12,
    width: 160,
    height: 170,
    zIndex: 0,
  },
  bicardTwo: {
    bottom: 235,
    marginLeft: 220,
    paddingTop: 10,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: "#2B2D2F",
    borderRadius: 12,
    width: 160,
    height: 170,
    zIndex: 0,
  },
  optionsContainer: {
    bottom: 200,
    marginLeft: 30,
    paddingTop: 10,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: "#2B2D2F",
    borderRadius: 12,
    width: 350,
    height: 150,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    zIndex: 0,
  },
  circle: {
    borderRadius: 20,
    backgroundColor: "orange",
  },
  title: {
    fontFamily: "Avenir",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    top: 75,
  },
  textContainer: {
    padding: 10,
    top: 15,
    zIndex: 100,
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});

export default WelcomeScreen;
