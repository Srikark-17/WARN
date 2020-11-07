import React, {Component } from 'react'
import {View, Text, StyleShee, Dimensions, Modal, Share} from 'react-native'
import {Container, Header, Content, Body, Left, Icon, Right, Title, Button} from 'native-base'
import {WebView} from 'react-native-webview'
import ComponentButton from './Button'
const webViewHeight = Dimensions.get('window').height - 56;

// create a component
class ModalComponent extends Component {

    constructor(props) {
        super(props);
    }

    handleShare = () => {
        const {url, title} = this.props.articleData;
        message = `${title}\n\nRead More @${url}\n\nShared via Emergency Help App`;
        return Share.share(
            {title, message, url: message},
            {dialogTitle:`Share ${title}`}
        );
    }
    handleClose = () => {
        this.props.navigation.navigate('News Feed')
    }
    render() {
        const { showModal, articleData } = this.props;
        const { url } = articleData;
        if( url != undefined ) {
        return (
            <Modal
                animationType="slide"
                transparent
                visible={showModal}
                onRequestClose={this.handleClose}
            >
                <Container style={{marginBottom:0, backgroundColor:'#000'}}>
                    <Header style={{backgroundColor:'#000'}}>
                        <Left>
                        <ComponentButton/>
                        </Left>
                        <Body>
                            <Title children={articleData.title} style={{color: 'white'}}/>
                        </Body>
                        <Right>
                            <Button onPress={this.handleShare} transparent>
                                <Icon name="share" style={{color: '#ff5349', fontSize: 20}}/>
                            </Button>
                        </Right>
                    </Header>
                    <Content contentContainerStyle={{height: webViewHeight}}>
                        <WebView source={{uri:url}} style={{flex: 1}}
                        onError={this.handleClose} startInLoadingState
                        scalesPageToFit
                        />
                    </Content>
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