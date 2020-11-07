import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, TouchableOpacity, FlatList, Image} from "react-native";
import Firebasekeys from "../../config";
import * as firebase from "firebase";
import "firebase/firestore";

import {
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

let firebaseConfig = Firebasekeys;
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// export default function App({route}) {
//   const [loading, setLoading] = useState(true); // Set loading to true on component mount
//   const [users, setUsers] = useState([]); // Initial empty array of users
//   const {docName} = route.params;
//   useEffect(() => {
//     const subscriber = firebase.firestore()
//       .collection('Lectures')
//       .doc(docName)
//       .collection('notes')
//       .onSnapshot(querySnapshot => {
//         const users = [];
//         querySnapshot.forEach(documentSnapshot => {
//           users.push({
//             ...documentSnapshot.data(),
//             key: documentSnapshot.id,
//           });
//         });
  
//         setUsers(users);
//         setLoading(false);
//       });
      

  
//     // Unsubscribe from events when no longer in use
//     return () => subscriber();
//   }, []);

//   if (loading) {
//     return <ActivityIndicator />;
//   }
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>My Notes</Text>
//       <Text style={styles.subtitle}>{docName}</Text>
    
export default function App({navigation, route}) {
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [users, setUsers] = useState([]); // Initial empty array of users
  const {docName} = route.params;
  useEffect(() => {
    const subscriber = firebase.firestore()
      .collection('Lectures')
      .doc(docName)
      .collection('notes')
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
  const handleRecording = () => {
    setRecording(!recording)
    if (!recording) {
      console.log("Started recording voice...")
    }
    else {
      console.log("Stopped recording voice")
    }
    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Problems</Text>
  <Text style={styles.subtitle}>{docName}</Text>
      <TextInput style={styles.searchBar} placeholder="Search notes" />
      <FlatList
      data={users}
      renderItem={({ item }) => (
        <View style={styles.noteContainer}>
          <TouchableOpacity  onPress={()=> navigation.navigate('Archive')}>
            <Button
              color={"#8B8B8B"}
              title={item.notes}   
              onPress={()=> navigation.navigate('Archive')}
            />
          </TouchableOpacity>
        <FontAwesome5
          style={styles.trash}
          name="trash"
          onPress={() =>
            Alert.alert(
              "Delete Note",
              "Would you like to delete this?",
              [
                {
                  text: "Yes",
                  onPress: () => firebase.firestore().collection('Lectures').doc(docName).collection('notes').doc(item.key).delete(),
                },
                {
                  text: "No",
                  onPress: () => console.log("No Pressed"),
                },
              ],
              { cancelable: true }
            )
          }
          size={15}
        />
        <MaterialCommunityIcons
          style={styles.pencil}
          onPress={() =>
            Alert.prompt(
              "Edit Note",
              "How would you like to edit your note?",
              (text) => firebase.firestore().collection('Lectures').doc(docName).collection('notes').doc(item.key).set({notes: text})
            )
          }
          name="pencil"
          size={20}
        />
      </View>
      )}
    />
      <View style={styles.methods}>
        <TouchableOpacity onPress={() => navigation.navigate("My Notes Add Image", {
          lectureName: docName,
        })}>
          <FontAwesome5 style={styles.takeAPicture} name="camera" size={48} />
        </TouchableOpacity>
      </View>
      <View style={styles.animationContainer}>
        {recording && <Image 
          source={require('./animation.gif')}  
          style={{width: 200, height: 120 }}
        />}
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  animationContainer: {
    width: '90%',
    height: 110,
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 120
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    top: 88,
    fontFamily: "Avenir",
    marginBottom: 35,
  },
  subtitle: {
    color: "#A8A8A8",
    fontSize: 20,
    top: 65,
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
  noteContainer: {
    top: 150,
    paddingTop: 10,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: "#ECECEC",
    borderRadius: 12,
    marginBottom: 20,
    width: 350,
    height: 80,
  },
  trash: {
    left: 265,
    bottom: 55,
    color: "#C1C1C1",
    bottom: 2
  },
  pencil: {
    left: 263,
    bottom: 40,
    color: "#C1C1C1",
    bottom: 50
  },
  methods: {
    bottom: 200,
    paddingBottom: 50,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    top: 0,
  },
  voiceType: {
    paddingRight: 70,
    color: "#8E8E8E",
  },
  takeAPicture: {
    color: "#8E8E8E",
  },
  searchBar: {
    height: 45,
    width: 350,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 45,
    borderColor: "#EAEAEA",
    textAlign: "left",
    color: "#BBBBBB",
    backgroundColor: "#fff",
    fontWeight: "bold",
    top: 100,
    paddingLeft: 15,
    borderEndColor: '#F9A826',
    borderTopColor: '#F9A826',
    borderBottomColor: '#F9A826',
    borderStartColor: '#F9A826'
  },
});