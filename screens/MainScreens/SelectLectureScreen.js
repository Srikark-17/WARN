import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native'
import { StyleSheet, Text, View, TouchableOpacity, Button, FlatList, Alert } from "react-native";
import Firebasekeys from "../../config";
import * as firebase from "firebase";
import "firebase/firestore";

import { FontAwesome5, AntDesign } from "@expo/vector-icons";

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
      <Text style={styles.title}>My Concepts</Text>
      <FlatList
      data={users}
      renderItem={({ item }) => (
        <View style={styles.noteContainer}>

          <Button style={styles.button} color={"#8B8B8B"} title={item.title} onPress={() => {navigation.navigate('Audio', {
            docName: item.title,
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
            <FontAwesome5 style={styles.trash} name="trash" size={25} />
          </TouchableOpacity>
        </View>
      )}
    />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={()=> navigation.navigate('Start Lecture')}>
          <View style={styles.addNoteContainer}>
            <AntDesign style={styles.addNote} name="plus" size={35} />
          </View>
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
    top: 88,
    fontFamily: "Avenir",
    marginBottom: 35,
    color: "white",
  },
  subtitle: {
    color: "#A8A8A8",
    fontSize: 25,
    top: 65,
  },
  button: {
    color: "#2B2D2F"
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
  addNoteContainer: {
    padding: 10,
    height: 60,
    width: 60, //The Width must be the same as the height
    borderRadius: 100, //Then Make the Border Radius twice the size of width or Height
    backgroundColor: "#47BD77",
  },
  addNote: {
    top: 2,
    left: 3,
    color: "#fff",
  },
  noteContainer: {
    top: 150,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 50,
    backgroundColor: "#2B2D2F",
    borderRadius: 10,
    marginBottom: 20,
    width: 350,
    textAlign: "left"
  },
  trash: {
    right: -30,
    bottom: 10,
    position: "absolute",
    color: "#47BD77",
  },
});
