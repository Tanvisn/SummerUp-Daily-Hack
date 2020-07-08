import  React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity , Image, Button, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import Unorderedlist from 'react-native-unordered-list';
export default class Sleep extends React.Component {

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Tips To Get Better Sleep:</Text>
        </View>

        <ScrollView>
        <View style={styles.list}>
        <View style={{ margin: 10,}}>
        <Text style={styles.listText}>- Body has a natural time-keeping clock called circadian rhythm.
        Natural sunlight or <Text style={{ fontWeight: 'bold', }}>bright light during the day</Text> helps to keep your circadian rhythm 
        healthy. This <Text style={{ fontWeight: 'bold', }}>improves daytime energy</Text>, as well as night time <Text style={{ fontWeight: 'bold', }}>sleep quality and duration</Text>.</Text>
        </View>
        <View style={{ margin: 10,}}>
        <Text style={styles.listText}>- <Text style={{ fontWeight: 'bold', }}>Blue light</Text> tricks your body into thinking it’s daytime.
        This reduces hormones like melatonin, which help you relax and get deep sleep.
        There are several ways you can <Text style={{ fontWeight: 'bold', }}>reduce blue light exposure in the evening</Text> in order to get good sleep.</Text>
        </View>

        <View style={{ margin: 10,}}>
        <Text style={styles.listText}>-  When consumed late in the day, <Text style={{ fontWeight: 'bold', }}>Caffeine</Text> stimulates your nervous system 
        and may stop your body from naturally relaxing at night.
        <Text style={{ fontWeight: 'bold', }}>Drinking large amounts of coffee after 3–4 p.m. is not recommended</Text>, 
        especially if you’re sensitive to caffeine or have trouble sleeping</Text>
        </View>
        
        <View style={{ margin: 10,}}>
        <Text style={styles.listText}>- <Text style={{ fontWeight: 'bold', }}>Long daytime naps</Text> may impair sleep quality. If you have trouble sleeping at night, 
         <Text style={{ fontWeight: 'bold', }}> stop napping</Text> or <Text style={{ fontWeight: 'bold', }}>shorten your naps</Text> during the daytime.</Text>
        </View>
        </View>
        </ScrollView>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(202, 240, 248, 0.3)',
    padding: 8,

    },

    header: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      margin: 5,
      top: 10,
    },

    headerText: {
      fontSize: 30,
      padding: 24,
      fontWeight: '700',
    },

    list: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingLeft: 20,
    },

    listText: {
      fontSize: 20,
    },


  });