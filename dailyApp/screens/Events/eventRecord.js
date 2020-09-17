import  React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default class EventHome extends React.Component {
  render() {
    return (
       <ImageBackground
        source={require('../../assets/eveBackground.png')}
        style={styles.back}
        >
      <View style={styles.container}>

      <View style={{ flexDirection: 'row', alignItems: 'center', bottom: 150, left: 170}}>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('EveCal',{name:this.props.route.params.name})}>
      <FontAwesome5 name="calendar-alt" size={60} color="black" />
      </TouchableOpacity>
      </View>

      <View style={{ alignItems: 'center', bottom: 130, left: 10, }}>
      
      <Text style={styles.btnTextTit}>Press the icon ;)  </Text>
      <Text style={styles.btnTextTitle}>Mark the calendar!  </Text>
      </View>

      <View style={{ paddingLeft: 20, paddingRight: 20, alignSelf: 'stretch', bottom: 20, }}>
      <TouchableOpacity style={ styles.button} onPress={() => this.props.navigation.navigate('EveReminder',{edit:true,name:this.props.route.params.name, key:Date.now()})}>
      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
      <MaterialCommunityIcons name="bell" size={50} color="#fcbf49" /> 
      <Text style={styles.btnText}>   Add a Reminder  </Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity style={ styles.button} onPress={() => this.props.navigation.navigate('EveNotes',{edit:true,name:this.props.route.params.name, key:Date.now()})}>
      <View style={{ flexDirection: 'row', alignItems: 'center', right: 20,}}>
     <AntDesign name="form" size={50} color="#1d3557" />
      
      <Text style={styles.btnText}>   Make a Note  </Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity style={ styles.button} onPress={() => this.props.navigation.navigate('EveSpecial',{edit:true,name:this.props.route.params.name, key:Date.now()})}>
      <View style={{ flexDirection: 'row', alignItems: 'center', right: 15, }}>
     <MaterialCommunityIcons name="calendar-heart" size={50} color="#de4d86" />
      <Text style={styles.btnText}>   Special Events  </Text>
      </View>
      </TouchableOpacity>
      </View>
      
      </View>
      </ImageBackground>
      );
    }
  }

  const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: 'rgba(255,255,255,0.3)',
      padding: 8,
    },

    btnText: {
      fontSize: 25,
      fontWeight: "700",
      color: '#000',
    },

    btnTextTitle: {
      fontSize: 28,
      fontWeight: "700",
      color: '#000',
    },

    btnTextTit: {
      fontSize: 18,
      fontWeight: "700",
      color: '#000',
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
      borderColor: 'black',
      marginBottom: 10,
      borderRadius: 5,
      padding: 10,
      //marginLeft: 28,
      //width: 330,
      alignItems: 'center',
      backgroundColor: '#fff',
    },

    back: {
      flex: 1,
      width: '100%',
      height: '100%',
    },

  });