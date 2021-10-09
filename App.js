import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function StartScreen ({Navigator}) { //function to display starting screen
  return (
    <View style={[styles.container]}>
      <View style={{ flex: 6, backgroundColor: "white", alignItems: "flex-end"}} >
      {/*adds space to top of screen*/}
        <View style={{height: "5%"}}/>
        {/*displays UNT logo*/}
        <View style={{height: "23%", width: "33%"}}>
          <Image source={require("./assets/UNTlogo.png")} resizeMode="contain" style={{width: "100%", height: "100%"}} />
        </View>
        <View style={{alignSelf: "center"}}>
          {/*eagle rides text, will change font later or change to image*/}
          <Text style={{color: "green", fontSize: 65, fontWeight: "bold"}}>Eagle        </Text>
          <Text style={{color: "green", fontSize: 65, fontWeight: "bold"}}>         Rides</Text>
        </View>
        <View style={{height: "35%", width: "40%", alignSelf: "center"}}>
          {/*displays car image, using a random one i found online for now*/}
          <Image source={require("./assets/car.jpg")} resizeMode="contain" style={{width: "100%", height: "100%"}}/>
        </View>
      </View>
      {/*displays green squares*/}
      <View style={[styles.subContainer]} >
        <View style={[styles.square1]}/>
        <View style={[styles.square2]}/>
        <View style={[styles.square1]}/>
        <View style={[styles.square2]}/>
      </View>
      <View style={[styles.subContainer]}>
        <View style={[styles.square2]}/>
        <View style={[styles.square1]}/>
        <View style={[styles.square2]}/>
        <View style={[styles.square1]}/>
      </View>
    </View>
  );
}

export default function App() {

  const Stack = createNativeStackNavigator(); //navigator, will be used when more screens are added
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{headerShown: false}}
          />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  subContainer: {
    flex: 1,
    flexDirection: "row"
  },
  square1: {
    flex: 1,
    backgroundColor: "#C5E5C5",
  },
  square2: {
    flex: 1,
    backgroundColor: "#9EDE9E",
  },
});
