import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Platform } from 'react-native';
import Constants from 'expo-constants';
import Note from './medMeasureNote.js';
import moment from "moment";
const { manifest } = Constants;
import { Entypo } from '@expo/vector-icons';
import { url } from './../../components/url';

export default class MedReports extends React.Component {

 

  render() {
    
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>- My Reminders -</Text>
      </View>

      <ScrollView>
       <View style={styles.scrollContainer}>
      
      <View style={styles.note}>

      <Text style={styles.noteText}>20/07/2020</Text>
      <Text style={styles.noteText}>Crocin</Text>
      <Text style={styles.noteText}>20:00</Text>


      </View>


      <View style={styles.note}>

      <Text style={styles.noteText}>26/07/2020</Text>
      <Text style={styles.noteText}>Vitamin B</Text>
      <Text style={styles.noteText}>16:00</Text>

      </View>

      <View style={styles.note}>
 <Text style={styles.noteText}>28/07/2020</Text>
      <Text style={styles.noteText}>Vitamin A</Text>
      <Text style={styles.noteText}>13:00</Text>
      </View>
      </View>

      </ScrollView>

     
    </View>
    );
  }

  

  
  viewEntry(key){
    console.log("view");
    console.log(key);
    var itt=this.state.reportsArray.filter(it => it.key===key);
    //get text value from backend
    console.log(this.state.reportsArray);
    console.log(itt);
    //var itt = JSON.parse(ittt);
    console.log(itt[0]);
  //  this.props.navigation.navigate('NewEntry', {edit:false, key:key, date:itt[0].date, title:itt[0].title, text:itt[0].text, name:this.props.route.params.name})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    backgroundColor: '#1e555c',
    alignItems: 'center',
    justifyContent: 'center',
     borderBottomWidth: 10,
      borderBottomColor: '#ddd',
    top:30,
  },

  scrollContainer: {
      flex: 1,
      marginBottom: 100,
      top:70,
    },


  note: {
      position: 'relative',
      padding: 20,
      top:20,
      paddingRight: 100,
      borderBottomWidth: 2,
      borderBottomColor: '#ededed',
    },


      noteText: {
      paddingLeft: 20,
      fontWeight:"bold",
      borderLeftWidth: 10,
      borderLeftColor: '#1e555c',
    },


  headerText: {
    color: 'white',
    fontSize: 18,
    padding: 26,
  },

  scrollContainer: {
    flex: 1,
    marginBottom: 10,
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },

  textInput: {
    alignSelf: 'stretch',
    color: '#fff',
    padding: 20,
    backgroundColor: '#252525',
    borderTopWidth: 2,
    borderTopColor: '#ededed',
  },

  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: '#2BA189',
    width: 90,
    height: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },

  addButtonText: {
    color: '#fff',
    fontSize: 24,
  }
});