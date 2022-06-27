import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  StatusBar,
} from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import * as Location from "expo-location";
import { HP, WP } from "../../config/responsive";
var percent = 38;
var percent1 = 58;

let propStyle = (percent, base_degrees) => {
  const rotateBy = base_degrees + percent * 3.6;
  return {
    transform: [{ rotateZ: `${rotateBy}deg` }],
  };
};

let renderThirdLayer = (percent) => {
  if (percent > 50) {
    return (
      <View style={[styles.secondProgressLayer, propStyle(percent - 50, 45)]} />
    );
  } else {
    return <View style={styles.offsetLayer}></View>;
  }
};

function WelcomeScreen({ navigation }) {
  let apiKey = "f0aaf130ca6e4d849bda5e9780058332";

  const [location, setLocation] = useState();
  const [temperature, setTemperature] = useState();
  const [aqicolor, setAQIColor] = useState();
  const [aqiLevel, setAQILevel] = useState();
  const [aqiCategory, setAQICategory] = useState();
  const [resultsTitle, setResultsTitle] = useState();
  const [levelInterpretation, setLevelInterpretation] = useState();

  let K2F = (kelvin) => {
    return Math.round(((kelvin-273.15)*1.8) + 32)
  }

  let levelInterpreter = (value) => {
      if(value == 1){
        return "Good"
      }
      if(value == 2){
        return "Fair"
      }
      if(value == 3){
        return "Moderate"
      }
      if(value == 4){
        return "Poor"
      }
      if(value == 5){
        return "Very Poor"
      }
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        fetch(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=9ae4cff24c24dd5a01df964375ee6148`
        )
          .then((response) => response.json())
          .then((res) => {
            let aqiLevel = res.list[0].main.aqi;
            setAQILevel(aqiLevel);
            setLevelInterpretation(levelInterpreter(aqiLevel))
            setAQICategory(res.data.indexes.baqi.category);
            setAQIColor(res.data.indexes.baqi.color);
            percent2 = aqiLevel;
          });
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=9ae4cff24c24dd5a01df964375ee6148`
        )
          .then((response) => response.json())
          .then((res) => {
            var temperature = K2F(res.main.temp);
            setTemperature(temperature);
            percent = temperature;
          });
        fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&localityLanguage=en&key=bdc_89fda6dbbb724d5a87e4ca549ea669bf`
        )
          .then((response) => response.json())
          .then((res) => {
            let resultsTitle = `${res.localityInfo.administrative[3].name}, ${res.principalSubdivisionCode}`;
            console.log(resultsTitle);
            console.log(res);
            setResultsTitle(resultsTitle);
          });
      } else {
        <ActivityIndicator />;
      }
    })();
  }, []);
  let C2F = (Celcius) => {
    let F = (Celcius * 9) / 5 + 32;
    let multiple = F * 10;
    let roundedMultiple = Math.round(multiple);
    let finalNumber = roundedMultiple / 10;
    return finalNumber;
  };
  let firstProgressLayerStyle;
  if (percent > 50) {
    firstProgressLayerStyle = propStyle(50, -135);
  } else {
    firstProgressLayerStyle = propStyle(percent, -135);
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Dashboard</Text>
      </View>
      <View style={styles.circleContainer}>
        <View style={styles.circleContainer1}>
          <View></View>
        </View>
        <Text
          style={{
            color: "#798497",
            left: WP(25.64),
            bottom: HP(2.73),
            fontWeight: "800",
          }}
        ></Text>
        <Text style={{ left: WP(26.07), color: "#798497" }}></Text>
        <TouchableOpacity onPress={() => navigation.navigate("Archive")}>
          <Button
            color={"#798497"}
            title={""}
            onPress={() => navigation.navigate("Archive")}
          />
          <MaterialIcons
            name="location-on"
            size={20}
            style={{ color: "#FF5934", bottom: HP(5.92), right: WP(8.97) }}
          />
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "#798497",
                bottom: HP(13.63),
                fontSize: HP(2.37),
                right: WP(7.69),
              }}
            >
              Location
            </Text>
            <Text
              style={{
                color: "#ffff",
                bottom: HP(12.5),
                right: WP(5.13),
                fontSize: HP(1.18),
                color: "#798497",
              }}
            >
              {Date()}
            </Text>
          </View>
          <Text
            style={{
              color: "#798497",
              bottom: HP(11.5),
              fontSize: HP(2.37),
              right: WP(7.69),
              paddingLeft: WP(5.13),
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
          left: WP(24.1),
          top: HP(28.67),
          fontWeight: "800",
          zIndex: 100,
        }}
      >
        {percent1}
      </Text>
      <Text
        style={{
          color: "#798497",
          fontSize: HP(2.37),
          fontWeight: "700",
          top: HP(14.22),
          zIndex: 100,
          left: WP(15.38),
        }}
      >
        Air Quality {"\n"} (from 1-5)
      </Text>
      <Text
        style={{
          color: "#798497",
          fontSize: HP(2.37),
          fontWeight: "700",
          top: HP(16.59),
          zIndex: 100,
          left: WP(15.38),
        }}
      >
        {aqiLevel} - {levelInterpretation}
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("Pollution")}
        style={styles.bicardOne}
      >
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
          left: WP(72.56),
          bottom: HP(5.09),
          fontWeight: "800",
          zIndex: 100,
        }}
      >
        {percent}°F
      </Text>
      <Text
        style={{
          color: "#798497",
          fontSize: HP(2.37),
          fontWeight: "700",
          bottom: HP(20.14),
          left: WP(61.54),
          zIndex: 100,
        }}
      >
        Temperature
      </Text>
      <Text
        style={{
          color: "#798497",
          fontSize: HP(2.37),
          fontWeight: "700",
          bottom: HP(20.14),
          left: WP(61.54),
          zIndex: 100,
        }}
      >
        {temperature}°F
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Pollen")}
        style={styles.bicardTwo}
      >
        <Button
          color={"#798497"}
          title={""}
          onPress={() => navigation.navigate("Archive")}
        />
      </TouchableOpacity>
      {/* <View style={{ top: HP(5.33), zIndex: 100, left: WP(10.26) }}>
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
      </View> */}
      {/* <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.fireContainer}>
          <MaterialCommunityIcons
            style={styles.fire}
            name="fire"
            size={45}
            onPress={() => navigation.navigate("Wildfires")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.windContainer}>
          <FontAwesome5
            style={styles.wind}
            name="wind"
            size={40}
            onPress={() => navigation.navigate("AQI Heatmap")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.flowerContainer}
          onPress={() => navigation.navigate("Pollen Heatmap")}
        >
          <MaterialCommunityIcons
            style={styles.flower}
            name="flower"
            size={40}
            onPress={() => navigation.navigate("Pollen Heatmap")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.factoryContainer}
          onPress={() => navigation.navigate("Pollution Heatmap")}
        >
          <MaterialCommunityIcons
            style={styles.factory}
            name="factory"
            size={40}
            onPress={() => navigation.navigate("Pollution Heatmap")}
          />
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  circleContainer1: {
    left: WP(56.41),
    width: WP(12.82),
    height: HP(5.92),
  },
  progressLayer1: {
    width: WP(12.82),
    height: HP(5.92),
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
    width: WP(12.82),
    height: HP(5.92),
    borderWidth: 5,
    borderRadius: 100,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "grey",
    borderTopColor: "grey",
    transform: [{ rotateZ: "-135deg" }],
  },
  circleContainer2: {
    left: WP(20.51),
    top: HP(32.58),
    width: WP(12.82),
    height: HP(5.92),
    borderWidth: 5,
    borderRadius: 100,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  progressLayer2: {
    width: WP(12.82),
    height: HP(5.92),
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
    width: WP(12.82),
    height: HP(5.92),
    borderWidth: 5,
    borderRadius: 100,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "grey",
    borderTopColor: "grey",
    transform: [{ rotateZ: "220deg" }],
  },
  circleContainer3: {
    left: WP(70.52),
    bottom: HP(1.18),
    width: WP(12.82),
    height: HP(5.92),
    borderWidth: 5,
    borderRadius: 100,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  progressLayer3: {
    width: WP(12.82),
    height: HP(5.92),
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
    width: WP(12.82),
    height: HP(5.92),
    borderWidth: 5,
    borderRadius: 100,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "grey",
    borderTopColor: "grey",
    transform: [{ rotateZ: "240deg" }],
  },
  firstProgressLayer: {
    width: WP(12.82),
    height: HP(5.92),
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
    width: WP(12.82),
    height: HP(5.92),
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
    width: WP(12.82),
    height: HP(5.92),
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
    paddingVertical: HP(1.18),
    paddingHorizontal: WP(2.56),
    height: HP(7.11),
    width: WP(15.38),
    marginRight: WP(5.13),
    borderRadius: 100,
    backgroundColor: "#FF5349",
  },
  fire: {
    left: WP(-0.51),
    bottom: HP(0.36),
    color: "orange",
  },
  windContainer: {
    paddingVertical: HP(1.18),
    paddingHorizontal: WP(2.56),
    height: HP(7.11),
    width: WP(15.38),
    marginRight: WP(5.13),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#89CFF0",
  },
  wind: {
    color: "white",
  },
  flowerContainer: {
    paddingVertical: HP(1.18),
    paddingHorizontal: WP(2.56),
    height: HP(7.11),
    marginRight: WP(5.13),
    width: WP(15.38),
    borderRadius: 100,
    backgroundColor: "#7EC850",
  },
  flower: {
    color: "#FCC200",
  },
  factoryContainer: {
    paddingVertical: HP(1.18),
    paddingHorizontal: WP(2.56),
    height: HP(7.11),
    width: WP(15.38),
    borderRadius: 100,
    backgroundColor: "#6F7691",
  },
  factory: {
    left: WP(-0.51),
    bottom: HP(0.36),
    color: "black",
  },
  circleContainer: {
    top: HP(11.85),
    marginLeft: WP(7.69),
    paddingTop: HP(1.18),
    paddingLeft: WP(12.82),
    paddingRight: WP(12.82),
    backgroundColor: "#2B2D2F",
    borderRadius: 12,
    width: WP(89.74),
    height: HP(14.22),
    zIndex: 0,
  },
  bicardOne: {
    top: HP(5.92),
    marginLeft: WP(7.69),
    paddingTop: HP(1.18),
    paddingLeft: WP(12.82),
    paddingRight: WP(12.82),
    backgroundColor: "#2B2D2F",
    borderRadius: 12,
    width: WP(41.03),
    height: HP(20.14),
    zIndex: 0,
  },
  bicardTwo: {
    bottom: HP(27.84),
    marginLeft: WP(56.41),
    paddingTop: HP(1.18),
    paddingLeft: WP(12.82),
    paddingRight: WP(12.82),
    backgroundColor: "#2B2D2F",
    borderRadius: 12,
    width: WP(41.03),
    height: HP(20.14),
    zIndex: 0,
  },
  optionsContainer: {
    bottom: HP(23.7),
    marginLeft: WP(7.69),
    paddingTop: HP(1.18),
    paddingLeft: WP(12.82),
    paddingRight: WP(12.82),
    backgroundColor: "#2B2D2F",
    borderRadius: 12,
    width: WP(89.74),
    height: HP(17.77),
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
    fontSize: HP(4.74),
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    top: HP(8.89),
  },
  textContainer: {
    paddingVertical: HP(1.18),
    paddingHorizontal: WP(2.56),
    top: HP(1.78),
    zIndex: 100,
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});

export default WelcomeScreen;
