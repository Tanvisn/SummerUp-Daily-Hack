import * as React from 'react';
import { Component, ReactElement } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default class RtsOptions extends React.Component {


  render() {
    return (

      <View style={styles.container}>

      <View style={{ flexDirection: 'row', alignItems: 'center', bottom: 150, left: 170, }}>
      <MaterialIcons name="shopping-cart" size={60} color="#e91e63" />
      </View>

       <View style={{ flexDirection: 'row', alignItems: 'center', bottom: 130, left: 30, }}>
      <Text style={styles.btnTextTitle}>Choose Operating Mode   </Text>
      </View>

      <View style={{ paddingLeft: 20, paddingRight: 20, alignSelf: 'stretch', bottom: 20, }}>
      <TouchableOpacity style={ styles.button} onPress={() => this.props.navigation.navigate('Buy')}>
      <View style={{ alignItems: 'center', right:20, }}>
      <Text style={styles.btnText}>   Buy </Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity style={ styles.button} onPress={() => this.props.navigation.navigate('Sell')}>
      <View style={{ alignItems: 'center', right:20 }}>
      <Text style={styles.btnText}>   Sell </Text>
      </View>
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

    btnText: {
      fontSize: 25,
      fontWeight: "700",
      color: '#1e555c',
    },

    btnTextTitle: {
      fontSize: 28,
      fontWeight: "700",
      color: '#1e555c',
    },


    img: {
      width: 40,
      height: 40,
    },

    imgTitle: {
      width: 50,
      height: 50,
    },


    button: {
      borderWidth: 2,
      borderColor: 'rgba(30, 85, 92, 0.5)',
      borderRadius: 5,
      padding: 10,
      //marginLeft: 28,
      //width: 330,
      alignItems: 'center',
      marginBottom:20,
    },
  });

