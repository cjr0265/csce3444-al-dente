//fonts: hotel, avenir
import { SearchScreen, ProfileScreen, HomePage, ChooseUserTypeScreen, LoginScreen, StartScreen } from './screens';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from '@use-expo/font';
import AppLoading from 'expo-app-loading';

function HomeTabs(){//holds screens that use a tab at the bottom to for navigation
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Profile') {
              iconName = 'person-circle-outline';
            } else if(route.name === 'Search'){
              iconName = 'search-outline'
            }
            return <Ionicons name={iconName} size={size} color={color}/>;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: false,
        })}
      >
       <Tab.Screen name="Search" component={SearchScreen} options={{headerShown: false}}/>
       <Tab.Screen name="Home" component={HomePage} options={{headerShown: false}}/>
       <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}}/>
    </Tab.Navigator>
  )
}

export default function App() {

  let [fontsLoaded] = useFonts({//loads in custom used fonts asynchronously
    'Tourney-Black': require('./assets/Tourney-Black.ttf'),
    'Tourney': require('./assets/Tourney-Regular.ttf'),
  });

  if(!fontsLoaded){//waits to start navigator until the fonts are loaded
    return <AppLoading/>;
  }
  
  const Stack = createNativeStackNavigator(); //main app function, holds navigator
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Start" component={StartScreen} options={{headerShown: false, gestureEnabled: false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false, gestureEnabled: false}}/>
        <Stack.Screen name="ChooseUserType" component={ChooseUserTypeScreen} options={{headerShown: false, gestureEnabled: false}}/>
        <Stack.Screen name="Homepage" component={HomeTabs} options={{headerShown: false, gestureEnabled: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

