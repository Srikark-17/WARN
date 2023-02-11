import React, { Component } from "react";
import * as WebBrowser from "expo-web-browser";
import {
  ListItem,
  Left,
  Right,
  Thumbnail,
  Body,
  View,
  Text,
  Button,
} from "native-base";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as firebase from "firebase";

export class DataItem extends Component {
  constructor(props) {
    super(props);
    this.data = props.data;
    this.like = props.like;
    this.state = {
      isLiked: false,
    };
  }

  handlePress = () => {
    const { url, title } = this.data;
    //this.props.onPress({url, title});
    WebBrowser.openBrowserAsync(`${url}`);
  };

  handleLike = () => {
    this.setState({
      isLiked: true,
    });
    firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid)
      .set({
        title: this.data.title,
        description: this.data.description,
        source: {
          name: this.data.source.name,
        },
        urlToImage: this.data.urlToImage,
      });
  };

  render() {
    const heartColor = "#FF5349";

    return (
      <ListItem thumbnail>
        <Left>
          <Thumbnail
            square
            source={{
              uri:
                this.data.urlToImage != null
                  ? this.data.urlToImage
                  : "https://cdn.theatlantic.com/media/img/photo/2022/07/photos-wildfires-rage-across-southw/a01_1241970129-1/original.jpg",
            }}
          />
        </Left>
        <Body>
          <Text style={{ color: "#fff" }} numberOfLines={1}>
            {this.data.title}
          </Text>
          <Text></Text>
          <Text note numberOfLines={3}>
            {this.data.description}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginTop: 8,
              marginLeft: 0,
            }}
          >
            <Text note>{this.data.source.name}</Text>
          </View>
        </Body>
        <Right>
          <View style={styles.shareContainer}>
            {this.like ? (
              this.state.isLiked ? (
                <TouchableWithoutFeedback onPress={this.handleLike}>
                  <FontAwesome name="heart" size={18} color={heartColor} />
                </TouchableWithoutFeedback>
              ) : (
                <TouchableWithoutFeedback onPress={this.handleLike}>
                  <FontAwesome name="heart" size={18} color={"#D3D3D3"} />
                </TouchableWithoutFeedback>
              )
            ) : (
              <View />
            )}

            <Button transparent onPress={this.handlePress}>
              <Text style={{ color: "#FF5349" }}>View</Text>
            </Button>
          </View>
        </Right>
      </ListItem>
    );
  }
}

export default DataItem;

const styles = StyleSheet.create({
  shareContainer: {
    alignItems: "center",
  },
});
