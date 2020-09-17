import 'react-native-gesture-handler';
import * as React from "react";
import { StyleSheet,Text, View, TouchableOpacity, Picker, TextInput, ImageBackground, Image, Alert, Platform } from "react-native";
import { NavigationContainer, CommonActions } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';
import{ Button } from 'react-native-elements';
import AdHome from './AdHome.js';
import Notifications from './Notifications.js';
import {DrawerMenu} from './../components/drawer.js';
import LoadingHomes from './LoadingHome.js';
import Constants from 'expo-constants';
import { url } from './../components/url';

export default class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: "",
      pass: "",
      age: 0
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.storeInAsync = this.storeInAsync.bind(this);
  }

  storeInAsync = async(res) =>{
    await AsyncStorage.setItem('auth_data', JSON.stringify({
      age: res.age,
      name: this.state.name,
      fname: res.fName,
      lname: res.lName,
      email: res.email
    }));
  }
  handleLogin(){

/*    if(Platform.OS === 'ios' || Platform.OS === 'android'){
      this.storeInAsync();

      this.props.navigation.dispatch(
        CommonActions.reset({
          
        routes: [
                  {name: 'Login'} , 
                  { name: 'loading',params: {age: this.state.age, name:this.state.name}},
                ],  
      }));
    }
    else{*/
    //send data to backend
    //Alert.alert("hiii");
    console.log(Date.now());
    const param1=this.state.name;
    const param2=this.state.pass;
    
    fetch(url+'/login',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName:param1,
        password:param2
      })
    })

    //recieve login confirmation and age from backend
    .then((response) => (response.json()))
    
    .then((res) => {
      console.log("response");
      //console.warn(res);
      //Alert.alert(res.message);
      //if login successful
      if(res.success === true){
        //this.state.age=3;
        if(Platform.OS === 'ios' || Platform.OS === 'android'){
          this.storeInAsync(res);
        }
        else{
        localStorage.setItem('auth_data', JSON.stringify({
        //age: this.state.age,
        name: this.state.name
      }));
      }  
        this.props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
        routes: [
                  {name: 'Login'} , 
                  { name: 'loading',params: {age: res.age, name:this.state.name}},
                ],  
      }));
      }
      else {
        alert("Incorrect Username or Password");
        //console.warn("Incorrect Username or Password");
      }
    })
    
    .catch(err => {
      console.log(err);
    });
//  }
  //  this.props.navigation.navigate('loading', {age: this.state.age});
  }

  render(){
  return (
    <ImageBackground
   source={require('./../assets/loginPage5.png')}
   style={styles.back}>
   <View style={styles.container}>
   <TextInput
   style={styles.input}
   underlineColorAndroid="transparent"
   placeholder="Username"
   placeholderTextColor="black"
   autoCapitalize="none"
   onChange = {(e) => this.setState({ name: e.nativeEvent.text})}
   />
   <TextInput
   style={styles.input}
   underlineColorAndroid="transparent"
   placeholder="Password"
   placeholderTextColor="black"
   autoCapitalize="none"
   secureTextEntry={true}
   onChange = {(e) => this.setState({ pass: e.nativeEvent.text})}
   />
   <TouchableOpacity style={ styles.button } onPress={this.handleLogin}>
   <Text style={ styles.buttonText }>Login </Text>
   </TouchableOpacity>
   <TouchableOpacity style={ styles.button } onPress={() => this.props.navigation.navigate('signup')}>
   <Text style={ styles.buttonText }>Sign Up </Text>
   </TouchableOpacity>
   </View>
   </ImageBackground>
   );
}
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   alignSelf: 'stretch',
   alignItems: 'center',
   backgroundColor: 'rgba(255,255,255,0.3)',
   justifyContent: 'center',
   paddingLeft: 60,
   paddingRight: 60,
 },
 button: {
   /*alignItems: "center",
    paddingVertical: 10,
    margin: 5,
    paddingHorizontal: 15,
    borderRadius: 25,*/
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    //backgroundColor: '#2ba189',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },

  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },

  back: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  input: {
   color: 'black',
   alignSelf: 'stretch',
   height: 40,
   paddingTop: 10,
   paddingBottom: 10,
   paddingLeft:10,
   marginBottom: 20,
   borderBottomColor: 'black',
   borderBottomWidth: 1,
     //borderRadius: 5,
     textAlignVertical: "top",
     //backgroundColor: 'rgba(255,255,255,0.6)',
   },
 });