import  React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity , Image, Button, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import Unorderedlist from 'react-native-unordered-list';
export default class Water extends React.Component {

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Ways To Keep Your Body Hydrated:</Text>
        </View>

        <ScrollView>
        <View style={styles.list}>
        <View style={{ margin: 10,}}>
        <Text style={styles.listText}>- <Text style={{ fontWeight:'bold', }}>Water</Text> contains <Text style={{ fontWeight:'bold', }}>no added sugars or calories</Text>, 
        that is why water is ideal to drink throughout the day or specifically when you need to rehydrate, such as after a workout.</Text>
        </View>
        <View style={{ margin: 10,}}>
        <Text style={styles.listText}>- Drinking <Text style={{ fontWeight:'bold',}}>moderate amounts of Coffee and Tea</Text> have similar hydrating properties as water. 
        A plus point to note, their caffeine content may give you an energy boost.</Text>
        </View>

        <View style={{ margin: 10,}}>
        <Text style={styles.listText}>- <Text style={{ fontWeight:'bold', }}>Fruits and Vegetables</Text> can act as a perfect hydrating
        snack, as these comprise <Text style={{ fontWeight:'bold', }}>80-99% of water</Text>. Fruits and vegetables that can be consumed
        in order to maintain water balance are <Text style={{ fontWeight:'bold', }}>berries, melons, oranges, grapes, carrots, lettuce,
        cabbage and spinach</Text>.</Text>
        </View>
        
        <View style={{ margin: 10,}}>
        <Text style={styles.listText}>- <Text style={{ fontWeight:'bold', }}>Oral Rehydration Solution</Text> is a very good way of hydration.
        In addition to water it also <Text style={{ fontWeight:'bold', }}>contains electrolytes and sugar</Text>. A simple rehydration
        solution can also be made at home using water, salt and sugar.</Text>
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