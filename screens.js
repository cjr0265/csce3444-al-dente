import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, Button, Dimensions, FlatList } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { SearchBar } from 'react-native-elements';
import filter from 'lodash.filter';
import { useIsFocused } from '@react-navigation/native';

const APIKEY = "AIzaSyAr0Rv7MLjkYl_a7vuKGrZkp4P7dqqEaGM";
let currentRoute = {//updated when route is selected in search
    name: "", 
    origin: "", 
    destination: ""
};

export function SearchScreen ({navigation}){

    const [type, setType] = useState(false);//holds whether user is searching for routes or for users
    const [userData, setUserData] = useState([]);//holds users currently displayed
    const [routeData, setRouteData] = useState([]);//holds routes currently displayed
    const [query, setQuery] = useState('');//holds user entered search text
    const fullUserData = [//holds all user data
        {
            id: '1',
            first: "Camden",
            last: "Williams",
            email: "camdenwilliams2@my.unt.edu"

        },
        {
            id: '2',
            first: "Michelle",
            last: "Cabrales",
            email: "michellecabrales@my.unt.edu"
        },
        {
            id: '3',
            first: "Grayson",
            last: "Baker",
            email: "graysonbaker@my.unt.edu"
        },
        {
            id: '4',
            first: 'Cooper',
            last: 'Rondinelli',
            email: 'cooperondinelli@my.unt.edu'
        },
    ];

    const fullRouteData = [//holds all route data
        {
            name: 'Discovery Park to UNT Student Union',
            origin: 'UNT Discovery Park',
            destination: 'UNT Student Union'
        },
        {
            name: 'Murder Kroger to Apogee',
            origin: 'Kroger University Denton',
            destination: 'Apogee Stadium'
        },
        {
            name: 'TWU to Thrift Giant',
            origin: 'TWU Denton',
            destination: 'Thrift Giant Denton'
        },
    ];

    const handleRouteSearch = text =>{//route search handler
        const formattedQuery = text.toLowerCase();//converts input text to lowercase
        const filteredData = filter(fullRouteData, route => {
            return routeContains(route, formattedQuery);
        });
        setRouteData(filteredData);//updates displayed route data
        setQuery(text);//updates search box with input text
    }

    const routeContains = ({ name, origin, destination}, query) => {//checks data to see if it matches query
        name = name.toLowerCase();
        origin = origin.toLowerCase();
        destination = destination.toLowerCase();

        if (query === ''){
            return false;
        }

        if (name.includes(query) || origin.includes(query) || destination.includes(query)){
            return true;
        }
        return false;
    };

    const handleUserSearch = text => {//same as above but for users
        const formattedQuery = text.toLowerCase();
        const filteredData = filter(fullUserData, user => {
          return userContains(user, formattedQuery);
        });
        setUserData(filteredData);
        setQuery(text);
      };
      
      const userContains = ({ id, first, last, email }, query) => {//same as above but for users
        first = first.toLowerCase();
        last = last.toLowerCase();
        email = email.toLowerCase();
        if (query === ''){
            return false;
        }
        if (first.includes(query) || id.includes(query) || last.includes(query) || email.includes(query)) {
          return true;
        }
      
        return false;
      };

    return(
        <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
            <View style={{flex: 1, flexDirection: "column"}}>
                {/* search bar changes with type button */}
                { type ?  (<SearchBar
                    onChangeText={queryText => handleUserSearch(queryText)}
                    value={query}
                    platform="ios"
                    autoCorrect={false}
                />) : (<SearchBar
                    onChangeText={queryText => handleRouteSearch(queryText)}
                    value={query}
                    platform="ios"
                    autoCorrect={false}
                />)}
                
                {/* button to swap between user and routes search*/}
                <TouchableOpacity onPress={() => setType(!type)}>
                    <View style = {{backgroundColor: "lightgray", alignItems: "center", padding: 20, margin: 10}}>
                        <Text style={{fontFamily: "Avenir"}}>{type ? "Current search: user" : "Current search: route"}</Text>
                    </View>
                </TouchableOpacity>
                {/*Data is array with data to be displayed, renderItem is function that is called for each individual entry in the list
                Flatlist changes with type button*/}
                {type ? (<FlatList
                    data={userData}
                    keyExtractor={item => item.id}
                    renderItem={({item})=>{
                        return(
                            <TouchableOpacity onPress={() => {alert("Profile selected!")}} >
                                <View style={{
                                    flex: 1,
                                    padding: 20,
                                    marginVertical: 8,
                                    marginHorizontal: 16,
                                    backgroundColor: "#9EDE9E"}}
                                >
                                    <Text style={{fontFamily: "Avenir"}}>{item.first + ' ' + item.last}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />) : (<FlatList
                    data={routeData}
                    keyExtractor={item => item.name}
                    renderItem={({item})=>{
                        return(
                            <TouchableOpacity onPress={() => {
                                currentRoute.origin = item.origin;
                                currentRoute.destination = item.destination;
                                navigation.navigate("Home");
                                }}>
                                <View style={{
                                    flex: 1,
                                    padding: 20,
                                    marginVertical: 8,
                                    marginHorizontal: 16,
                                    backgroundColor: "#9EDE9E"}}
                                >
                                    <Text style={{fontFamily: "Avenir"}}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />)}
            </View>
        </SafeAreaView>
    );
}

export function ProfileScreen ({navigation}){
    return(
        <SafeAreaView style={{flex: 1}}>
            <View style={{left: "5%", justifyContent: "flex-end", top: "5%"}}>
                <Text style={{fontFamily: "Avenir", color: "black", fontSize: 30, fontWeight: "bold"}}>Profile</Text>
            </View>
                    
            <Image source={require("./assets/Profile-Avatar.png")} resizeMode="contain" style={{height: 125, width: 125, top: "5%"}}/>
            
            <View style={{top: "10%"}}>
                <Text style={[styles.profileTextGrey]}>First Name</Text>
                <Text style={[styles.profileTextBlack]}>Alice</Text>  
            </View>

        
            <View style={{top: "10%"}}>
                <View style={[styles.separator]} />
                <Text style={[styles.profileTextGrey]}>Last Name</Text>
                <Text style={[styles.profileTextBlack]}>Bob</Text>
            </View>

            <View style={{top: "10%"}}>
                <View style={[styles.separator]} />
                <Text style={[styles.profileTextGrey]}>Email Address</Text>
                <Text style={[styles.profileTextBlack]}>alicebob@my.unt.edu</Text>
            </View>

            <View style={{top: "10%"}}>
                <View style={[styles.separator]} />
                <Text style={[styles.profileTextGrey]}>Password</Text>
                <Text style={[styles.profileTextBlack]}>••••••••••</Text>
            </View>

            <View style={{top: "10%"}}>
                <View style={[styles.separator]} />
            </View>   
        </SafeAreaView>  
    );
}

export function HomePage ({navigation}){//pretty basic, has variables for navigation when it is properly implemented

    useIsFocused();

    return(
        <View style={{flex: 1}}>
            <MapView style={{
                width: Dimensions.get('window').width, 
                height: Dimensions.get('window').height
            }}
            region={{//allows map to load straight to Denton
                latitude: 33.2148,
                longitude: -97.1331,
                latitudeDelta: 0.15,
                longitudeDelta: 0.15
            }}>
                <MapViewDirections 
                origin={currentRoute.origin}
                destination={currentRoute.destination}
                apikey={APIKEY}
                strokeWidth={3}
                strokeColor="hotpink"/>
            </MapView>
        </View>
    );
}

export function ChooseUserTypeScreen ({navigation}) {//displays screen for signing up as a rider or a driver
    return (
        <SafeAreaView style={{flex: 1}}>
            {/* container */}
            <LinearGradient colors={["#9EDE9E", "lightgrey"]} style={[styles.gradient]} start={[0,1]} end={[1,1]}/>
            <Image source={require("./assets/UNTlogo.png")} resizeMode="contain" style={{height: 150, width: 150, position: "absolute", left: "60%", top: "5%"}}/>
            <View style={{flex: 1, alignItems: "center"}}>
                <Text style={[styles.logoChooseUser]}>{"EAGLE                     "}</Text>
                <Text style={[styles.logoChooseUser]}>RIDES</Text>
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
                    {/*replace onPress function with proper back-end ones when ready*/}
                    <TouchableOpacity onPress={() => navigation.navigate("Homepage")} style={{flex: 1}}>
                        <Image source={require("./assets/rider.png")} resizeMode = "contain" style={{flex: 1, maxWidth: "20%"}}/>
                    </TouchableOpacity>
                </View>
                {/*view for spacing*/}
                <View style={{flex: 1}}/>
                <View style={{flex: 5, alignItems: "center"}}>
                    <Text style={{fontFamily: "Avenir", color: "gray", fontSize: 30, fontWeight: "bold"}}>Driver?</Text>
                    {/*replace onPress function with proper back-end ones when ready*/}
                    <TouchableOpacity onPress={() => navigation.navigate("Homepage")} style={{flex: 1}}>
                        <Image source={require("./assets/newDriver.png")} resizeMode = "contain" style={{flex: 1, alignSelf: "center", maxWidth: "20%"}}/>
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
export function LoginScreen ({navigation}) {
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

export function StartScreen ({navigation}) { //function to display starting screen
    setTimeout(() => {navigation.navigate("Login")}, 2000);
    return (
        <View style={[styles.container]}>
            <View style={{ flex: 6, backgroundColor: "white", alignItems: "flex-end"}}>
            {/*adds space to top of screen*/}
                <View style={{height: "5%"}}/>
                {/*displays UNT logo*/}
                <View style={{height: "23%", width: "33%"}}>
                    <Image source={require("./assets/UNTlogo.png")} resizeMode="contain" style={{width: "100%", height: "100%"}} />
                </View>
                <View style={{alignSelf: "center"}}>
                {/*eagle rides text*/}
                    <Text style={[styles.logoStartScreen]}>EAGLE        </Text>
                    <Text style={[styles.logoStartScreen]}>         RIDES</Text>
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


export const styles = StyleSheet.create({
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
    searchInput: {
        height: 35,
        width: 250,
        margin: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderColor:"black",
        fontFamily: "Avenir",
    },
    logoStartScreen: {
        fontFamily: "Tourney-Black", 
        color: "green", 
        fontSize: 65, 
        fontWeight: "bold"
    },
    logoChooseUser: {
        fontFamily: "Tourney", 
        color: "black", 
        flex: 1, 
        fontSize: 40, 
        fontWeight: "bold", 
        paddingBottom: 60
    },
     profileTextGrey: {
        fontFamily: "Avenir",
        color: "grey",
        fontSize: 14,
        left: "3%"     
    },
    profileTextBlack: {
        fontFamily: "Avenir",
        color: "black",
        fontSize: 14,
        left: "3%"
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: 1
    },    
});
