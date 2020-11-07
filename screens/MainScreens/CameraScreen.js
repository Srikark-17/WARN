import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

let photo = "";

export default class CameraScreen extends React.Component {
  state = {
    hasPermission: null,
    cameraType: Camera.Constants.Type.back,
  };

  async componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    // Camera roll Permission
    if (Platform.OS === "ios") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
    // Camera Permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === "granted" });
  };

  handleCameraType = () => {
    const { cameraType } = this.state;

    this.setState({
      cameraType:
        cameraType === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back,
    });
  };

  convertToText = async (base64) => {
    // console.log(base64) AIzaSyAIA3jtKQ53UKPASvejcHd4Rn4C1wjCGdY
    try {
      let googleVisionRes = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=" +
          "AIzaSyCeprBOdyQsSEoQw4g2AGQ_dLHIL18W6RU",
        {
          method: "POST",
          body: JSON.stringify({
            requests: [
              {
                image: {
                  content: base64,
                },
                features: [{ type: "DOCUMENT_TEXT_DETECTION"}],
              },
            ],
          }),
        }
      );
      let json = await googleVisionRes.json();
      // const { image, info, name, wiki } = json;
      console.log(json);

      // try {
      //   let arr = json["responses"][0]["landmarkAnnotations"];
      //   for (var i = 0; i < arr.length; i++) {
      //     if (/[a-z]/i.test(arr[i]["description"]) === true) {
      //       name = arr[i]["description"];
      //       break;
      //     }
      //   }
      //   if (name === "") {
      //     // console.log("None of the responses in english");
      //     name = arr[0]["description"];
      //   }
      // } catch (error) {
      //   setVisible(false);
      //   navigation.navigate("ResultsScreen", {
      //     name: "No Data Available",
      //     image:
      //       "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
      //     text: "No information available",
      //     url: "https://google.com",
      //   });
      //   return;
      // }
    } catch (error) {
      console.log(error)
    }
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { base64: true };
      let photo = await this.camera.takePictureAsync(options);
      // console.log(photo.base64)
      this.convertToText(photo.base64)
      this.props.navigation.navigate("ImageResultScreen", {
        photoUrl: photo.uri,
        base64: photo.base64,
      });
    }
  };

  pickImage = async () => {
    const options = { base64: true };
    let result = await ImagePicker.launchImageLibraryAsync(options, {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    // console.log(result);
    if (result.uri) {
      this.props.navigation.navigate("ImageResultScreen", {
        photoUrl: result.uri,
        base64: result.base64,
      });
    }
  };

  render() {
    const { hasPermission } = this.state;
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else if (photo !== "") {
      return <Text>Hello</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.cameraType}
            ref={(ref) => {
              this.camera = ref;
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                margin: 30,
              }}
            >
              <TouchableOpacity
                style={{
                  position: "absolute",
                  alignSelf: "flex-start",
                  left: "2.5%",
                  bottom: "4%",
                }}
                onPress={() => this.pickImage()}
              >
                <Ionicons
                  name="ios-photos"
                  style={{ color: "#fff", fontSize: 60 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                }}
                onPress={() => this.takePicture()}
              >
                {/* <FontAwesome
                  name="camera"
                  style={{ color: "#fff", fontSize: 40 }}
                /> */}
                <View
                  style={{
                    backgroundColor: "white",
                    width: 90,
                    height: 90,
                    borderRadius: 45,
                    borderWidth: 10,
                    borderColor: "silver",
                    bottom: 30,
                  }}
                ></View>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}
