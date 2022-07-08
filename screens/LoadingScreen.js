import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { HP } from "../config/responsive";

const LoadingScreen = () => {
  return (
    <Vie style={styles.container}>
      <Text>Loading...</Text>
    </Vie>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: HP(2.7),
    color: "#FF5349",
    fontWeight: "bold",
  },
});
