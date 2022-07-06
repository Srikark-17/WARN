import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  MaterialIcons,
  Feather,
  AntDesign,
  FontAwesome,
  Ionicons,
  Entypo,
} from "@expo/vector-icons";
import * as Location from "expo-location";
import { HP, WP } from "../../config/responsive";
import * as Localization from "expo-localization";

function HomeScreen() {
  let apiKey = "f0aaf130ca6e4d849bda5e9780058332";
  console.log(Localization.isMetric);

  const [location, setLocation] = useState();
  const [temperature, setTemperature] = useState();
  const [windDirection, setWindDirection] = useState();
  const [aqiLevel, setAQILevel] = useState();
  const [windSpeed, setWindSpeed] = useState();
  const [pressure, setPressure] = useState();
  const [sunset, setSunset] = useState();
  const [humidity, setHumidity] = useState();
  const [resultsTitle, setResultsTitle] = useState();
  const [levelInterpretation, setLevelInterpretation] = useState();

  let convertTime = (time) => {
    fetch(
      `https://showcase.api.linx.twenty57.net/UnixTime/fromunix?timestamp=${time}`
    )
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        return res;
      });
  };

  let K2F = (kelvin) => {
    return Math.round((kelvin - 273.15) * 1.8 + 32);
  };

  let M2I = (meters) => {
    return Math.round(2.2369 * meters);
  };

  let D2D = (degrees) => {
    if (degrees < 22.5) {
      return "N";
    } else if (degrees < 33.75) {
      return "NE";
    } else if (degrees < 67.5) {
      return "E";
    } else if (degrees < 112.5) {
      return "SE";
    } else if (degrees < 157.5) {
      return "S";
    } else if (degrees < 202.5) {
      return "SW";
    } else if (degrees < 247.5) {
      return "W";
    } else if (degrees < 292.5) {
      return "N";
    } else if (degrees < 337.5) {
      return "NW";
    } else if (degrees < 360) {
      return "N";
    }
  };

  let levelInterpreter = (value) => {
    if (value == 1) {
      return "Good";
    }
    if (value == 2) {
      return "Fair";
    }
    if (value == 3) {
      return "Moderate";
    }
    if (value == 4) {
      return "Poor";
    }
    if (value == 5) {
      return "Very Poor";
    }
  };

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
            setLevelInterpretation(levelInterpreter(aqiLevel));
          });
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=9ae4cff24c24dd5a01df964375ee6148`
        )
          .then((response) => response.json())
          .then((res) => {
            var temperature = K2F(res.main.temp);
            setTemperature(temperature + " °F");
            setPressure(Math.round(res.main.pressure * 2.088546)+ " psi");
            setWindDirection(D2D(res.wind.direction));
            setWindSpeed(M2I(res.wind.speed)+" mph");
            setSunset(convertTime(res.sys.sunrise));
            setHumidity(res.main.humidity);
          });
        fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&localityLanguage=en&key=bdc_89fda6dbbb724d5a87e4ca549ea669bf`
        )
          .then((response) => response.json())
          .then((res) => {
            let resultsTitle = `${res.localityInfo.administrative[3].name}, ${res.principalSubdivisionCode}`;
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

  if (Localization.isMetric == true) {
    // convert temp
    const metricTemp = (temperature - 32) * 1.8;
    const roundedMetricTemp = Math.round(metricTemp);
    setTemperature(roundedMetricTemp + " °C");

    // convert pressure
    setPressure(pressure / 2.088456 + " hPa");

    // convert wind Speed
    setWindSpeed(windSpeed * 1.609 + " kmh");
  }

  let rawTime = new Date().getHours() + ":" + new Date().getMinutes();
  rawTime = rawTime.split(":"); // convert to array

  // fetch
  const hours = Number(rawTime[0]);
  const minutes = Number(rawTime[1]);

  // calculate
  let time = null;

  if (hours > 0 && hours <= 12) {
    time = "" + hours;
  } else if (hours > 12) {
    time = hours - 12;
  } else if (hours == 0) {
    time = "12";
  }

  time += minutes < 10 ? ":0" + minutes : ":" + minutes; // get minutes
  time += hours >= 12 ? " P.M." : " A.M."; // get AM/PM

  const date =
    new Date().getMonth() +
    1 +
    "/" +
    new Date().getDate() +
    "/" +
    new Date().getFullYear() +
    " " +
    time;

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Dashboard</Text>
      </View>
      <View>
        <View style={styles.locationContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.locationHeading}>Location</Text>
            <Text style={styles.dateText}>{date}</Text>
          </View>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <MaterialIcons
              name="location-on"
              size={20}
              style={{ color: "#FF5934" }}
            />
            <Text style={styles.locationText}>{resultsTitle}</Text>
          </View>
        </View>
        <View style={styles.bicardContainer}>
          <View style={styles.bicard}>
            <Text style={styles.bicardTitle}>Air Quality (from 1-5)</Text>
            <Text style={styles.bicardText}>
              {aqiLevel} - {levelInterpretation}
            </Text>
            <Entypo name="air" size={40} color="#fff" />
          </View>
          <View style={styles.bicard}>
            <Text style={styles.bicardTitle}>Temperature</Text>
            <Text style={styles.bicardText}>{temperature}</Text>
            <FontAwesome size={40} name="thermometer-3" color="#fff" />
          </View>
        </View>
        <View style={styles.bicardContainer}>
          <View style={styles.bicard}>
            <Text style={styles.bicardTitle}>Air Pressure</Text>
            <Text style={styles.bicardText}>{pressure}</Text>
            <Feather name="wind" size={40} color="#fff" />
          </View>
          <View style={styles.bicard}>
            <Text style={styles.bicardTitle}>Wind Speed</Text>
            <Text style={styles.bicardText}>
              {windSpeed} {windDirection}
            </Text>
            <AntDesign name="arrowdown" size={40} color="#fff" />
          </View>
        </View>
        <View style={styles.bicardContainer}>
          <View style={styles.bicard}>
            <Text style={styles.bicardTitle}>Humidity</Text>
            <Text style={styles.bicardText}>{humidity} %</Text>
            <Ionicons name="water" size={40} color="#fff" />
          </View>
          <View style={styles.bicard}>
            <Text style={styles.bicardTitle}>Sunset</Text>
            <Text style={styles.bicardText}>{sunset} PM</Text>
            <Feather name="sunset" size={40} color="#fff" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  locationContainer: {
    alignSelf: "center",
    alignItems: "flex-start",
    justifyContent: "center",
    top: HP(12),
    backgroundColor: "#2B2D2F",
    borderRadius: 12,
    width: WP(89.74),
    paddingLeft: WP(5),
    height: HP(14.22),
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    bottom: HP(2),
    width: WP(76),
  },
  locationHeading: {
    color: "#FFFFFF",
    fontSize: HP(2.37),
    marginLeft: WP(2),
    fontWeight: "bold",
  },
  dateText: {
    color: "#FFFFFF",
    fontSize: HP(1.8),
    marginLeft: WP(2),
    fontWeight: "bold",
  },
  locationText: {
    color: "#FFFFFF",
    fontSize: HP(2.37),
    marginLeft: WP(2),
  },
  title: {
    fontFamily: "Avenir",
    fontSize: HP(4.74),
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    top: HP(10),
  },
  textContainer: {
    paddingVertical: HP(1.18),
    paddingHorizontal: WP(2.56),
  },
  bicardContainer: {
    width: WP(100),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginTop: HP(15),
    marginBottom: HP(2),
  },
  bicard: {
    backgroundColor: "#2B2D2F",
    borderRadius: 12,
    width: WP(41.03),
    height: HP(20.14),
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  bicardTitle: {
    color: "#FFFFFF",
    fontSize: HP(2.37),
    fontWeight: "700",
    width: WP(35),
    textAlign: "center",
  },
  bicardText: {
    color: "#FFFFFF",
    fontSize: HP(2.37),
    fontWeight: "700",
  },
});

export default HomeScreen;
