import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Button,
} from "react-native";
function WelcomeScreen({ navigation }) {
  LayoutAnimation.easeInEaseOut();

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Notifications</Text>
      </View>
      <View style={styles.bicardOne}>
        <TouchableOpacity onPress={() => navigation.navigate("Archive")}>
          <Button
            color={"#798497"}
            title={"Notif 1"}
            onPress={() => navigation.navigate("Archive")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bicardTwo}>
        <TouchableOpacity onPress={() => navigation.navigate("Archive")}>
          <Button
            color={"#798497"}
            title={"Notif 2"}
            onPress={() => navigation.navigate("Archive")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bicardThree}>
        <TouchableOpacity onPress={() => navigation.navigate("Archive")}>
          <Button
            color={"#798497"}
            title={"Notif 3"}
            onPress={() => navigation.navigate("Archive")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bicardFour}>
        <TouchableOpacity onPress={() => navigation.navigate("Archive")}>
          <Button
            color={"#798497"}
            title={"Notif 4"}
            onPress={() => navigation.navigate("Archive")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bicardOne: {
    top: 120,
    left: 10,
    paddingTop: 10,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: "#2B2D2F",
    borderRadius: 12,
    width: 180,
    height: 110,
  },
  bicardTwo: {
    top: 10,
    left: 220,
    paddingTop: 10,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: "#2B2D2F",
    borderRadius: 12,
    width: 180,
    height: 110,
  },
  bicardThree: {
    top: 40,
    left: 10,
    paddingTop: 10,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: "#2B2D2F",
    borderRadius: 12,
    width: 180,
    height: 110,
  },
  bicardFour: {
    bottom: 70,
    left: 220,
    paddingTop: 10,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: "#2B2D2F",
    borderRadius: 12,
    width: 180,
    height: 110,
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
