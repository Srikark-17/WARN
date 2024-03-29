import React, { Component } from "react";
import { Dimensions, Modal, Share } from "react-native";
import {
  Container,
  Header,
  Body,
  Left,
  Icon,
  Right,
  Title,
  Button,
} from "native-base";

import ComponentButton from "./Button";

// create a component
class ModalComponent extends Component {
  constructor(props) {
    super(props);
  }

  handleShare = () => {
    const { url, title } = this.props.articleData;
    message = `${title}\n\nRead More @${url}\n\nShared via Emergency Help App`;
    return Share.share(
      { title, message, url: message },
      { dialogTitle: `Share ${title}` }
    );
  };
  handleClose = () => {
    this.props.navigation.navigate("News Feed");
  };
  render() {
    const { showModal, articleData } = this.props;
    const { url } = articleData;
    if (url != undefined) {
      return (
        <Modal
          animationType="slide"
          transparent
          visible={showModal}
          onRequestClose={this.handleClose}
        >
          <Container style={{ marginBottom: 0, backgroundColor: "#000" }}>
            <Header style={{ backgroundColor: "#000" }}>
              <Left>
                <ComponentButton />
              </Left>
              <Body>
                <Title
                  children={articleData.title}
                  style={{ color: "white" }}
                />
              </Body>
              <Right>
                <Button onPress={this.handleShare} transparent>
                  <Icon
                    name="share"
                    style={{ color: "#ff5349", fontSize: 20 }}
                  />
                </Button>
              </Right>
            </Header>
          </Container>
        </Modal>
      );
    } else {
      return null;
    }
  }
}

//make this component available to the app
export default ModalComponent;
