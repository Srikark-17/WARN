import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/MainScreens/HomeScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// import MyNotesAddImageNotesScreen from './screens/MainScreens/MyNotesAddImageNotesScreen'
import StartLectureScreen from "./screens/MainScreens/StartLecture";
import {
  Entypo,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import NearbyFiresScreen from "./screens/MainScreens/NearbyFires";
import SelectLectureScreen from "./screens/MainScreens/SelectLectureScreen";
import NewsFeed from "./screens/MainScreens/NewsFeed";
import ExportDetectedTextScreen from "./screens/MainScreens/ExportDetectedTextScreen";
import MyNotesAddImageScreen from "./screens/MainScreens/MyNotesAddImageNotesScreen";
import DiscussionsScreen from "./screens/MainScreens/DiscussionsScreen";
import AccessArchiveScreen from "./screens/MainScreens/AccessArchiveScreen";
import NotificationsScreen from "./screens/MainScreens/NotificationsScreen";
import ProblemSolverNavigator from "./screens/MainScreens/OptionsScreen";
import FireHeatmapScreen from './screens/MainScreens/FireHeatmapScreen'
import AQIHeatmapScreen from './screens/MainScreens/AQIHeatmap'
import PollenHeatmapScreen from './screens/MainScreens/PollenHeatmapScreen'
// import MyNotesDetectedTextScreen from "./screens/MainScreens/MyNotesDetectedText";
import AudioNotesScreen from "./screens/MainScreens/AudioNotesScreen";
import ImageNotesScreen from "./screens/MainScreens/CameraScreen";
import HomeScreen2 from "./screens/AuthScreens/HomeScreen";
import SplashScreen from "./screens/AuthScreens/SplashScreen";
import LoginScreen from "./screens/AuthScreens/TestLoginScreen";
import RegisterScreen from "./screens/AuthScreens/TestRegisterScreen";
import PollutionHeatmapScreen from './screens/MainScreens/PollutionHeatmap'
import OptionsScreen from "./screens/MainScreens/OptionsScreen";
import PollutionScreen from "./screens/MainScreens/PollutionScreen";
import PollenScreen from "./screens/MainScreens/PollenScreen";
import NewQuestionScreen from "./screens/MainScreens/NewQuestionScreen";
import AQScreen from "./screens/MainScreens/AirQualityScreen";
import Firebasekeys from "./config";
import * as firebase from "firebase";

import ImageResultScreen from "./screens/MainScreens/ImageResultScreen";
import ExportDetectedText from "./screens/MainScreens/MyNotesDetectedText";
import ProblemsScreen from "./screens/MainScreens/ProblemsScreen";

import "firebase/firestore";
import CameraScreen from "./screens/MainScreens/MyNotesAddImageNotesScreen";

let firebaseConfig = Firebasekeys;
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// import useNotifications from "../hooks/useNotifications";
const inactiveColor = '#8E8E8E'
const themecolor = '#2B2D2F'
const tabcolor = '#FF5349'
const Tab = createMaterialBottomTabNavigator();
const Auth = createStackNavigator();
const Home = createStackNavigator();
const Image = createStackNavigator();
const ArchiveNavigator = ({ navigation }) => {
  return (
    <Home.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Select Lecture"

    >
      <Home.Screen
        name="Export Detected Text"
        component={ExportDetectedTextScreen}
      />
      <Home.Screen name="Select Lecture" component={SelectLectureScreen} />

      <Home.Screen name="Start Lecture" component={StartLectureScreen} />
      <Home.Screen
        name="My Notes Add Image"
        component={MyNotesAddImageScreen}
      />
      {/* <Home.Screen
        name="My Notes Add Image Notes"
        component={MyNotesAddImageNotesScreen}
      />
      <Home.Screen
        name="My Notes Detected Text"
        component={MyNotesDetectedTextScreen}
      /> */}

      <Image.Screen name="Audio" component={AudioNotesScreen} />
      <Home.Screen name="Archive" component={AccessArchiveScreen} />
    </Home.Navigator>
  );
};
const Heatmaps = ({navigation}) => {
  return (
    <Image.Navigator
    
    
    initialRouteName="AQI Heatmap"
    >
    
    </Image.Navigator>
  )
}
const HomeScreenNavigator = ({ navigation }) => {
  return (
    <Image.Navigator
      screenOptions={{
          headerShown:false
        }}
      
      initialRouteName="Home Screen"
    >
      <Image.Screen name="Home Screen" component={HomeScreen2} />
      <Image.Screen
        name="Fire Screen"
        component={AQScreen}
      />
      <Image.Screen name="Manual Input" component={NotificationsScreen} />
      <Image.Screen name="Problem Results" component={ImageResultScreen} />
      <Image.Screen name="Pollen" component={PollenScreen} />
      <Image.Screen name="Pollution" component={PollenScreen} />
      <Image.Screen name="AQI Heatmap" component={AQIHeatmapScreen} options={{
        title: 'Heatmap',
          headerShown: true,
          headerStyle: {
            backgroundColor: `${themecolor}`
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#fff'
          },
          headerBackTitleStyle: {
            color: `${inactiveColor}`
          },
          headerTintColor: `${inactiveColor}`,
        }}/>
    <Image.Screen name="Pollen Heatmap" component={PollenHeatmapScreen} options={{
        title: 'Heatmap',
        headerShown: true,
          headerStyle: {
            backgroundColor: `${themecolor}`
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#fff'
          },
          headerBackTitleStyle: {
            color: `${inactiveColor}`
          },
          headerTintColor: `${inactiveColor}`,
        }}/>
    <Image.Screen name="Pollution Heatmap" component={PollutionHeatmapScreen} options={{
        title: 'Heatmap',
        headerShown: true,
          headerStyle: {
            backgroundColor: `${themecolor}`
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#fff'
          },
          headerBackTitleStyle: {
            color: `${inactiveColor}`
          },
          headerTintColor: `${inactiveColor}`,
        }}/>
      
      {/* <Home.Screen
        name="My Notes Add Image Notes"
        component={MyNotesAddImageNotesScreen}
      />
      <Home.Screen
        name="My Notes Detected Text"
        component={MyNotesDetectedTextScreen}
      /> */}
    </Image.Navigator>
  );
};

function MainTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Dashboard"
        sceneAnimationEnabled="true"
        activeColor={tabcolor}
        inactiveColor={inactiveColor}
        barStyle={{ backgroundColor: `${themecolor}`, bottomPadding: 10 }}
        shifting={true}
      >
        <Tab.Screen
          name="Dashboard"
          component={HomeScreenNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="view-dashboard"
                size={26}
                color={focused ? tabcolor : inactiveColor}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Entypo
                name="bell"
                size={24}
                color={focused ? tabcolor : inactiveColor}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Nearby Fires"
          component={NearbyFiresScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="fire"
                size={24}
                color={focused ? tabcolor : inactiveColor}
              />
            ),
          }}
        />
        <Tab.Screen
          name="News Feed"
          component={NewsFeed}
          options={{
            tabBarIcon: ({ focused }) => (
              <FontAwesome5
                name="newspaper"
                size={23}
                color={focused ? tabcolor : inactiveColor}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
function AuthNavigator() {
  return (
    <NavigationContainer>
      <Auth.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Auth.Screen name="Splash" component={SplashScreen} options={{}} />
        <Auth.Screen name="Login" component={LoginScreen} options={{}} />
        <Auth.Screen name="Register" component={RegisterScreen} options={{}} />
        {/* <Auth.Screen name="MainTabs" component={MainTabs}
       options={{
         headerTitle: "Complaint Form Submission",

       }}
    /> */}
      </Auth.Navigator>
    </NavigationContainer>
  );
}

export default function App2() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(); // Handle user state changes

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return <AuthNavigator />;
  }

  return <MainTabs />;
}