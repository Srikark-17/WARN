import React, {useState} from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Switch } from "react-native";
import Firebasekeys from "../../config";
import * as firebase from "firebase";
import "firebase/firestore";

let firebaseConfig = Firebasekeys;
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App({navigation, route}) {
  const { photoUrl, base64, lectureName } = route.params;


  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState)
    
    if (!isEnabled){
      console.log("Summarize text.")
    }
    else {
      console.log("Raw text.")
    }
  }

  const addNoteHandler = () => {
    firebase.firestore().collection('Lectures').doc(lectureName).collection('notes').add({notes: 'place note name object here'}) 
    navigation.navigate('My Notes')    
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detected Text</Text>
      
      <View style={styles.textContainer}>
        <ScrollView>
        <Text style={styles.subtext}>
          NotesAI makes note taking simple, effecient and fun! Choose an option
          to get started.NotesAI makes note taking simple, effecient and fun! Choose an option
          to get started.NotesAI makes note taking simple, effecient and fun! Choose an option
          to get started.NotesAI makes note taking simple, effecient and fun! Choose an option
          to get started.NotesAI makes note taking simple, effecient and fun! Choose an option
          to get started.NotesAI makes note taking simple, effecient and fun! Choose an option
          to get started.
        </Text>
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        <Switch
          trackColor={{ false: "#767577", true: "#3D8AFF" }}
          thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <TouchableOpacity
          style={styles.picture}
          onPress={() =>addNoteHandler()}
        >
          <Text style={styles.buttonText}>ADD NOTE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 50,
    fontWeight: "bold",
    top: 88,
    fontFamily: "Avenir",
  },
  buttonText: {
    fontFamily: "Avenir",
    fontSize: 18,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    textAlignVertical: "center",
  },
  Button: {
    backgroundColor: "#3D8AFF",
    width: 271,
    height: 58,
    borderRadius: 7,
    justifyContent: "center",
    top: 30,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.25,
  },
  picture: {
    backgroundColor: "#3D8AFF",
    width: 234,
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    top: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.25,
  },
  lecture: {
    backgroundColor: "#3D8AFF",
    width: 234,
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.25,
    top: 50,
  },
  buttonContainer: {
    alignItems: "center",
    flex: 0.3,
    padding: 30,
    top: 30,
  },
  SVGcontainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    top: 50,
  },
  subtext: {
    color: "#A8A8A8",
    fontFamily: "Avenir",
    fontSize: 18,
    textAlign: "left",
    top: 0,

  },
  textContainer: {
    flex: 0.68,
    padding: 15,
    top: 80,
    width: '90%',
  },
  summarize: {
    backgroundColor: "#3D8AFF",
    width: 234,
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    top: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.25,
  },
});
