import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  Entypo,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import NearbyFiresScreen from "./screens/MainScreens/NearbyFires";
import NewsFeed from "./screens/MainScreens/NewsFeed";
import NotificationsScreen from "./screens/MainScreens/NotificationsScreen";
import AQIHeatmapScreen from "./screens/MainScreens/AQIHeatmap";
import PollenHeatmapScreen from "./screens/MainScreens/PollenHeatmapScreen";
import HomeScreen2 from "./screens/AuthScreens/HomeScreen";
import SplashScreen from "./screens/AuthScreens/SplashScreen";
import LoginScreen from "./screens/AuthScreens/TestLoginScreen";
import RegisterScreen from "./screens/AuthScreens/TestRegisterScreen";
import PollutionHeatmapScreen from "./screens/MainScreens/PollutionHeatmap";
import PollenScreen from "./screens/MainScreens/PollenScreen";
import AQScreen from "./screens/MainScreens/AirQualityScreen";
import Firebasekeys from "./config";
import * as firebase from "firebase";

import "firebase/firestore";

let firebaseConfig = Firebasekeys;
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const inactiveColor = "#8E8E8E";
const themecolor = "#2B2D2F";
const tabcolor = "#FF5349";
const Tab = createMaterialBottomTabNavigator();
const Auth = createStackNavigator();
const Image = createStackNavigator();

const HomeScreenNavigator = ({ navigation }) => {
  return (
    <Image.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home Screen"
    >
      <Image.Screen name="Home Screen" component={HomeScreen2} />
      <Image.Screen name="Fire Screen" component={AQScreen} />
      <Image.Screen name="Manual Input" component={NotificationsScreen} />
      <Image.Screen name="Problem Results" component={ImageResultScreen} />
      <Image.Screen name="Pollen" component={PollenScreen} />
      <Image.Screen name="Pollution" component={PollenScreen} />
      <Image.Screen
        name="AQI Heatmap"
        component={AQIHeatmapScreen}
        options={{
          title: "Heatmap",
          headerShown: true,
          headerStyle: {
            backgroundColor: `${themecolor}`,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            color: "#fff",
          },
          headerBackTitleStyle: {
            color: `${inactiveColor}`,
          },
          headerTintColor: `${inactiveColor}`,
        }}
      />
      <Image.Screen
        name="Pollen Heatmap"
        component={PollenHeatmapScreen}
        options={{
          title: "Heatmap",
          headerShown: true,
          headerStyle: {
            backgroundColor: `${themecolor}`,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            color: "#fff",
          },
          headerBackTitleStyle: {
            color: `${inactiveColor}`,
          },
          headerTintColor: `${inactiveColor}`,
        }}
      />
      <Image.Screen
        name="Pollution Heatmap"
        component={PollutionHeatmapScreen}
        options={{
          title: "Heatmap",
          headerShown: true,
          headerStyle: {
            backgroundColor: `${themecolor}`,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            color: "#fff",
          },
          headerBackTitleStyle: {
            color: `${inactiveColor}`,
          },
          headerTintColor: `${inactiveColor}`,
        }}
      />
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
