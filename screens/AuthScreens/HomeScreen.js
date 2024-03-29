import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Linking,
  Alert,
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
import * as firebase from "firebase";

function HomeScreen() {
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
  const [iconName, setIconName] = useState();
  const [iconColor, setIconColor] = useState();

  let convertTime = (time, timezone) => {
    fetch(
      `https://showcase.api.linx.twenty57.net/UnixTime/fromunix?timestamp=${time}`
    )
      .then((response) => response.json())
      .then((res) => {
        let slicedString = res.slice(11);
        let hours = slicedString.slice(0, 2);
        let integerHours = parseInt(hours);
        let convertedTimezone = timezone / 3600;
        let realTime = integerHours + convertedTimezone;
        console.log(realTime);
        if (Math.sign(realTime == 0)) {
          slicedString = "An Error Has Occurred";
          console.log("final string" + slicedString);
        } else if (Math.sign(realTime) == -1 || Math.sign(realTime) == 0) {
          realTime = realTime + 12;
          slicedString = realTime + slicedString.slice(2);
          console.log(slicedString);
        }
        console.log("sliced string");
        console.log(slicedString);
        setSunset(slicedString);
      })
      .catch((err) => {
        console.log(err);
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
        let location = await Location.getCurrentPositionAsync({
          accuracy:
            Platform.OS === "ios"
              ? Location.Accuracy.Lowest
              : Location.Accuracy.Low,
        }).catch((e) => {
          console.log(e);
        });
        if (location) {
          setLocation(location);
          fetch(
            `http://api.openweathermap.org/data/2.5/air_pollution?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=9ae4cff24c24dd5a01df964375ee6148`
          )
            .then((response) => response.json())
            .then((res) => {
              let aqiLevel = res.list[0].main.aqi;
              setAQILevel(aqiLevel);
              setLevelInterpretation(levelInterpreter(aqiLevel));
            })
            .catch((e) => {
              console.log(e);
            });
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=9ae4cff24c24dd5a01df964375ee6148`
          )
            .then((response) => response.json())
            .then((res) => {
              var temperature = K2F(res.main.temp);
              if (temperature <= 32) {
                setIconName("thermometer-0");
                setIconColor("#7AD7FO");
              } else if (temperature >= 33) {
                setIconName("thermometer-1");
                setIconColor("#B7E9F7");
              } else if (temperature >= 54) {
                setIconName("thermometer-2");
                setIconColor("#FCAE1E");
              } else if (temperature >= 55) {
                setIconName("thermometer-3");
                setIconColor("#FA8128");
              } else if (temperature >= 91) {
                setIconName("thermometer-4");
                setIconColor("#FF5349D");
              }
              setTemperature(temperature + " °F");
              setPressure(Math.round(res.main.pressure * 0.0145038) + " psi");
              setWindDirection(D2D(res.wind.direction));
              setWindSpeed(M2I(res.wind.speed) + " mph");
              // convertTime(res.sys.sunset, res.timezone);
              setHumidity(res.main.humidity);
            })
            .catch((e) => {
              console.log(e);
            });
          fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&localityLanguage=en&key=bdc_89fda6dbbb724d5a87e4ca549ea669bf`
          )
            .then((response) => response.json())
            .then((res) => {
              let resultsTitle = `${res.locality}, ${res.principalSubdivision}`;
              setResultsTitle(resultsTitle);
            })
            .catch((e) => {
              console.log(e);
            });
        }
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
    if (roundedMetricTemp <= 0) {
      setIconName("thermometer-0");
      setIconColor("#7AD7FO");
    } else if (roundedMetricTemp >= 1) {
      setIconName("thermometer-1");
      setIconColor("#B7E9F7");
    } else if (roundedMetricTemp >= 12) {
      setIconName("thermometer-2");
      setIconColor("#FCAE1E");
    } else if (roundedMetricTemp >= 13) {
      setIconName("thermometer-3");
      setIconColor("#FA8128");
    } else if (roundedMetricTemp >= 33) {
      setIconName("thermometer-4");
      setIconColor("#FF5349D");
    }
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

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      let location = await Location.getCurrentPositionAsync({
        accuracy:
          Platform.OS === "ios"
            ? Location.Accuracy.Lowest
            : Location.Accuracy.Low,
      }).catch((e) => {
        console.log(e);
      });
      setLocation(location);
      fetch(
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=9ae4cff24c24dd5a01df964375ee6148`
      )
        .then((response) => response.json())
        .then((res) => {
          let aqiLevel = res.list[0].main.aqi;
          setAQILevel(aqiLevel);
          setLevelInterpretation(levelInterpreter(aqiLevel));
        })
        .catch((e) => {
          console.log(e);
        });
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=9ae4cff24c24dd5a01df964375ee6148`
      )
        .then((response) => response.json())
        .then((res) => {
          var temperature = K2F(res.main.temp);
          setTemperature(temperature + " °F");
          setPressure(Math.round(res.main.pressure * 0.0145038) + " psi");
          setWindDirection(D2D(res.wind.direction));
          setWindSpeed(M2I(res.wind.speed) + " mph");
          console.log(res.sys.sunset);
          console.log(res.timezone);
          // convertTime(res.sys.sunset, res.timezone);
          setHumidity(res.main.humidity);
        })
        .catch((e) => {
          console.log(e);
        });
      fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&localityLanguage=en&key=bdc_89fda6dbbb724d5a87e4ca549ea669bf`
      )
        .then((response) => response.json())
        .then((res) => {
          let resultsTitle = `${res.locality}, ${res.principalSubdivision}`;
          setResultsTitle(resultsTitle);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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
            {location ? (
              <Text style={styles.locationText}>{resultsTitle}</Text>
            ) : (
              <View>
                <Text style={{ color: "#fff", fontWeight: "400" }}>
                  {" "}
                  Please Enable Location Services
                </Text>
                <Text
                  onPress={() => Linking.openURL("app-settings:warn")}
                  style={{ color: "#007AFF" }}
                >
                  {" "}
                  Open Settings
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.bicardContainer}>
          <View style={styles.bicard}>
            <Text style={styles.bicardTitle}>Air Quality (from 1-5)</Text>
            <Text style={styles.bicardText}>
              {aqiLevel} - {levelInterpretation}
            </Text>
            <Entypo name="air" size={40} color="#54DCB4" />
          </View>
          <View style={styles.bicard}>
            <Text style={styles.bicardTitle}>Temperature</Text>
            <Text style={styles.bicardText}>{temperature + ""}</Text>
            <FontAwesome size={40} name={iconName} color={iconColor} />
          </View>
        </View>
        <View style={styles.bicardContainer}>
          <View style={styles.bicard}>
            <Text style={styles.bicardTitle}>Air Pressure</Text>
            <Text style={styles.bicardText}>{pressure}</Text>
            <Feather name="wind" size={40} color="#65BADF" />
          </View>
          <View style={styles.bicard}>
            <Text style={styles.bicardTitle}>Wind Speed</Text>
            <Text style={styles.bicardText}>
              {windSpeed} {windDirection}
            </Text>
            <AntDesign name="arrowdown" size={40} color="#38CBBC" />
          </View>
        </View>
        <View style={styles.bicardContainer}>
          <View style={styles.bicard}>
            <Text style={styles.bicardTitle}>Humidity</Text>
            <Text style={styles.bicardText}>{humidity} %</Text>
            <Ionicons name="water" size={40} color="#D4F1F9" />
          </View>
          <View style={styles.bicard}>
            <Text style={styles.bicardTitle}>Sunset</Text>
            <Text style={styles.bicardText}>{sunset} PM</Text>
            <Feather name="sunset" size={40} color="#FAC668" />
          </View>
        </View>
        <View style={styles.bicardContainer}>
          <View
            style={{
              borderRadius: 12,
              width: WP(41.03),
              height: HP(12.14),
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          />
        </View>
        <TouchableWithoutFeedback onPress={() => firebase.auth().signOut()}>
          <View style={styles.signOut}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() =>
            firebase
              .auth()
              .currentUser.delete()
              .catch((error) => {
                Alert.alert(`${error}`);
              })
          }
        >
          <View style={styles.signOut}>
            <Text style={styles.signOutText}>Delete Account</Text>
          </View>
        </TouchableWithoutFeedback>
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
    top: HP(7.5),
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
    top: HP(15),
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
