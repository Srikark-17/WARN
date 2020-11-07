import React from "react";
import { View, TextInput, StyleSheet, Platform } from "react-native";

function AppTextInput({ icon, width = "100%", ...otherProps }) {
  return (
    <View style={[styles.container, { width }]}>
      <TextInput
        placeholderTextColor={"#A8A8A8"}
        style={styles.input}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    borderColor: "#FF5349",
    borderWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    color: "#A8A8A8",
    flex: 1,
  },
});

export default AppTextInput;
