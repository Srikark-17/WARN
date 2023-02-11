import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as firebase from "firebase";
import { WP, HP } from "../../config/responsive";
import DialogInput from "react-native-dialog-input";
import { getArticles } from "./components/feedNews";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import Modal from "./components/modal";
import { List } from "native-base";
import DataItem from "./components/dataItemNews";

const AccountScreen = ({ navigation }) => {
  const [name, setName] = useState();
  const [toggle, setToggle] = useState(false);
  const [email, setEmail] = useState();
  const [type, setType] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalArticleData, setModalArticleData] = useState({});

  useEffect(() => {
    setEmail(firebase.auth().currentUser.email);
    setName(firebase.auth().currentUser.displayName);
    const dbRef = firebase.database().ref("users");
    dbRef.child(firebase.auth().currentUser.uid).on("value", (snapshot) => {
      setData(snapshot.val());
    });
  }, []);
  const handleItemDataOnPress = (articleData) => {
    setModalVisible(true);
    setModalArticleData(articleData);
  };

  const handleClick = (inputText) => {
    if (type == "name") {
      firebase.auth().currentUser.updateProfile({
        displayName: inputText,
      });
      setName(inputText);
      setToggle(false);
    }
    if (type == "email") {
      firebase.auth().currentUser.updateProfile({
        email: inputText,
      });
      setEmail(inputText);
      setToggle(false);
    }
  };

  return (
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
          <Text style={styles.value}>{email}</Text>
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
      <Text style={styles.subHeading}>Favorite News</Text>
      {isLoading ? (
        <View>
          <ActivityIndicator animating={isLoading} />
          <Text style={{ marginTop: 15 }}>Loading...</Text>
        </View>
      ) : (
        <List
          style={styles.list}
          dataArray={data}
          renderRow={(item) => {
            return (
              <DataItem
                onClose={navigation.navigate("Account")}
                onPress={() => handleItemDataOnPress()}
                data={item}
                like={false}
              />
            );
          }}
        />
      )}
      <TouchableWithoutFeedback onPress={() => firebase().auth().signOut()}>
        <View style={styles.signOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
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
  subHeading: {
    fontSize: HP(2.5),
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: WP(1),
    color: "#fff",
    marginLeft: WP(7),
    marginTop: HP(3),
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
  value: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: HP(1.5),
  },
  list: {
    // borderWidth: 1,
    // borderColor: "white",
    // borderStyle: "solid",
    width: WP(90),
    marginLeft: WP(6),
  },
});
