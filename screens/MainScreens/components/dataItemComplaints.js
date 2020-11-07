import React, {Component} from 'react';
import { ListItem, Left, Right, Thumbnail, Body, View, Text, Button } from 'native-base';
import {Image} from 'react-native'
import {GoToButton} from './DetailsButton'

export class DataItem extends Component {
    state={
      userComplaints: [],
    }
    constructor(props) {
        super(props);
        this.data = props.data;
    }

    handlePress = () => {
      //go to different screen
    }

    getUserComplaintsHandler = () => {
      fetch(`https://emergencyhelper-b6c9e.firebaseio.com/OmJoshi.json`)
        .then(res => res.json())
        .then (parsedRes => {
          const complaintsArray =[];
          for (const key in parsedRes){
            complaintsArray.push({
                submissionStatus: true,
                victim: '',
                title: '',
                location: '',
                time: '',
                description: '', 
                victimizer: '',
                profession: '', 
                id: key,
            })
          }
          this.setState({
            userComplaints: complaintsArray,
          })
        })
        .catch(err => console.log(err))
      console.log(this.state.userComplaints)
    }

    render() {
        return(
            <ListItem thumbnail>
            <Left>
              <Image style={{height: 100,
    width: 100,
    // Set border width.
    borderWidth: 1,
    
    // Set border Hex Color code here.
    borderColor: '#fee11a',
    
    // Set border Radius.
    borderRadius: 10}}source={require('./../../assets/OmJoshi.jpeg')}/>
            </Left>
              <Body>
                <Text numberOfLines={2}>Cashier Refused To Offer Me Service At Kroger</Text>
                <Text note numberOfLines={2}>I went to Kroger and I was denied service by the cashier due to the apparent reason that </Text>
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 8, marginLeft: 0 }}>
                    <Text note>Om Joshi</Text>
                </View>
              </Body>
              <Right>
                {/* <Button transparent onPress={this.getUserComplaintsHandler} >
                  <Text>View</Text>
                </Button> */}
                <GoToButton/>
              </Right>
            </ListItem>
        );
    }
}

export default DataItem;