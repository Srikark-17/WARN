import React, { useState, useEffect } from "react";
import MapView, {Marker} from 'react-native-maps';
import * as Location from "expo-location";
import { StyleSheet, Text, View, Dimension, ActivityIndicator, Dimensions} from 'react-native';

export default function App({navigation}) {
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [fires, setFires] = useState([]);
  let exampleArray = {markers: [{
    title: 'hello',
    coordinates: {
      latitude: 3.148561,
      longitude: 101.652778
    },
  },
  {
    title: 'hello',
    coordinates: {
      latitude: 3.149771,
      longitude: 101.655449
    },  
  }]}

  let mapMarkers = () => {
    return fires.map((report) => <Marker
      key={report.id}
      coordinate={{ latitude: report.geometry[0].coordinates[0], longitude: report.geometry[0].coordinates[1]}}
      title={report.title}
      description={report.sources.url}
    >
    </Marker >)
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if(status === 'granted'){
        let location = await Location.getCurrentPositionAsync({});
        setLongitude(location.coords.longitude)
        setLatitude(location.coords.latitude);
      }
      else{
        <ActivityIndicator/>
      }
      fetch (`https://eonet.gsfc.nasa.gov/api/v3/events?category=wildfires`).then((response) => response.json()).then((res) => {     
      setFires(res.events)
      console.log(res.events)
      console.log('exiting Use Effect')
    })
    })();
  }, []);
  return (latitude && latitude) ? (
    <View style={styles.container}>
        <MapView style={styles.map} 
        initialRegion={{latitude, longitude, latitudeDelta: 1, longitudeDelta: 1}}
        >
            {mapMarkers()}
        </MapView>
    </View>
  ) : <ActivityIndicator/>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});