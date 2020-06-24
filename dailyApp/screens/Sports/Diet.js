import  React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

export default class Fitness extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.paragraph}>
      Diet Page
      </Text>

      <View style={styles.footer}>

      <TouchableOpacity style={styles.navButton} onPress={() => this.props.navigation.navigate('Sports')}><Text style={styles.navButtonText}>My Plan</Text></TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => this.props.navigation.navigate('StopWatch')}><Text style={styles.navButtonText}>Stop Watch</Text></TouchableOpacity>    
      <TouchableOpacity style={styles.navButton} onPress={() => this.props.navigation.navigate('Timer')}><Text style={styles.navButtonText}>Timer</Text></TouchableOpacity>
      <TouchableOpacity style={styles.navButton}><Text style={styles.navButtonTextSpecial}>Fitness</Text></TouchableOpacity>

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
      backgroundColor: 'rgba(202, 240, 248, 0.3)',
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },

    navButton: {
      margin: 10,
      marginBottom: 15,
    },

    navButtonText: {
      fontSize: 18,
      fontWeight: "bold",
      color: 'rgba(29, 53, 87,0.4)',
    },
    navButtonTextSpecial: {
      fontSize: 18,
      fontWeight: "bold",
      color: 'rgb(29, 53, 87)',
    },

    footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'center',

  },
  });