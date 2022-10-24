import * as React from 'react'
import { useNavigation } from '@react-navigation/native';
import {Container, Header, Content, Body, Left, Icon, Right, Title, Button} from 'native-base'

export default function CloseButton() {
    const navigation = useNavigation();
  return (
      <Button onPress={() => navigation.navigate('News Feed')} transparent>
        <Icon name="close" style={{color: '#ff5349', fontSize: 35}}/>
    </Button>
  );
}