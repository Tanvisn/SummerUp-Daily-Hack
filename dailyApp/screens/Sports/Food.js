import  React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity , Image, Button, ScrollView, } from 'react-native';
import Constants from 'expo-constants';
export default class Food extends React.Component {

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headerText}>Sources Of Diffrent Food Components:</Text>
      </View>

      <ScrollView>
      <View style={styles.list}>
      <View style={{ margin: 5,}}>
      <View style={{ alignItems: 'center', justifyContent: 'center', }}>
      <Text style={styles.headerText}>Carbohydrates</Text>
      </View>
      <Text style={styles.listText}>Unprocessed or minimally processed whole grains, vegetables, fruits and beans
      are healthy sources of carbohydrates. Some of the sources are:</Text>   
      <Text style={styles.listText}>- Oats</Text> 
      <Text style={styles.listText}>- Bananas</Text>
      <Text style={styles.listText}>- Beetroot</Text>
      <Text style={styles.listText}>- Sweet Potatoes</Text>
      <Text style={styles.listText}>- Oranges</Text> 
      <Text style={styles.listText}>- Apples</Text> 
      <Text style={styles.listText}>- Kidney Beans</Text> 

      </View>

      <View style={{ margin: 5,}}>
      <View style={{ alignItems: 'center', justifyContent: 'center', }}>
      <Text style={styles.headerText}>Protein</Text>
      </View>
      <Text style={styles.listText}>A diet that is high in protein may also help lower blood pressure, fight diabetes, and more. Some of the sources are:</Text>   
      <Text style={styles.listText}>- Eggs</Text> 
      <Text style={styles.listText}>- Almonds</Text>
      <Text style={styles.listText}>- Chicken breast</Text>
      <Text style={styles.listText}>- Oats</Text>
      <Text style={styles.listText}>- Cottage cheese</Text> 
      <Text style={styles.listText}>- Milk</Text> 
      <Text style={styles.listText}>- Lentils</Text>
      <Text style={styles.listText}>-  Fish (all types)</Text> 
      </View>

      <View style={{ margin: 10,}}>
     <View style={{ alignItems: 'center', justifyContent: 'center', }}>
      <Text style={styles.headerText}>Calcium</Text>
      </View>
      <Text style={styles.listText}>Unprocessed or minimally processed whole grains, vegetables, fruits and beans
      are healthy sources of carbohydrates. Some of the sources are:</Text>   
      <Text style={styles.listText}>- Milk</Text> 
      <Text style={styles.listText}>- Some leafy vegetables</Text>
      <Text style={styles.listText}>- Soya beans</Text>
      <Text style={styles.listText}>- Tofu</Text>
      <Text style={styles.listText}>- Figs</Text> 
      <Text style={styles.listText}>- Cheese</Text> 
      <Text style={styles.listText}>- Yoghurt</Text> 
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
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'rgba(202, 240, 248, 0.3)',
    padding: 8,
      //backgroundColor: 'rgba(202, 240, 248, 0.3)',
    },

    header: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      margin: 5,
      top: 0,
    },

    headerText: {
      fontSize: 30,
      padding: 24,
      fontWeight: '700',
    },

    list: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: 20,
      top: 0,
    },

    listText: {
      fontSize: 20,
    },




  });