import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Button,
} from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
function WelcomeScreen({ navigation }) {
  LayoutAnimation.easeInEaseOut();

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Welcome to WARN</Text>
        <Text style={styles.subtext}>Where people get warned about fires</Text>
      </View>
      <View style={styles.noteContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Archive")}>
          <Button
            color={"#798497"}
            title={"hello"}
            onPress={() => navigation.navigate("Archive")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bicardOne}>
        <TouchableOpacity onPress={() => navigation.navigate("Archive")}>
          <Button
            color={"#798497"}
            title={"hello"}
            onPress={() => navigation.navigate("Archive")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bicardTwo}>
        <TouchableOpacity onPress={() => navigation.navigate("Archive")}>
          <Button
            color={"#798497"}
            title={"hello"}
            onPress={() => navigation.navigate("Archive")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.optionsContainer}>
        <View style={styles.fireContainer}>
          <MaterialCommunityIcons style={styles.fire} name="fire" size={45} />
        </View>
        <View style={styles.windContainer}>
          <FontAwesome5 style={styles.wind} name="wind" size={40} />
        </View>
        <View style={styles.flowerContainer}>
          <MaterialCommunityIcons
            style={styles.flower}
            name="flower"
            size={40}
          />
        </View>
        <View style={styles.factoryContainer}>
          <MaterialCommunityIcons
            style={styles.factory}
            name="factory"
            size={40}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: "#FF5349",
  },
  factory: {
    left: -2,
    bottom: 3,
    color: "orange",
  },
  noteContainer: {
    top: 140,
    marginLeft: 30,
    paddingTop: 10,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: "#2B2D2F",
    borderRadius: 12,
    width: 350,
    height: 120,
  },
  bicardOne: {
    top: 180,
    marginLeft: 30,
    paddingTop: 10,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: "#2B2D2F",
    borderRadius: 12,
    width: 160,
    height: 170,
  },
  bicardTwo: {
    top: 10,
    marginLeft: 220,
    paddingTop: 10,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: "#2B2D2F",
    borderRadius: 12,
    width: 160,
    height: 170,
  },
  optionsContainer: {
    top: 50,
    marginLeft: 30,
    paddingTop: 10,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: "#2B2D2F",
    borderRadius: 12,
    width: 350,
    height: 120,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  circle: {
    borderRadius: 20,
    backgroundColor: "orange",
  },
  subtext: {
    color: "white",
    fontFamily: "Avenir",
    fontSize: 18,
    textAlign: "center",
    top: 60,
  },
  title: {
    fontFamily: "Avenir",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    top: 50,
  },
  textContainer: {
    flex: 0.15,
    padding: 10,
    top: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});

export default WelcomeScreen;
