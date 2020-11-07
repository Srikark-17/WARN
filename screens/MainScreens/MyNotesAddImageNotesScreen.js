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

  takePicture = async (lectureDocName) => {
    if (this.camera) {
      const options = { base64: true };
      let photo = await this.camera.takePictureAsync(options);
      // console.log(photo.base64)

      this.props.navigation.navigate("My Notes Detected Text", {
        photoUrl: photo.uri,
        base64: photo.base64,
        lectureName: lectureDocName
      });
    }
  };

  pickImage = async (lectureDocName) => {
    const options = { base64: true };
    let result = await ImagePicker.launchImageLibraryAsync(options, {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    // console.log(result);
    if (result.uri) {
      this.props.navigation.navigate("My Notes Detected Text", {
        photoUrl: result.uri,
        base64: result.base64,
        lectureName: lectureDocName
      });
    }
  };

  render() {
    const { navigation } = this.props;
    const lectureDocName = navigation.getParam('lectureName', 'ERRORORO');
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
                onPress={() => this.pickImage(lectureDocName)}
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
                onPress={() => this.takePicture(lectureDocName)}
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
