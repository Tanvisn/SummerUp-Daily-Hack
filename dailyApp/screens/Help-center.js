import  React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

export default class HelpCenter extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <View style={{ bottom: 80, }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', top: 30, }}>
      <Text style={ styles.inputM }>Worried About Your Mental Health?</Text>
      </View>
      <View style={{ right: 10, top: 20, alignItems: 'center', }}>
      <TouchableOpacity style={styles.EditnavButtonM}><Text style={styles.navButtonTextSpecial}>Contact</Text></TouchableOpacity>
      </View>

      <View style={{ alignItems: 'center', justifyContent: 'center', top: 30, }}>
      <Text style={ styles.inputD }>Know a case of Domestic Violence?</Text>
      </View>
      <View style={{ right: 10, top: 20, alignItems: 'center', }}>
      <TouchableOpacity style={styles.EditnavButtonD}><Text style={styles.navButtonTextSpecial}>Report Here</Text></TouchableOpacity>
      </View>
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
    borderWidth: 2,
    borderRadius: 5,
    margin: 5,

  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },


  EditnavButtonM: {

    marginBottom: 30,
    backgroundColor: 'rgb(29, 53, 87)', 
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },


  EditnavButtonD: {

    marginTop: 5,
    backgroundColor: 'rgb(29, 53, 87)', 
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },

  navButtonTextSpecial: {
    fontSize: 18,

    color: 'white',
  },

  inputM: {
    color: 'black',
    alignSelf: 'stretch',
    paddingTop: 10,
    marginBottom: 5, 
    textAlignVertical: "top",
    fontWeight: "700",
    fontSize: 20,
    width: 400,
    height: 70,

  },

  inputD: {
    color: 'black',
    alignSelf: 'stretch',
    paddingTop: 10,
    marginTop: 50, 
    textAlignVertical: "top",
    fontWeight: "700",
    fontSize: 20,
    width: 400,
    height: 70,

  },


});