import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
} from "native-base";
import { getArticles } from "./components/feedNews";
import { Alert, View, ActivityIndicator, StyleSheet } from "react-native";
import { DataItem } from "./components/dataItemNews";
import Modal from "./components/modal";
export default class ListThumbnailExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      data: null,
      setModalVisible: false,
      modalArticleData: {},
    };
  }

  handleItemDataOnPress = (articleData) => {
    this.setState({
      setModalVisible: true,
      modalArticleData: articleData,
    });
  };

  handleModalClose = () => {
    this.setState({
      setModalVisible: false,
      modalArticleData: {},
    });
  };

  componentDidMount() {
    getArticles().then(
      (data) => {
        this.setState({
          isLoading: false,
          data: data,
        });
      },
      (error) => {
        Alert.alert("Failure.", "Please try again.");
      }
    );
  }

  render() {
    let view = this.state.isLoading ? (
      <View>
        <ActivityIndicator animating={this.state.isLoading} />
        <Text style={{ marginTop: 15 }}>Loading...</Text>
      </View>
    ) : (
      <List
        dataArray={this.state.data}
        renderRow={(item) => {
          return (
            <DataItem
              onClose={this.props.navigation.navigate("News Feed")}
              onPress={this.handleItemDataOnPress}
              data={item}
            />
          );
        }}
      />
    );

    return (
      <Container>
        <Content style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>News Feed</Text>
            <Text style={styles.subtext}>Results for: wildfires</Text>
          </View>
          {view}
        </Content>
        <Modal
          showModal={this.state.setModalVisible}
          articleData={this.state.modalArticleData}
          onClose={this.state.handleModalClose}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  title: {
    fontFamily: "Avenir",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    top: 0,
  },
  textContainer: {
    padding: 10,
    top: 15,
    zIndex: 100,
  },
  subtext: {
    color: "#798497",
    fontFamily: "Avenir",
    fontSize: 18,
    textAlign: "center",
    top: 0,
  },
});
