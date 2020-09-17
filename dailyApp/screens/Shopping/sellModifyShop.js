import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, CheckBox } from 'react-native';
import Constants from 'expo-constants';

export default class ModifyShop extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      noteArray: [],
      noteText: '',
    }
  }

  render() {

    return (
      <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headerText}>- MY SHOPS -</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
      
      <View style={styles.note}>

      <Text style={styles.noteText}>ABC Restaurant</Text>
     
      </View>


      <View style={styles.note}>

      <Text style={styles.noteText}>XYZ Cafe</Text>
     
      </View>

      <View style={styles.note}>

      <Text style={styles.noteText}>PQR Bakery</Text>
     
      </View>
      
      </ScrollView>


  
      </View>
      );
  }

  addNote() {
    if (this.state.noteText) {
      var d = new Date();
      this.state.noteArray.push({
        'date' :  d.getFullYear() +
        "/" + (d.getMonth() + 1) +
        "/" + d.getDate(),
        'note': this.state.noteText
      });
      this.setState({ noteArray: this.state.noteArray })
      this.setState({ noteText: '' });
    }
  }

  deleteNote(key) {
    this.state.noteArray.splice(key, 1);
    this.setState({ noteArray: this.state.noteArray })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    backgroundColor: '#e91e63',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 10,
    borderBottomColor: '#ddd',
    top:30,
  },

  note: {
    position: 'relative',
    padding: 20,
    paddingRight: 100,
    borderBottomWidth: 2,
    borderBottomColor: '#ededed',
  },

  headerText: {
    color: 'white',
    fontSize: 18,
    padding: 26,
  },

  scrollContainer: {
    flex: 1,
    marginBottom: 100,
    top:30,
  },

  noteText: {
    paddingLeft: 20,
    fontWeight:"bold",
    borderLeftWidth: 10,
    borderLeftColor: '#e91e63',
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
    backgroundColor: '#e91e63',
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
  },

  item:{
    width:"80%",
    backgroundColor:"#fff",
    borderRadius:20,
    padding:10,
    marginBottom:10,
    flexDirection:"row",
  },
});
