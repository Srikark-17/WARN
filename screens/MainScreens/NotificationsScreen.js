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
        <Text style={styles.title}>Notifications</Text>
      </View>
      <MaterialCommunityIcons
        style={{ color: "orange", top: 65, left: 25, zIndex: 100 }}
        name="fire"
        size={50}
      />
      <Text
        style={{
          color: "white",
          fontWeight: "800",
          fontSize: 30,
          top: 20,
          zIndex: 100,
          left: 90,
        }}
      >
        Fire
      </Text>
      <Text
        style={{
          color: "white",
          fontWeight: "700",
          fontSize: 20,
          zIndex: 100,
          top: 30,
          left: 90,
        }}
      >
        Lorem ipsum dolor sit amet
      </Text>
      
        <TouchableOpacity style={styles.bicardOne} onPress={() => navigation.navigate("Archive")}>
          <Button
            color={"#798497"}
            title={""}
            onPress={() => navigation.navigate("Archive")}
          />
        </TouchableOpacity>
      
      <FontAwesome5
        style={{ color: "white", zIndex: 100, top: -15, left: 30 }}
        name="wind"
        size={40}
      />
      <Text
        style={{
          color: "white",
          fontWeight: "800",
          fontSize: 30,
          top: -55,
          zIndex: 100,
          left: 90,
        }}
      >
        Air Quality
      </Text>
      <Text
        style={{
          color: "white",
          fontWeight: "700",
          fontSize: 20,
          zIndex: 100,
          top: -45,
          left: 90,
        }}
      >
        Lorem ipsum dolor sit amet
      </Text>
      <View style={styles.bicardTwo}>
        <TouchableOpacity onPress={() => navigation.navigate("Archive")}>
          <Button
            color={"#798497"}
            title={""}
            onPress={() => navigation.navigate("Archive")}
          />
        </TouchableOpacity>
      </View>
      <MaterialCommunityIcons
        style={{ color: "#FCC200", zIndex: 100, left: 30, top: -90 }}
        name="flower"
        size={40}
      />
      <Text
        style={{
          color: "white",
          fontWeight: "800",
          fontSize: 30,
          top: -130,
          zIndex: 100,
          left: 90,
        }}
      >
        Pollen
      </Text>
      <Text
        style={{
          color: "white",
          fontWeight: "700",
          fontSize: 20,
          zIndex: 100,
          top: -120,
          left: 90,
        }}
      >
        Lorem ipsum dolor sit amet
      </Text>
      <View style={styles.bicardThree}>
        <TouchableOpacity onPress={() => navigation.navigate("Archive")}>
          <Button
            color={"#798497"}
            title={""}
            onPress={() => navigation.navigate("Archive")}
          />
        </TouchableOpacity>
      </View>
      <MaterialCommunityIcons
        style={{ color: "black", zIndex: 100, top: -175, left: 30 }}
        name="factory"
        size={40}
      />
      <Text
        style={{
          color: "white",
          fontWeight: "800",
          fontSize: 30,
          top: -212,
          zIndex: 100,
          left: 90,
        }}
      >
        Pollution
      </Text>
      <Text
        style={{
          color: "white",
          fontWeight: "700",
          fontSize: 20,
          zIndex: 100,
          top: -200,
          left: 90,
        }}
      >
        Lorem ipsum dolor sit amet
      </Text>
      <View style={styles.bicardFour}>
        <TouchableOpacity onPress={() => navigation.navigate("Archive")}>
          <Button
            color={"#798497"}
            title={""}
            onPress={() => navigation.navigate("Archive")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bicardOne: {
    top: -50,
    left: 10,
    paddingTop: 10,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: "#FF5349",
    borderRadius: 12,
    width: 400,
    height: 110,
    zIndex: 0,
  },
  bicardTwo: {
    top: -130,
    left: 10,
    paddingTop: 10,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: "#89CFF0",
    borderRadius: 12,
    width: 400,
    height: 110,
    zIndex: 0,
  },
  bicardThree: {
    top: -210,
    left: 10,
    paddingTop: 10,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: "#7EC850",
    borderRadius: 12,
    width: 400,
    height: 110,
    zIndex: 0,
  },
  bicardFour: {
    bottom: 290,
    left: 10,
    paddingTop: 10,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: "#6F7691",
    borderRadius: 12,
    width: 400,
    height: 110,
    zIndex: 0,
  },
  title: {
    fontFamily: "Avenir",
    fontSize: 45,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    top: 60,
  },
  textContainer: {
    padding: 10,
    top: 15,
    marginBottom: 30,
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});

export default WelcomeScreen;
