import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native'
import { StyleSheet, Text, View, Image, ScrollView, } from "react-native";
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
      <Text style={styles.title}>Access Archive</Text>
      <Text style={styles.subtitle}>Archiving results for</Text>
      <ScrollView style={{ width: 332, height: 100}}>
        <Image
            source={require("./../../assets/result.png")}
            style={{ top: 75,}}
          />
        </ScrollView>
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
  goBack: {
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
});
