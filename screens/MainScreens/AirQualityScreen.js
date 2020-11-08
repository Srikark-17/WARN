import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Button,
} from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";

let percent = 80;

let propStyle = (percent, base_degrees) => {
  const rotateBy = base_degrees + percent * 3.6;
  return {
    transform: [{ rotateZ: `${rotateBy}deg` }],
  };
};

let renderThirdLayer = (percent) => {
  if (percent > 50) {
    return (
      <View
        style={[styles.secondProgressLayer, propStyle(percent - 50, 45)]}
      ></View>
    );
  } else {
    return <View style={styles.offsetLayer}></View>;
  }
};

function WelcomeScreen({ navigation }) {
  LayoutAnimation.easeInEaseOut();

  let firstProgressLayerStyle;
  if (percent > 50) {
    firstProgressLayerStyle = propStyle(50, -135);
  } else {
    firstProgressLayerStyle = propStyle(percent, -135);
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Air Quality</Text>
      </View>
      <View style={styles.noteContainer}>
        <View style={styles.circleContainer1}>
          <View style={styles.progressLayer1}></View>
          <View style={styles.offsetLayer1}></View>
        </View>
        <Text
          style={{ color: "white", left: 230, bottom: 33, fontWeight: "800" }}
        >
          25%
        </Text>
        <Text style={{ left: 220, color: "#798497" }}>Subtext</Text>
        <TouchableOpacity onPress={() => navigation.navigate("News Feed")}>
          <Button
            color={"#798497"}
            title={""}
            onPress={() => navigation.navigate("Archive")}
          />
          <MaterialIcons
            name="location-on"
            size={20}
            style={{ color: "#FF5934", bottom: 50, right: 35 }}
          />
          <Text
            style={{ color: "#798497", bottom: 115, fontSize: 20, right: 30 }}
          >
            Location
          </Text>
          <Text
            style={{
              color: "#798497",
              bottom: 100,
              fontSize: 25,
              right: 30,
              paddingLeft: 20,
            }}
          >
            Los Angeles, CA
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.noteContainer}>
        <View style={styles.circleContainer1}>
          <View style={styles.progressLayer1}></View>
          <View style={styles.offsetLayer1}></View>
        </View>
        <Text
          style={{ color: "white", left: 230, bottom: 33, fontWeight: "800" }}
        >
          25%
        </Text>
        <Text style={{ left: 220, color: "#798497" }}>Subtext</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Archive")}>
          <Button
            color={"#798497"}
            title={""}
            onPress={() => navigation.navigate("Archive")}
          />
          <MaterialIcons
            name="location-on"
            size={20}
            style={{ color: "#FF5934", bottom: 50, right: 35 }}
          />
          <Text
            style={{ color: "#798497", bottom: 115, fontSize: 20, right: 30 }}
          >
            Location
          </Text>
          <Text
            style={{
              color: "#798497",
              bottom: 100,
              fontSize: 25,
              right: 30,
              paddingLeft: 20,
            }}
          >
            Los Angeles, CA
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.noteContainer}>
        <View style={styles.circleContainer1}>
          <View style={styles.progressLayer1}></View>
          <View style={styles.offsetLayer1}></View>
        </View>
        <Text
          style={{ color: "white", left: 230, bottom: 33, fontWeight: "800" }}
        >
          25%
        </Text>
        <Text style={{ left: 220, color: "#798497" }}>Subtext</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Archive")}>
          <Button
            color={"#798497"}
            title={""}
            onPress={() => navigation.navigate("Archive")}
          />
          <MaterialIcons
            name="location-on"
            size={20}
            style={{ color: "#FF5934", bottom: 50, right: 35 }}
          />
          <Text
            style={{ color: "#798497", bottom: 115, fontSize: 20, right: 30 }}
          >
            Location
          </Text>
          <Text
            style={{
              color: "#798497",
              bottom: 100,
              fontSize: 25,
              right: 30,
              paddingLeft: 20,
            }}
          >
            Los Angeles, CA
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.noteContainer}>
        <View style={styles.circleContainer1}>
          <View style={styles.progressLayer1}></View>
          <View style={styles.offsetLayer1}></View>
        </View>
        <Text
          style={{ color: "white", left: 230, bottom: 33, fontWeight: "800" }}
        >
          25%
        </Text>
        <Text style={{ left: 220, color: "#798497" }}>Subtext</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Archive")}>
          <Button
            color={"#798497"}
            title={""}
            onPress={() => navigation.navigate("Archive")}
          />
          <MaterialIcons
            name="location-on"
            size={20}
            style={{ color: "#FF5934", bottom: 50, right: 35 }}
          />
          <Text
            style={{ color: "#798497", bottom: 115, fontSize: 20, right: 30 }}
          >
            Location
          </Text>
          <Text
            style={{
              color: "#798497",
              bottom: 100,
              fontSize: 25,
              right: 30,
              paddingLeft: 20,
            }}
          >
            Los Angeles, CA
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.noteContainer}>
        <View style={styles.circleContainer1}>
          <View style={styles.progressLayer1}></View>
          <View style={styles.offsetLayer1}></View>
        </View>
        <Text
          style={{ color: "white", left: 230, bottom: 33, fontWeight: "800" }}
        >
          25%
        </Text>
        <Text style={{ left: 220, color: "#798497" }}>Subtext</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Archive")}>
          <Button
            color={"#798497"}
            title={""}
            onPress={() => navigation.navigate("Archive")}
          />
          <MaterialIcons
            name="location-on"
            size={20}
            style={{ color: "#FF5934", bottom: 50, right: 35 }}
          />
          <Text
            style={{ color: "#798497", bottom: 115, fontSize: 20, right: 30 }}
          >
            Location
          </Text>
          <Text
            style={{
              color: "#798497",
              bottom: 100,
              fontSize: 25,
              right: 30,
              paddingLeft: 20,
            }}
          >
            Los Angeles, CA
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.noteContainer}>
        <View style={styles.circleContainer1}>
          <View style={styles.progressLayer1}></View>
          <View style={styles.offsetLayer1}></View>
        </View>
        <Text
          style={{ color: "white", left: 230, bottom: 33, fontWeight: "800" }}
        >
          25%
        </Text>
        <Text style={{ left: 220, color: "#798497" }}>Subtext</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Archive")}>
          <Button
            color={"#798497"}
            title={""}
            onPress={() => navigation.navigate("Archive")}
          />
          <MaterialIcons
            name="location-on"
            size={20}
            style={{ color: "#FF5934", bottom: 50, right: 35 }}
          />
          <Text
            style={{ color: "#798497", bottom: 115, fontSize: 20, right: 30 }}
          >
            Location
          </Text>
          <Text
            style={{
              color: "#798497",
              bottom: 100,
              fontSize: 25,
              right: 30,
              paddingLeft: 20,
            }}
          >
            Los Angeles, CA
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  circleContainer1: {
    left: 220,
    width: 50,
    height: 50,
    borderWidth: 5,
    borderRadius: 100,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
  progressLayer1: {
    width: 50,
    height: 50,
    borderWidth: 5,
    borderRadius: 100,
    position: "absolute",
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "#FF5349",
    borderTopColor: "#FF5349",
    transform: [{ rotateZ: "-45deg" }],
  },
  offsetLayer1: {
    width: 50,
    height: 50,
    borderWidth: 5,
    borderRadius: 100,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "grey",
    borderTopColor: "grey",
    transform: [{ rotateZ: "-135deg" }],
  },
  circleContainer2: {
    left: 80,
    top: 275,
    width: 50,
    height: 50,
    borderWidth: 5,
    borderRadius: 100,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  progressLayer2: {
    width: 50,
    height: 50,
    borderWidth: 5,
    borderRadius: 100,
    position: "absolute",
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "#FF5349",
    borderTopColor: "#FF5349",
    transform: [{ rotateZ: "45deg" }],
  },
  offsetLayer2: {
    width: 50,
    height: 50,
    borderWidth: 5,
    borderRadius: 100,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "grey",
    borderTopColor: "grey",
    transform: [{ rotateZ: "220deg" }],
  },
  circleContainer3: {
    left: 275,
    bottom: 10,
    width: 50,
    height: 50,
    borderWidth: 5,
    borderRadius: 100,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  progressLayer3: {
    width: 50,
    height: 50,
    borderWidth: 5,
    borderRadius: 100,
    position: "absolute",
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "#FF5349",
    borderTopColor: "#FF5349",
    transform: [{ rotateZ: "55deg" }],
  },
  offsetLayer3: {
    width: 50,
    height: 50,
    borderWidth: 5,
    borderRadius: 100,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "grey",
    borderTopColor: "grey",
    transform: [{ rotateZ: "240deg" }],
  },
  firstProgressLayer: {
    width: 50,
    height: 50,
    borderWidth: 5,
    borderRadius: 100,
    position: "absolute",
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "#FF5349",
    borderTopColor: "#FF5349",
    transform: [{ rotateZ: "-135deg" }],
  },
  secondProgressLayer: {
    width: 50,
    height: 50,
    position: "absolute",
    borderWidth: 5,
    borderRadius: 100,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "#FF5349",
    borderTopColor: "#FF5349",
    transform: [{ rotateZ: "45deg" }],
  },
  offsetLayer: {
    width: 50,
    height: 50,
    position: "absolute",
    borderWidth: 5,
    borderRadius: 100,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "black",
    borderTopColor: "black",
    transform: [{ rotateZ: "-135deg" }],
  },
  fireContainer: {
    padding: 10,
    height: 60,
    width: 60,
    marginRight: 20,
    borderRadius: 100,
    backgroundColor: "#FF5349",
  },
  fire: {
    left: -2,
    bottom: 3,
    color: "orange",
  },
  windContainer: {
    padding: 10,
    height: 60,
    width: 60,
    marginRight: 20,
    borderRadius: 100,
    backgroundColor: "#89CFF0",
  },
  wind: {
    left: -2,
    bottom: 3,
    color: "white",
  },
  flowerContainer: {
    padding: 10,
    height: 60,
    width: 60,
    borderRadius: 100,
    backgroundColor: "#7EC850",
  },
  flower: {
    color: "#FCC200",
  },
  factoryContainer: {
    padding: 10,
    height: 60,
    width: 60,
    borderRadius: 100,
    marginLeft: 20,
    backgroundColor: "#6F7691",
  },
  factory: {
    left: -2,
    bottom: 3,
    color: "black",
  },
  noteContainer: {
    top: 100,
    marginLeft: 30,
    paddingTop: 10,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: "#2B2D2F",
    borderRadius: 12,
    width: 350,
    height: 120,
    zIndex: 0,
    marginBottom: 10,
  },
  bicardOne: {
    top: 50,
    marginLeft: 30,
    paddingTop: 10,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: "#2B2D2F",
    borderRadius: 12,
    width: 160,
    height: 170,
    zIndex: 0,
  },
  bicardTwo: {
    bottom: 235,
    marginLeft: 220,
    paddingTop: 10,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: "#2B2D2F",
    borderRadius: 12,
    width: 160,
    height: 170,
    zIndex: 0,
  },
  optionsContainer: {
    bottom: 200,
    marginLeft: 30,
    paddingTop: 10,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: "#2B2D2F",
    borderRadius: 12,
    width: 350,
    height: 150,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    zIndex: 0,
  },
  circle: {
    borderRadius: 20,
    backgroundColor: "orange",
  },
  title: {
    fontFamily: "Avenir",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    top: 75,
  },
  textContainer: {
    padding: 10,
    top: 15,
    zIndex: 100,
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});

export default WelcomeScreen;
