import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import * as WebBrowser from 'expo-web-browser'
import { useLinking } from '@react-navigation/native';

export default class ListThumbnailExample extends Component {
  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: 'https://www.ctsweep.com/blog/wp-content/uploads/2012/08/house-fire.jpg' }} />
              </Left>
              <Body>
                <Text>Fire</Text>
                <Text note numberOfLines={1}>Follow these procedures to be prepared in the event of a fire.</Text>
              </Body>
              <Right>
                <Button transparent onPress={() => WebBrowser.openBrowserAsync('https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/fire/home-fire-preparedness.html')}>
                  <Text>Read</Text>
                </Button>
              </Right>
              
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{uri: 'https://cms.qz.com/wp-content/uploads/2019/07/AP_19189530661968-e1562605962816.jpg'}}/>
              </Left>
              <Body>
                <Text>Flood</Text>
                <Text note numberOfLines={1}>Follow these procedures in order to be prepared in the event of a flood.</Text>
              </Body>
              <Right>
                <Button transparent onPress={() => WebBrowser.openBrowserAsync('https://www.ready.gov/floods')}>
                  <Text>Read</Text>
                </Button>
              </Right>
              
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{uri: 'https://bsj.berkeley.edu/wp-content/uploads/2018/04/0_JOQKGAUfFda2Dy0Q.jpg'}}/>
              </Left>
              <Body>
                <Text>Earthquakes</Text>
                <Text note numberOfLines={1}>Follow these procedures in order to be prepared in the event of an Earthquake.</Text>
              </Body>
              <Right>
                <Button transparent onPress={() => WebBrowser.openBrowserAsync('https://www.ready.gov/earthquakes')}>
                  <Text>Read</Text>
                </Button>
              </Right>
              
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{uri: 'https://cdn.britannica.com/48/123848-050-92824F8A/Cyclone-Catarina-International-Space-Station-Brazil-March-2004.jpg'}}/>
              </Left>
              <Body>
                <Text>Cyclones/Typhoons</Text>
                <Text note numberOfLines={1}>Follow these procedures in order to be prepared in the event of a Cyclones or Typhoon.</Text>
              </Body>
              <Right>
                <Button transparent onPress={() => WebBrowser.openBrowserAsync('https://www.abc.net.au/news/emergency/plan-for-an-emergency/cyclone/')}>
                  <Text>Read</Text>
                </Button>
              </Right>
              
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{uri: 'https://www.amnh.org/var/ezflow_site/storage/images/media/tornado-leading-image/1666587-1-eng-US/tornado-leading-image.jpg'}}/>
              </Left>
              <Body>
                <Text>Tornadoes/Hurricanes</Text>
                <Text note numberOfLines={1}>Follow these procedures prior to and during the event of a tornado.</Text>
              </Body>
              <Right>
                <Button transparent onPress={() => WebBrowser.openBrowserAsync('https://www.ready.gov/hurricanes')}>
                  <Text>Read</Text>
                </Button>
              </Right>
            </ListItem>
            <ListItem thumbnail>
             <Left>
                <Thumbnail square source={{uri: 'https://snowbrains.com/wp-content/uploads/2017/08/02-groundhog-day-blizzard-2011-min.jpg'}}/>
              </Left>
              <Body>
                <Text>Blizzards</Text>
                <Text note numberOfLines={1}>Follow these procedures prior to and during the event of a blizzard</Text>
              </Body>
              <Right>
                <Button transparent onPress={() => WebBrowser.openBrowserAsync('https://www.ready.gov/winter-weather')}>
                  <Text>Read</Text>
                </Button>
              </Right>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{uri: 'https://www.statnews.com/wp-content/uploads/2020/02/Coronavirus-CDC-768x432.jpg'}}/>
              </Left>
              <Body>
                <Text>COVID-19</Text>
                <Text note numberOfLines={1}>Follow these procedures in order to protect yourself and others from the CoronaVirus.</Text>
              </Body>
              <Right>
                <Button transparent onPress={() => WebBrowser.openBrowserAsync('https://www.ready.gov/pandemic')}>
                  <Text>Read</Text>
                </Button>
              </Right>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{uri: 'https://ichef.bbci.co.uk/news/320/media/images/67670000/jpg/_67670455_011556095.jpg'}}/>
              </Left>
              <Body>
                <Text>Tsunamis</Text>
                <Text note numberOfLines={1}>Follow these procedures in order to be prepared in the event of a Tsunami.</Text>
              </Body>
              <Right>
                <Button transparent onPress={() => WebBrowser.openBrowserAsync('https://www.ready.gov/tsunamis')}>
                  <Text>Read</Text>
                </Button>
              </Right>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{uri: 'https://media.pri.org/s3fs-public/styles/story_main/public/story/images/storm.png'}}/>
              </Left>
              <Body>
                <Text>Tropical Storms</Text>
                <Text note numberOfLines={1}>Follow these procedures in order to be prepared in the event of a tropical storm.</Text>
              </Body>
              <Right>
                <Button transparent onPress={() => WebBrowser.openBrowserAsync('https://www.ready.gov/severe-weather')}>
                  <Text>Read</Text>
                </Button>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}