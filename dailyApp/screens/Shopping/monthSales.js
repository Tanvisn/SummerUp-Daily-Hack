import  React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Picker, TextInput } from 'react-native';
import Constants from 'expo-constants';

export default class MonthSales extends React.Component {
  constructor(props){
    super(props);

    this.state={
      mode: "",
    };
  }

  render() {
    return (
      <View style={styles.container}>

      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', bottom: 50, right:10 }}>
      <View style={styles.dropdown}>
      <Picker mode='dropdown' 
      style={styles.picker} 
      selectedValue={this.state.mode}
      onValueChange={(itemValue, itemIndex) => this.setState({ mode: itemValue })}>
      <Picker.Item label="Select a Month" value=""/>
      <Picker.Item label=" January" value="Jn" />
      <Picker.Item label="February" value="Fb" />
      <Picker.Item label="March" value="Mr" />
      <Picker.Item label="April" value="Ap" />
      <Picker.Item label="May" value="My" />
      <Picker.Item label="June" value="Jn" />
      <Picker.Item label="July" value="Jl" />
      <Picker.Item label="August" value="Ag" />
      <Picker.Item label="September" value="St" />
      <Picker.Item label="October" value="Ot" />
      <Picker.Item label="November" value="Nv" />
      <Picker.Item label="December" value="Dc" />
      </Picker>
      </View>

      <TextInput style={styles.textinput} placeholder="Enter a Year" 
      placeholderTextColor="black"
      underlineColorAndroid={'transparent'} keyboardType={'numeric'}/>
      </View>

      <TouchableOpacity style={styles.button}>
      <Text style={styles.btntext}>Get Records  </Text>
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
      backgroundColor: '#fff',
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
      bottom: 50,
      left: 60,
    },

    btntext: {
      color: '#fff',
      fontSize: 20,
      fontWeight: "bold",
    },



  });