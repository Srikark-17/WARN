import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native'
import { StyleSheet, Text, View, TextInput, FlatList, Button, TouchableOpacity, Image } from "react-native";
import Firebasekeys from "../../config";
import * as firebase from "firebase";
import "firebase/firestore";

let firebaseConfig = Firebasekeys;
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App({navigation}) {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [users, setUsers] = useState([]); // Initial empty array of users

  useEffect(() => {
    const subscriber = firebase.firestore()
      .collection('Lectures')
      .onSnapshot(querySnapshot => {
        const users = [];
        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
  
        setUsers(users);
        setLoading(false);
      });
  
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Question</Text>
      <TextInput style={styles.searchBar} placeholder="Type your question" placeholderTextColor="#798497" />
      <Text style={styles.exampleText}>Example Questions:</Text>
        <View style={styles.noteContainer}>

          <Button color={"#8B8B8B"} title={"What is the solution to x if x is an integer below 15 but satisifes the..."} onPress={() => {navigation.navigate('Audio', {
          });}} />
          <TouchableOpacity styles={styles.trash} onPress={() =>
            Alert.alert(
              "Delete Note",
              "Would you like to delete this note",
              [
                {
                  text: "Yes",
                  onPress: () => firebase.firestore().collection('Lectures').doc(item.key).delete(),
                },
                {
                  text: "No",
                  onPress: () => console.log("No Pressed"),
                },
              ],
              { cancelable: true }
            )
          }>
          </TouchableOpacity>
        </View>
    <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={()=> navigation.navigate('Option Navigation')}>
        <Image
          source={require("./../../assets/icons8-back-arrow-100.png")}
          style={{top: 325, height: 55, width: 55}}
        /> 
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    top: 75,
    fontFamily: "Avenir",
    marginBottom: 35,
    color: "#fff",
  },
  subtitle: {
    color: "#A8A8A8",
    fontSize: 25,
    top: 45,
  },
  searchBar: {
    height: 45,
    width: 350,
    borderWidth: 1,
    borderRadius: 45,
    borderColor: "#47BD77",
    textAlign: "left",
    backgroundColor: "#2B2D2F",
    fontWeight: "bold",
    top: 100,
    paddingLeft: 15,
    color: "#798497"
  },
  exampleText: {
      top: 125,
      fontFamily: "Avenir",
      fontSize: 20,
      color: "#A8A8A8"
  },
  buttonText: {
    fontFamily: "Avenir",
    fontSize: 20,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    textAlignVertical: "center",
  },
  textInput: {
    height: 65,
    width: 313,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 15,
    textAlign: "center",
    color: "#BBBBBB",
    backgroundColor: "#ECECEC",
    fontWeight: "bold",
    top: 55,
  },
  buttonContainer: {
    alignItems: "center",
    flex: 0.3,
    padding: 80,
    top: 30,
  },
  options1Container: {
    padding: 10,
    height: 110,
    width: 180, 
    borderRadius: 10, 
    backgroundColor: "#F9A826",
    right: 90,
    marginRight: 10,
  },
  option1Text: {
    left: 100,
    color: "#fff",
    fontSize: 25,
    bottom: 80,
    fontWeight: "bold",
  },
  options2Container: {
    padding: 10,
    height: 110,
    width: 180, 
    borderRadius: 10, 
    backgroundColor: "#F9A826",
    right: -100,
    bottom: 110,
  },
  option2Text: {
    left: 85,
    color: "#fff",
    fontSize: 25,
    bottom: 80,
    fontWeight: "bold",
  },
  options3Container: {
    padding: 10,
    height: 110,
    width: 180, 
    borderRadius: 10, 
    backgroundColor: "#F9A826",
    left: -95,
    bottom: 110,
    marginTop: 10,
  },
  option3Text: {
    left: 60,
    color: "#fff",
    fontSize: 25,
    bottom: 80,
    fontWeight: "bold",
  },
  options4Container: {
    padding: 10,
    height: 110,
    width: 180, 
    borderRadius: 10, 
    backgroundColor: "#F9A826",
    right: -100,
    bottom: 220,
  },
  option4Text: {
    left: 65,
    color: "#fff",
    fontSize: 25,
    bottom: 60,
    fontWeight: "bold",
  },
  noteContainer: {
    top: 150,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 50,
    backgroundColor: "#ECECEC",
    borderRadius: 10,
    marginBottom: 20,
    width: 350,
    textAlign: "left"
  },
  trash: {
    right: -30,
    bottom: 20,
    position: "absolute",
    color: "#F9A826",
  },
  one: {
    left: 100,
    bottom: -25,
    position: "absolute",
  },
  two: {
    left: 240,
    bottom: -25,
    position: "absolute",
  },
  people: {
    left: 210,
    bottom: -30,
    position: "absolute",
  },
  message: {
    left: 70,
    bottom: -30,
    position: "absolute",
  },
  add: {
    left: 280,
    top: -50,
    position: "absolute",
  },
  buttonContainer: {
    alignItems: "center",
    flex: 0.3,
    padding: 80,
    top: 30,
  },
  addNoteContainer: {
    padding: 10,
    height: 60,
    width: 60, //The Width must be the same as the height
    borderRadius: 100, //Then Make the Border Radius twice the size of width or Height
    backgroundColor: "#F9A826",
  },
  addNote: {
    top: 2,
    left: 3,
    color: "#fff",
  },
});
