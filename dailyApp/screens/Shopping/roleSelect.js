import  React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Picker, TextInput, Alert } from 'react-native';
import Constants from 'expo-constants';

export default class RoleSelect extends React.Component {
  constructor(props){
    super(props);

    this.state={
      mode: "",
    };
  }

  showAlert1() {  
    Alert.alert(  
      'ALERT',  
      'Do You Want To Continue?',  
      [  
      {  
        text: 'Cancel',  
        onPress: () => console.log('Cancel Pressed'),  
        style: 'cancel',  
      },  
      {text: 'OK', onPress: () => console.log('OK Pressed')},  
      ]  
      );  
  }  

  render() {
    return (
      <View style={styles.container}>

      <View>

      <View style={{ bottom:130, left:5, paddingLeft:10, paddingRight:10, }}>
      <Text style={{ color:"red", fontSize:20, fontWeight:"bold" }}>Once a choice is made, the user can not edit the selection.</Text>
      </View>

      <View style={{ justifyContent: 'flex-start', bottom: 100, }}>
      <View style={styles.dropdown}>
      <Picker mode='dropdown' 
      style={styles.picker} 
      selectedValue={this.state.mode}
      onValueChange={(itemValue, itemIndex) => this.setState({ mode: itemValue })}>
      <Picker.Item label="Choose a Role" value=""/>
      <Picker.Item label="Buy" value="1" />
      <Picker.Item label="Sell" value="2" />
      <Picker.Item label="Buy and Sell" value="3" />
      
      </Picker>
      </View>

      </View>

      <TouchableOpacity style={styles.button} onPress={this.showAlert1}>
      <Text style={styles.btntext}>Submit</Text>
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
     width: 350,
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
     backgroundColor: '#FCEDEE',
   },

   textinput: {
    color: 'black',
    fontSize: 18,
    width: 130,
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
    left: 30,
    backgroundColor: 'rgba(91, 12, 39,0.3)',
  },

  button: {
    width: 250,
    height:60,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#e91e63',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    bottom: 100,
    left: 80,
  },

  btntext: {
    color: '#fff',
    fontSize: 20,
    fontWeight: "bold",
  },



});