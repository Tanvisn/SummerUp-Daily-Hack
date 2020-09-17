import  React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Picker, TextInput } from 'react-native';
import Constants from 'expo-constants';

export default class AddDeleteItems extends React.Component {
  constructor(props){
    super(props);

    this.state={
      mode: "",
    };
  }

  render() {
    return (
      <View style={styles.container}>

      <View style={{ justifyContent: 'flex-start', bottom: 10, right:10 }}>
     
      <TextInput style={styles.textinput} placeholder="Product Name" 
      placeholderTextColor="black"
      underlineColorAndroid={'transparent'}/>

      <TextInput style={styles.textinput} placeholder="Brand Name" 
      placeholderTextColor="black"
      underlineColorAndroid={'transparent'}/>
     
      <TextInput style={styles.textinput} placeholder="Amount Sold" 
      placeholderTextColor="black"
      underlineColorAndroid={'transparent'}/>
     

      </View>


      <TouchableOpacity style={styles.button}>
      <Text style={styles.btntext}>Save sales </Text>
      </TouchableOpacity>

      
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 8,
    backgroundColor: '#fff',
  },

  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  picker: {
    height: 50, 
        // width: 220,
        alignSelf: 'stretch',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        //borderRadius: 5,
        //backgroundColor: 'rgba(255,255,255,0.6)',
      },

      dropdown: {
       color: 'black',
       width: 220,
       height: 50,
       paddingTop: 0,
       paddingBottom: 10,
       paddingLeft:0,
       marginTop: 10,
       marginBottom: 20,
       borderColor: 'black',
       borderWidth: 1,
       borderRadius: 5,
       textAlignVertical: "top",
       fontSize: 18,
       left: 20,
       backgroundColor: '#fff',
     },

     textinput: {
      color: 'black',
      fontSize: 18,
      width: 330,
      height: 50,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft:10,
      marginBottom: 20,
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 5,
      textAlignVertical: "top",
      top: 10,
      left: 40,
      backgroundColor: '#fff',
    },

    button: {
      width: 300,
      height:60,
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#e91e63',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 5,
      bottom: 10,
      left: 40,
    },

    btntext: {
      color: '#fff',
      fontSize: 20,
      fontWeight: "bold",
    },



  });