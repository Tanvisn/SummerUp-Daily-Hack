import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import Item from './NewListItem';

export default class Allfeatures extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      itemArray: [],
      itemText: '',
      inputText: '',
    }
    this.saveList=this.saveList.bind(this);
  }

    saveList(){
      //go to backend with itemArray
      this.props.navigation.navigate('');
    }
  

  render() {

    var items = this.state.itemArray.map((val,key) => {
        return <Item key={key} keyval={key} val={val}
        deleteMethod={ ()=> this.deleteItem(key) } />
      });


    return (

      <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}> Make A To-Do List For Your Workout </Text>
      </View>

      <ScrollView style={styles.scrollContainer}>

        {items}

        </ScrollView>

        <View style={styles.footerInput}>
        <TextInput style={styles.textInput}
        onChangeText={(itemText) => this.setState({itemText})}
        value={this.state.itemText}
        placeholder='> Type here to add an activity'
        placeholderTextColor='white'
        underlineColorAndroid={'transparent'} />

        </View>

        <TouchableOpacity onPress={this.addItem.bind(this)} style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

     
    <View style={styles.footer}>
    
    <TouchableOpacity style={styles.navButton}><Text style={styles.navButtonTextSpecial}>My Plan</Text></TouchableOpacity>
    <TouchableOpacity style={styles.navButton} onPress={() => this.props.navigation.navigate('StopWatch')}><Text style={styles.navButtonText}>Stop Watch</Text></TouchableOpacity>    
    <TouchableOpacity style={styles.navButton} onPress={() => this.props.navigation.navigate('Timer')}><Text style={styles.navButtonText}>Timer</Text></TouchableOpacity>
    <TouchableOpacity style={styles.navButton} onPress={() => this.props.navigation.navigate('Fitness')}><Text style={styles.navButtonText}>Fitness</Text></TouchableOpacity>
    
    </View>

    

    </View>
      );
  }

  addItem() {
      if (this.state.itemText) {
        this.state.itemArray.push({
          item: this.state.itemText
        });

        this.setState({ itemArray: this.state.itemArray })
        this.setState({ itemText: '' });
      }
    }

    deleteItem(key) {
      this.state.itemArray.splice(key,1);
      this.setState({ itemArray: this.state.itemArray })
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(202, 240, 248, 0.3)',
  },

  footerInput: {
    bottom: 50,

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

  header: {
    backgroundColor: '#1d3557',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0,
    borderBottomColor: '#ddd',
  },

  headerText: {
    color: 'white',
    fontSize: 18,
    padding: 26,
  },

  scrollContainer: {
    flex: 1,
    marginBottom: 100,
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

  textInput: {
    alignSelf: 'stretch',
    color: '#fff',
    padding: 20,
    backgroundColor: 'rgb(29, 53, 87)',
    borderTopWidth: 2,
    borderTopColor: '#ededed',
  },

  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 60,
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },

  addButtonText: {
    color: 'rgb(29, 53, 87)',
    fontSize: 24,
  }
});

