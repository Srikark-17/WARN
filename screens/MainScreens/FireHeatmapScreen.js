import React from 'react'
import {StyleSheet} from 'react-native'
import {WebView} from 'react-native-webview'

const website = 'http://pre-lute.surge.sh'

export default class MLTool extends React.Component{
    render(){
        return(
            <WebView source={{ uri: 'http://pre-lute.surge.sh/index.html' }}  />
        )
    }
}