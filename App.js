//fonts: hotel, avenir
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, Button, Dimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapView from 'react-native-maps';
import { useFonts } from '@use-expo/font';
import AppLoading from 'expo-app-loading';

function SearchScreen ({navigation}){//placeholder for now
  return(
    <Text style={{position: 'absolute', top: "50%", left: '50%'}}>Placeholder search screen</Text>
  );
}

function ProfileScreen ({navigation}){//placeholder for now
  return(
    <Text style={{position: 'absolute', top: "50%", left: '50%'}}>Placeholder profile screen</Text>
  );
}

function HomePage ({navigation}){//pretty basic, has an interactive map but you can't do anything with it yet
  return(
    <View style={{flex: 1}}>
      <MapView style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}/>
    </View>
  );
}

function ChooseUserTypeScreen ({navigation}) {//displays screen for signing up as a rider or a driver
  return (
    <SafeAreaView style={{flex: 1}}>
    {/* container */}
      <LinearGradient colors={["#9EDE9E", "lightgrey"]} style={[styles.gradient]} start={[0,1]} end={[1,1]}/>
      <Image source={require("./assets/UNTlogo.png")} resizeMode="contain" style={{height: 150, width: 150, position: "absolute", left: "60%", top: "5%"}}/>
      <View style={{flex: 1, alignItems: "center"}}>
        <Text style={{fontFamily: "Tourney", color: "black", flex: 1, fontSize: 40, fontWeight: "bold", paddingBottom: 60}}>{"EAGLE                     "}</Text>
        <Text style={{fontFamily: "Tourney", color: "black", flex: 1, fontSize: 40, fontWeight: "bold", paddingBottom:40}}>RIDES</Text>
      </View>
      {/* Text with views for spacing*/}
      <View style={{flex: 3, alignItems: "center", justifyContent: "flex-end"}}>
        <Text style={{fontFamily: "Avenir", color: "gray", fontSize: 30, fontWeight: "bold"}}>Are you a...</Text>
      </View>
      <View style={{flex:1}}/>
      {/*view contains both icons with labels*/}
      <View style={{flex: 4, alignItems: "center"}}>
        <View style={{flex: 5, alignItems: "center"}}>
          <Text style={{fontFamily: "Avenir", color: "gray", fontSize: 30, fontWeight: "bold"}}>Rider?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Homepage")} style={{flex: 1}}>
            <Image source={require("./assets/rider.png")} resizeMode = "contain" style={{flex: 1}}/>
          </TouchableOpacity>
        </View>
        {/*view for spacing*/}
        <View style={{flex: 1}}/>
        <View style={{flex: 5, alignItems: "center"}}>
          <Text style={{fontFamily: "Avenir", color: "gray", fontSize: 30, fontWeight: "bold"}}>Driver?</Text>
          {/*replace onPress function with proper back-end ones when ready*/}
          {/*replace this image with the proper driver image later*/}
          <TouchableOpacity onPress={() => navigation.navigate("Homepage")} style={{flex: 1}}>
            <Image source={require("./assets/rider.png")} resizeMode = "contain" style={{flex: 1}}/>
          </TouchableOpacity>
        </View>
      </View>
      {/*View for spacing*/}
      <View style={{flex: 1}}/>
    </SafeAreaView>
  );
}

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
          <Button title="Continue" color="red" onPress={() => show ? navigation.navigate("ChooseUserType") : navigation.navigate("Homepage")}/>
        </KeyboardAvoidingView>
        <Text style={{fontFamily: "Avenir", position: "absolute", top: "80%", alignSelf: "center", fontWeight: "bold", color: "dimgray", fontSize: 17}}>{show ? "Returning user?" : "New user?"}</Text>
        <Text style={{fontFamily: "Avenir", position: "absolute", top: "84%", alignSelf: "center", fontWeight: "bold", color: "dimgray", textDecorationLine: "underline"}} onPress={() => setShow(!show)}>{show ? "Sign in." : "Sign up."}</Text>
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
          {/*eagle rides text*/}
          <Text style={{fontFamily: "Tourney-Black", color: "green", fontSize: 65, fontWeight: "bold"}}>EAGLE        </Text>
          <Text style={{fontFamily: "Tourney-Black", color: "green", fontSize: 65, fontWeight: "bold"}}>         RIDES</Text>
        </View>
        <View style={{height: "35%", width: "40%", alignSelf: "center"}}>
          {/*displays car image, using a random one I found online for now*/}
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

  let [fontsLoaded] = useFonts({
    'Tourney-Black': require('./assets/Tourney-Black.ttf'),
    'Tourney': require('./assets/Tourney-Regular.ttf'),
  });

  if(!fontsLoaded){
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
    borderBottomColor:"black",
    fontFamily: "Avenir"
  },
});
