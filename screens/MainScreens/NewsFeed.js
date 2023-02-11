import React, { Component } from "react";
import { Container, Content, List, Text } from "native-base";
import { getArticles } from "./components/feedNews";
import { Alert, View, ActivityIndicator, StyleSheet } from "react-native";
import { DataItem } from "./components/dataItemNews";
import Modal from "./components/modal";
import { HP, WP } from "../../config/responsive";

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
              like={true}
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
            <Text style={styles.subtext}>Results for: wildfire</Text>
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
    fontSize: HP(4.74),
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  textContainer: {
    paddingVertical: HP(1.18),
    paddingHorizontal: WP(2.56),
    top: HP(1.78),
    zIndex: 100,
  },
  subtext: {
    color: "#798497",
    fontFamily: "Avenir",
    fontSize: HP(2.13),
    textAlign: "center",
  },
});
