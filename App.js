import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import NearbyFiresScreen from "./screens/MainScreens/NearbyFires";
import NewsFeed from "./screens/MainScreens/NewsFeed";
import HomeScreen from "./screens/AuthScreens/HomeScreen";
import SplashScreen from "./screens/AuthScreens/SplashScreen";
import LoginScreen from "./screens/AuthScreens/TestLoginScreen";
import RegisterScreen from "./screens/AuthScreens/TestRegisterScreen";
import MapScreen from "./screens/MainScreens/MapScreen";
import Firebasekeys from "./config";
import { LogBox } from "react-native";
import * as firebase from "firebase";

import "firebase/firestore";
import "firebase/database";
import { HP } from "./config/responsive";
import AccountScreen from "./screens/MainScreens/AccountScreen";

const ignoreWarns = [
  "Setting a timer for a long period of time",
  "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation",
  "ViewPropTypes will be removed",
  "AsyncStorage has been extracted from react-native",
  "EventEmitter.removeListener",
];
const warn = console.warn;
// console.warn = (...arg) => {
//   for (let i = 0; i < ignoreWarns.length; i++) {
//     if (arg[0].startsWith(ignoreWarns[i])) return;
//   }
//   warn(...arg);
// };

LogBox.ignoreLogs(ignoreWarns);

let firebaseConfig = Firebasekeys;
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const inactiveColor = "#8E8E8E";
const themecolor = "#2B2D2F";
const tabcolor = "#FF5349";
const Tab = createMaterialBottomTabNavigator();
const Auth = createStackNavigator();
const Fires = createStackNavigator();
const FireMap = createStackNavigator();

const FireMaps = ({ navigation }) => {
  return (
    <FireMap.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: themecolor,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
      initialRouteName="Map Screen"
    >
      <FireMap.Screen
        name="Map Screen"
        component={MapScreen}
        options={{
          headerBackTitleVisible: false,
        }}
      />
    </FireMap.Navigator>
  );
};

const FireScreenNavigator = ({ navigation }) => {
  return (
    <Fires.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: themecolor,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
      initialRouteName="Nearby Fires Screen"
    >
      <Fires.Screen
        name="Nearby Fires Screen"
        component={NearbyFiresScreen}
        options={{
          headerBackTitleVisible: false,
        }}
      />
      <Fires.Screen name="Map Screen" component={FireMaps} />
    </Fires.Navigator>
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
        barStyle={{ backgroundColor: `${themecolor}`, height: HP(8.89) }}
        shifting={true}
      >
        <Tab.Screen
          name="Dashboard"
          component={HomeScreen}
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
          name="Nearby Fires"
          component={FireScreenNavigator}
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
        <Tab.Screen
          name="Account"
          component={AccountScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="account"
                size={26}
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
