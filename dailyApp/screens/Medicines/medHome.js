import  React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


export default class MedHome extends React.Component {
  render() {
    return (
      <View style={styles.container}>



      <View style={{ flexDirection: 'row', alignItems: 'center', bottom: 150, left: 170, }}>
      <MaterialCommunityIcons name="bell-ring-outline" size={60} color="#1e555c" />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', bottom: 130, left: 90, }}>
      <Text style={styles.btnTextTitle}>Add a Reminder</Text>
      </View>

      <View style={{ paddingLeft: 20, paddingRight: 20, alignSelf: 'stretch', bottom: 20, }}>
      <TouchableOpacity style={ styles.button} onPress={() => this.props.navigation.navigate('MedRecord')}>
      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
      <Image
      source={require('../../assets/pill.png')} style={styles.img}/>
      <Text style={styles.btnText}>   Medicines</Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity style={ styles.button} onPress={() => this.props.navigation.navigate('MeasureRecord')}>
      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
      <Ionicons name="md-pulse" size={50} color="#1e555c" />
      
      <Text style={styles.btnText}>   Measurment</Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity style={ styles.button} onPress={() => this.props.navigation.navigate('DocRecord')}>
      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
      <FontAwesome name="stethoscope" size={50} color="#1e555c" />
      <Text style={styles.btnText}>   Appointments</Text>
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
    },
  });