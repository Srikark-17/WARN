import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Button,
  Alert
} from "react-native";

import { Container, Header, Content, ListItem, CheckBox, Body } from 'native-base';
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

function WelcomeScreen({ navigation }) {
  LayoutAnimation.easeInEaseOut();
  const [fireState, inverseFire] = useState(false);
  const [AQState, inverseAQ] = useState(false);
  const [pollenState, inversePollen] = useState(false);
  const [pollutionState, inversePollution] = useState(false);
  const textColor = '#fff'
const themeColor = '#FF5757'
const checkboxColor = '#00AB66'
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Notifications</Text>
       
      </View>
      <MaterialCommunityIcons
        style={{ color: "orange", top: 85, left: 25, zIndex: 100 }}
        name="fire"
        size={50}
      />
      <CheckBox checked={fireState} color={fireState ? checkboxColor : textColor} onPress={() => {
        inverseFire(!fireState)
        }} style={{top: 100, left:42, zIndex: 100}}/>
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
        Click to get notified if the {"\n"}selected option is dangerous
      </Text>

      <TouchableOpacity
        style={styles.bicardOne}
        onPress={() => Alert.alert('jeje')}
      >
        <Button
          color={"#798497"}
          title={""}
          onPress={() => Alert.alert('www')}
        />
      </TouchableOpacity>

      <FontAwesome5
        style={{ color: "white", zIndex: 100, top: -20, left: 30 }}
        name="wind"
        size={40}
      />
      <CheckBox checked={AQState} color={AQState ? checkboxColor : textColor} onPress={() => {
        inverseAQ(!AQState)
        }} style={{top: 0, left:42, zIndex: 100}}/>
      <Text
        style={{
          color: "white",
          fontWeight: "800",
          fontSize: 30,
          top: -75,
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
          top: -65,
          left: 90,
        }}
      >
        Click to get notified if the {"\n"}selected option is dangerous
      </Text>
      <TouchableOpacity
        style={styles.bicardTwo}
        onPress={() => Alert.alert('hello')}
      >
        <Button
          color={"#798497"}
          title={""}
          onPress={() => navigation.navigate("Archive")}
        />
      </TouchableOpacity>
      <MaterialCommunityIcons
        style={{ color: "#FCC200", zIndex: 100, left: 30, top: -120 }}
        name="flower"
        size={40}
      />
      <CheckBox checked={pollenState} color={pollenState ? checkboxColor : textColor} onPress={() => {
        inversePollen(!pollenState)
        }} style={{bottom: 100, left:42, zIndex: 100}}/>
      <Text
        style={{
          color: "white",
          fontWeight: "800",
          fontSize: 30,
          top: -170,
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
          top: -170,
          left: 90,
        }}
      >
        Click to get notified if the {"\n"}selected option is dangerous
      </Text>
      <TouchableOpacity
        style={styles.bicardThree}
        onPress={() => navigation.navigate("Archive")}
      >
        <Button
          color={"#798497"}
          title={""}
          onPress={() => navigation.navigate("Archive")}
        />
      </TouchableOpacity>
      <MaterialCommunityIcons
        style={{ color: "black", zIndex: 100, top: -225, left: 30 }}
        name="factory"
        size={40}
      />
       <CheckBox checked={pollutionState} color={pollutionState ? checkboxColor : textColor} onPress={() => {
        inversePollution(!pollutionState)
        }} style={{bottom:200,left:42, zIndex: 100}}/>
      <Text
        style={{
          color: "white",
          fontWeight: "800",
          fontSize: 30,
          top: -272,
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
          top: -270,
          left: 90,
        }}
      >
        Click to get notified if the {"\n"}selected option is dangerous
      </Text>
      <TouchableOpacity
        style={styles.bicardFour}
        onPress={() => navigation.navigate("Archive")}
      >
        <Button
          color={"#798497"}
          title={""}
          onPress={() => navigation.navigate("Archive")}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bicardOne: {
    top: -70,
    left: 10,
    paddingTop: 10,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: "#FF5349",
    borderRadius: 12,
    width: 400,
    height: 120,
    zIndex: 0,
  },
  bicardTwo: {
    top: -170,
    left: 10,
    paddingTop: 10,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: "#89CFF0",
    borderRadius: 12,
    width: 400,
    height: 120,
    zIndex: 0,
  },
  bicardThree: {
    top: -270,
    left: 10,
    paddingTop: 10,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: "#7EC850",
    borderRadius: 12,
    width: 400,
    height: 120,
    zIndex: 0,
  },
  bicardFour: {
    bottom: 370,
    left: 10,
    paddingTop: 10,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: "#6F7691",
    borderRadius: 12,
    width: 400,
    height: 120,
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
