import * as React from 'react';
import { Component, ReactElement } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default class ShopHome extends React.Component {


  render() {
    return (

      <View style={styles.container}>

      <View style={{ paddingLeft: 20, paddingRight: 20, alignSelf: 'stretch', bottom: 20, }}>
      <TouchableOpacity style={ styles.button} onPress={() => this.props.navigation.navigate('Shopping',{name:this.props.route.params.name})}>
      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
      <FontAwesome5 name="list-ul" size={40} color="#e91e63" /> 
      <Text style={styles.btnText}>   Shopping List  </Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity style={ styles.button} onPress={() => this.props.navigation.navigate('RtsOptions')}>
      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
      <FontAwesome5 name="shopping-cart" size={40} color="#e91e63" /> 

      <Text style={styles.btnText}>   Real Time Shopping  </Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity style={ styles.button}>
      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
      <FontAwesome5 name="cart-plus" size={40} color="#e91e63" /> 
      <Text style={styles.btnText}>   Place orders  </Text>
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
      color: 'black',
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
      borderColor: '#e91e63',
      borderRadius: 5,
      padding: 10,
      //marginLeft: 28,
      //width: 330,
      alignItems: 'center',
      marginBottom:15,
    },
  });

