import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import DialogInput from 'react-native-dialog-input';

export default class AllListSports extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      listArray: [],
      listText: '',
      isDialogVisible: false,
    }
  }

  showDialog(isShow){
    this.setState({isDialogVisible: isShow});
  }

  render() {

    var lists = this.state.listArray.map((val,key) => {
      return <List key={key} keyval={key} val={val}
          deleteMethod={ ()=> this.deleteList(key) } />
    })

  return (
    <View style={styles.container}>
      <DialogInput isDialogVisible={this.state.isDialogVisible}
        title={"Please enter a Title: "}
        hintInput ={"Title"}
        submitInput={ (inputText) => {this.showDialog(false), this.props.navigation.navigate('NewListSports',{title:inputText})}}
        closeDialog={ () => {this.showDialog(false)}}
        style={{ color: "pink", }}>
      </DialogInput>
      <View style={styles.header}>
        <Text style={styles.headerText}>- ALL LISTS -</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
      {lists}

      </ScrollView>

      <View style={styles.footer}>
      
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => {this.showDialog(true)}}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

    </View>
    );
  }

  addList() {
    if (this.state.listText) {
      var d = new Date();
      this.state.listArray.push({
        'date' :  d.getFullYear() +
        "/" + (d.getMonth() + 1) +
        "/" + d.getDate(),
        'list': this.state.listText
      });
      this.setState({ listArray: this.state.listArray })
      this.setState({ listText: '' });
    }
  }

  deleteList(key) {
    this.state.listArray.splice(key, 1);
    this.setState({ listArray: this.state.listArray })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    backgroundColor: 'rgb(29, 53, 87)',
    alignItems: 'center',
    justifyContent: 'center',
   
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
    backgroundColor: 'rgb(29, 53, 87)',
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
