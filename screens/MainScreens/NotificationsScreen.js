import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  Alert,
  ScrollView,
} from "react-native";

import { CheckBox } from "native-base";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { HP, WP } from "../../config/responsive";

function WelcomeScreen() {
  const [fireState, inverseFire] = useState(false);
  const [AQState, inverseAQ] = useState(false);
  const [pollenState, inversePollen] = useState(false);
  const [pollutionState, inversePollution] = useState(false);
  const textColor = "#fff";
  const checkboxColor = "#00AB66";

  return (
    <ScrollView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Notifications</Text>
      </View>
      <MaterialCommunityIcons
        style={{ color: "orange", top: HP(10.07), left: WP(6.41), zIndex: 100 }}
        name="fire"
        size={50}
      />
      <CheckBox
        checked={fireState}
        color={fireState ? checkboxColor : textColor}
        onPress={() => {
          inverseFire(!fireState);
        }}
        style={{ top: HP(11.85), left: WP(10.77), zIndex: 100 }}
      />
      <Text
        style={{
          color: "white",
          fontWeight: "800",
          fontSize: HP(3.55),
          top: HP(2.7),
          zIndex: 100,
          left: WP(23.08),
        }}
      >
        Fire
      </Text>
      <Text
        style={{
          color: "white",
          fontWeight: "700",
          fontSize: HP(2.37),
          zIndex: 100,
          top: HP(3.7),
          left: WP(23.08),
        }}
      >
        Click to get notified if the {"\n"}selected option is dangerous
      </Text>

      <TouchableOpacity style={styles.cardOne} activeOpacity={1}>
        <Button color={"#798497"} title={""} />
      </TouchableOpacity>

      <FontAwesome5
        style={{ color: "white", zIndex: 100, top: HP(-1.87), left: WP(7.7) }}
        name="wind"
        size={40}
      />
      <CheckBox
        checked={AQState}
        color={AQState ? checkboxColor : textColor}
        onPress={() => {
          inverseAQ(!AQState);
        }}
        style={{ left: WP(10.77), zIndex: 100 }}
      />
      <Text
        style={{
          color: "white",
          fontWeight: "800",
          fontSize: HP(3.55),
          top: HP(-8.89),
          zIndex: 100,
          left: WP(23.08),
        }}
      >
        Air Quality
      </Text>
      <Text
        style={{
          color: "white",
          fontWeight: "700",
          fontSize: HP(2.37),
          zIndex: 100,
          top: HP(-7.7),
          left: WP(23.08),
        }}
      >
        Click to get notified if the {"\n"}selected option is dangerous
      </Text>
      <TouchableOpacity activeOpacity={1} style={styles.cardTwo}>
        <Button color={"#798497"} title={""} />
      </TouchableOpacity>
      <MaterialCommunityIcons
        style={{
          color: "#FCC200",
          zIndex: 100,
          left: WP(7.69),
          top: HP(-13.21),
        }}
        name="flower"
        size={40}
      />
      <CheckBox
        checked={pollenState}
        color={pollenState ? checkboxColor : textColor}
        onPress={() => {
          inversePollen(!pollenState);
        }}
        style={{ bottom: HP(11.85), left: WP(10.77), zIndex: 100 }}
      />
      <Text
        style={{
          color: "white",
          fontWeight: "800",
          fontSize: HP(3.55),
          top: HP(-20.14),
          zIndex: 100,
          left: WP(23.08),
        }}
      >
        Pollen
      </Text>
      <Text
        style={{
          color: "white",
          fontWeight: "700",
          fontSize: HP(2.37),
          zIndex: 100,
          top: HP(-20.14),
          left: WP(23.08),
        }}
      >
        Click to get notified if the {"\n"}selected option is dangerous
      </Text>
      <TouchableOpacity style={styles.cardThree} activeOpacity={1}>
        <Button color={"#798497"} title={""} />
      </TouchableOpacity>
      <MaterialCommunityIcons
        style={{ color: "black", zIndex: 100, top: HP(-25.66), left: WP(7.69) }}
        name="factory"
        size={40}
      />
      <CheckBox
        checked={pollutionState}
        color={pollutionState ? checkboxColor : textColor}
        onPress={() => {
          inversePollution(!pollutionState);
        }}
        style={{ bottom: HP(23.7), left: WP(10.77), zIndex: 100 }}
      />
      <Text
        style={{
          color: "white",
          fontWeight: "800",
          fontSize: HP(3.55),
          top: HP(-32.23),
          zIndex: 100,
          left: WP(23.08),
        }}
      >
        Pollution
      </Text>
      <Text
        style={{
          color: "white",
          fontWeight: "700",
          fontSize: HP(2.37),
          zIndex: 100,
          top: HP(-32),
          left: WP(23.08),
        }}
      >
        Click to get notified if the {"\n"}selected option is dangerous
      </Text>
      <TouchableOpacity style={styles.cardFour} activeOpacity={1}>
        <Button color={"#798497"} title={""} />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardOne: {
    top: HP(-8.29),
    left: WP(2.56),
    paddingTop: HP(1.18),
    paddingLeft: WP(12.82),
    paddingRight: WP(12.82),
    backgroundColor: "#FF5349",
    borderRadius: 12,
    width: WP(95),
    height: HP(14.22),
    zIndex: 0,
  },
  cardTwo: {
    top: HP(-20.14),
    left: WP(2.56),
    paddingTop: HP(1.18),
    paddingLeft: WP(12.82),
    paddingRight: WP(12.82),
    backgroundColor: "#89CFF0",
    borderRadius: 12,
    width: WP(95),
    height: HP(14.22),
    zIndex: 0,
  },
  cardThree: {
    top: HP(-32),
    left: WP(2.56),
    paddingTop: HP(1.18),
    paddingLeft: WP(12.82),
    paddingRight: WP(12.82),
    backgroundColor: "#7EC850",
    borderRadius: 12,
    width: WP(95),
    height: HP(14.22),
    zIndex: 0,
  },
  cardFour: {
    bottom: HP(43.84),
    left: WP(2.56),
    paddingTop: HP(1.18),
    paddingLeft: WP(12.82),
    paddingRight: WP(12.82),
    backgroundColor: "#6F7691",
    borderRadius: 12,
    width: WP(95),
    height: HP(14.22),
    zIndex: 0,
  },
  title: {
    fontFamily: "Avenir",
    fontSize: HP(5.33),
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    top: HP(7.11),
  },
  textContainer: {
    paddingVertical: HP(1.18),
    paddingHorizontal: WP(2.56),
    top: HP(1.78),
    marginBottom: HP(3.55),
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});

export default WelcomeScreen;
