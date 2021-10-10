import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//function to display login/signup screens
//switches between sign up and login when "Sign in."/"Sign up." is pressed
function LoginScreen ({navigation}) {
  //state variables hold text currently residing in text entries
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  //except this one which holds whether user is logging in or signing up
  const [show, setShow] = useState(true);
  return (

      <View style={{flex: 1, justifyContent: "center", backgroundColor: "transparent"}}>
      {/*allows text boxes to move out of the way of the keyboard*/}
        <KeyboardAvoidingView style={{flex: 1, justifyContent: "center", alignItems: "center"}} behavior="padding">
          <LinearGradient colors={["#9EDE9E", "lightgrey"]} style={[styles.gradient]} start={[0,1]} end={[1,1]}/>
          <Image source={show ? (require("./assets/sign-up.png")) : (require("./assets/login.png"))} style={{height: 150, width: 150}}/>
          {/*First and last name hide themselves in login mode*/}
          {show ?(<TextInput style={[styles.loginInput]} placeholder="First Name:" onChangeText={setFirst} value={first}/>) : null}
          {show ?(<TextInput style={[styles.loginInput]} placeholder="Last Name:" onChangeText={setLast} value={last}/>): null}
          {/*email and password remain throughout both modes*/}
          <TextInput style={[styles.loginInput]} placeholder="Email:" onChangeText={setEmail} value={email}/>
          <TextInput style={[styles.loginInput]} placeholder="Password:" onChangeText={setPass} value={pass} secureTextEntry={true}/>
        </KeyboardAvoidingView>
        <Text style={{position: "absolute", bottom: "20%", alignSelf: "center"}}>{show ? "Returning user?" : "New user?"}</Text>
        <Text style={{position: "absolute", bottom: "16%", alignSelf: "center", color: "red"}} onPress={() => setShow(!show)}>{show ? "Sign in." : "Sign up."}</Text>
      </View>

  );
}

function StartScreen ({navigation}) { //function to display starting screen
  setTimeout(() => {navigation.navigate("Login")}, 2000);
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

  const Stack = createNativeStackNavigator(); //main app function, holds navigator
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Start" component={StartScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
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
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  loginInput: {
    height: 35,
    width: "50%",
    margin: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor:"black"
  },
});
