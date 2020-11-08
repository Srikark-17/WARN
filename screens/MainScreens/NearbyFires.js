import React, { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  View,
  StyleSheet,
  StatusBar,
  Linking,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
} from "native-base";
import { AntDesign, Fontisto, Feather } from "@expo/vector-icons";
import * as firebase from "firebase";
const Face = ({ icon, title, color, full }) => {
  return (
    <View style={styles.faceGroup}>
      {full ? (
        <View style={{ backgroundColor: color, borderRadius: 40 }}>
          <Icon name={icon} size={36} color={"#000"} />
        </View>
      ) : (
        <Icon name={icon} size={36} color={color} />
      )}

      <Text style={[styles.faceText, { color }]}>{title}</Text>
    </View>
  );
};

const Rating = ({ rating }) => {
  return (
    <View style={styles.rating}>
      {Array(5)
        .fill(0)
        .map((_, i) => {
          if (rating > i) {
            return (
              <AntDesign
                name="star"
                color="#FA8D00"
                style={{ marginRight: 5 }}
              />
            );
          }
          return <AntDesign name="staro" style={{ marginRight: 5 }} />;
        })}
    </View>
  );
};

export const CardHome = ({ title, info, noHeader, noFooter, book }) => {
  return (
    <View style={styles.cardContainer}>
      {!noHeader && <View style={styles.cardHeaderContaner}></View>}
      <View style={styles.cardBody}>
        <View style={styles.cardBodyTop}>
          <Image
            style={styles.cardAvatar}
            source={{
              uri:
                "https://images.theconversation.com/files/304957/original/file-20191203-66986-im7o5.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip",
            }}
          />
          <View style={styles.cardLeftSide}>
            <Text style={styles.tag}>{info.tag}</Text>
            <Text style={styles.cardName}>{info.name}</Text>
            <Text style={styles.cardTime}>{info.time}</Text>
            <Text style={styles.cardAddress}>{info.address}</Text>
            <Text style={styles.cardAddress}>{info.detail}</Text>
            {info.rating && <Rating rating={info.rating} />}
          </View>
        </View>
        {!noFooter && <View style={styles.margin} />}

        {!noFooter && (
          <View style={styles.cardBodyBottom}>
            <TouchableOpacity
              style={styles.cardGroupIcon}
              onPress={() => Linking.openURL("tel:" + `123-345-3421`)}
            >
              <Feather
                name="phone-call"
                size={24}
                style={{ color: "#87838B" }}
              />
              <Text style={styles.cardBottomTitle}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cardGroupIcon}
              onPress={() => Linking.openURL("sms:" + `123-345-3421`)}
            >
              <Fontisto name="email" size={24} style={{ color: "#87838B" }} />
              <Text style={styles.cardBottomTitle}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardGroupIcon}>
              <Fontisto
                name="email"
                size={24}
                style={{ color: "#87838B" }}
                onPress={() =>
                  Linking.openURL(
                    `mailto:TDhar@gmail.com?subject=Skin Disease Diagnosis`
                  )
                }
              />
              <Text style={styles.cardBottomTitle}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardGroupIcon}>
              <AntDesign
                name="calendar"
                size={24}
                style={{ color: "#87838B" }}
              />
              <Text style={styles.cardBottomTitle}>Consult</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>Fires Nearby</Text>
          <Text style={styles.desc}>View nearby fires</Text>
        </View>
        <CardHome
          title=""
          info={{
            name: "Dr T Pay Dhar",
            time: "Pinnacle Dermitology",
            address: "Dermatologists",
            rating: 4,
            detail: "Flint, MI 90293",
          }}
        />
        <CardHome
          title=""
          info={{
            name: "Dr Ayon Das",
            time: "Popular Pharma Limited",
            address: "Dermatologists",
            detail: "Bloomfield Hills, MI 48302",
            rating: 4,
          }}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  rating: {
    flexDirection: "row",
    marginTop: 5,
  },
  tag: {
    color: "#B066A4",
  },
  cardContainer: {
    padding: 15,
    paddingBottom: 0,
  },
  margin: {
    height: 1,
    backgroundColor: "#F0F1F2",
    width: "100%",
    marginVertical: 10,
  },
  cardBodyBottom: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardBottomTitle: {
    fontSize: 14,
    marginTop: 5,
    color: "#FF5934",
  },
  cardGroupIcon: {
    justifyContent: "center",
    alignItems: "center",
    color: "#6A63F6",
  },
  iconMore: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  iconLike: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  cardBody: {
    padding: 15,
    backgroundColor: "#000",
    marginTop: 15,
    borderRadius: 10,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardBodyTop: {
    flexDirection: "row",
  },
  cardLeftSide: {
    paddingHorizontal: 10,
    flex: 1,
  },
  cardName: {
    color: "#A8A8A8",
    fontSize: 18,
    fontWeight: "bold",
  },
  cardTime: {
    color: "#798497",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 5,
  },
  cardAddress: {
    color: "#798497",
    fontSize: 15,
    fontWeight: "500",
    marginTop: 5,
  },
  cardAvatar: {
    height: 60,
    width: 60,
    backgroundColor: "gray",
    borderRadius: 60,
  },
  cardHeaderContaner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardHeading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  cardMore: {
    fontWeight: "bold",
    color: "#7B6C95",
  },
  faceGroup: {
    justifyContent: "center",
    alignItems: "center",
  },
  faceContainer: {
    backgroundColor: "#000",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 20,
    marginHorizontal: 20,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 20,
  },
  faceText: {
    fontSize: 16,
    marginTop: 6,
  },

  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  headerContainer: {
    padding: 0,
    paddingHorizontal: 30,
    marginTop: 52,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  desc: {
    fontSize: 20,
    fontWeight: "400",
    color: "#798497",
    marginTop: 5,
  },
  buttonBooks: {
    flexDirection: "row",
    marginTop: 20,
  },
  btnGradient: {
    padding: 10,
    borderRadius: 40,
  },
  btnBookText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
});
