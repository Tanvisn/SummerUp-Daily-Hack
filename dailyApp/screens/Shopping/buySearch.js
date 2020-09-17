import  React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Picker, TextInput } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

export default class SearchShop extends React.Component {

   constructor(props){
    super(props);

    this.state={
      mode: "",
    };
  }

  render() {
    return (
      <View style={styles.container}>

      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', bottom:100, left:20 }}>
      <View style={styles.dropdown}>
      <Picker mode='dropdown' 
      style={styles.picker} 
      selectedValue={this.state.mode}
      onValueChange={(itemValue, itemIndex) => this.setState({ mode: itemValue })}>
      <Picker.Item label="Search by" value=""/>
      <Picker.Item label="City" value="Jn" />
      <Picker.Item label="Shop ID" value="Fb" />
      </Picker>
      </View>

      </View>

      <View style={{ flexDirection:'row', bottom:60, right:10 }}>

      <TextInput style={styles.textinput} placeholder="Search" 
       placeholderTextColor="black"
       underlineColorAndroid={'transparent'}/>

      <TouchableOpacity style={styles.button}>
      <Text style={styles.btntext}><Ionicons name="md-search" size={35} color="white" /></Text>
      </TouchableOpacity>

      </View>
      
      </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: 'white',
      padding: 30,
      backgroundColor: '#fff',
    },

    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },

     textinput: {
      color: 'black',
      fontSize: 18,
      width:300,
      height: 50,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft:10,
      marginBottom: 10,
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 20,
      textAlignVertical: "top",
      backgroundColor: 'rgba(255,255,255,0.6)',
    },

     dropdown: {
       color: 'black',
       width: 350,
       height: 50,
       paddingTop: 0,
       paddingBottom: 10,
       paddingLeft:0,
       marginTop: 10,
       marginBottom: 20,
       borderColor: 'black',
       borderWidth: 1,
       borderRadius: 20,
       textAlignVertical: "top",
       fontSize: 18,
       right: 30,
       backgroundColor: '#fff',
     },

    button: {
      width: 60,
      height:60,
      alignItems: 'center',
      padding: 10,
      paddingBottom:20,
      backgroundColor: '#e91e63',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 50,
      bottom:5,
      left: 10,
    },

    btntext: {
      color: '#fff',
      fontSize: 25,
      fontWeight: "bold",
    },

  });