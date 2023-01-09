import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React from "react";
import * as firebase from "firebase";
import { WP, HP } from "../../config/responsive";

const AccountScreen = () => {
  <View style={styles.container}>
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <View style={styles.navigation}>
        <AntDesign name="left" size={27} color="black" />
        <Text style={styles.heading}>Profile</Text>
      </View>
    </TouchableWithoutFeedback>
    <DialogInput
      isDialogVisible={toggle}
      title={"Change in Account"}
      message={`Type your ${type} in the box below`}
      hintInput={"Type here..."}
      submitInput={(inputText) => handleClick(inputText)}
      closeDialog={() => setToggle(false)}
    ></DialogInput>
    <View style={styles.editContainer}>
      <Text style={styles.containerHeading}>Name</Text>
      <View style={styles.innerEditContainer}>
        <Text style={styles.value}>{name}</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            setToggle(true);
            setType("name");
          }}
        >
          <MaterialCommunityIcons name="pencil" size={18} color="#333" />
        </TouchableWithoutFeedback>
      </View>
    </View>
    <View style={styles.editContainer}>
      <Text style={styles.containerHeading}>Email</Text>
      <View style={styles.innerEditContainer}>
        <Text style={styles.value}>{firebase.auth().currentUser.email}</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            setToggle(true);
            setType("email");
          }}
        >
          <MaterialCommunityIcons name="pencil" size={18} color="#333" />
        </TouchableWithoutFeedback>
      </View>
    </View>
    <TouchableWithoutFeedback onPress={() => firebase.auth().signOut()}>
      <View style={styles.signOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </View>
    </TouchableWithoutFeedback>
  </View>;
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    flex: 1,
    backgroundColor: "#000",
  },
  navigation: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: WP(3),
    marginTop: HP(8),
    marginBottom: HP(4),
  },
  heading: {
    fontSize: HP(3),
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: WP(1),
    color: "#fff",
  },
  editContainer: {
    width: WP(100),
    paddingLeft: WP(8),
    height: HP(10),
    justifyContent: "center",
  },
  containerHeading: {
    fontSize: HP(1.51),
    color: "#fff",
    textTransform: "uppercase",
  },
  innerEditContainer: {
    marginTop: HP(1),
    flexDirection: "row",
    width: WP(85),
    justifyContent: "space-between",
  },
  signOut: {
    backgroundColor: "#FF5349",
    borderRadius: 10,
    width: WP(80),
    height: HP(7.5),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: HP(3),
  },
  signOutText: {
    fontSize: HP(2),
    color: "#ffff",
    fontWeight: "bold",
  },
});