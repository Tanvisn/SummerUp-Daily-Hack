import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Platform } from 'react-native';
import Constants from 'expo-constants';
import Entry from './Entry';
import moment from "moment";



export default class AllEntries extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      entryArray: [{key:12345679, date:"22nd June 2020", title:"check", text:"this is some text"}],
      entryText: '',
    }
    this.reloadOnBack=this.reloadOnBack.bind(this);
    this.fetchEntries=this.fetchEntries.bind(this);
    this.createEntries=this.createEntries.bind(this);
  }

  fetchEntries(){

  if(Platform.OS === 'ios' || Platform.OS === 'android'){
    return [{key:12345679, date:"22nd June 2020", title:"check", text:"this is some text"}];
  }
  else{
  fetch('http://localhost:9000/getAllEntries',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.props.route.params.name
    })
    })

    //recieve login confirmation and age from backend
    .then((response) => (response.json()))
    
    .then((res) => {
      console.log("response");
      console.warn(res.content);
      return res.content;
      //Alert.alert(res.message);
      
    })
    
    .catch(err => {
      console.log(err);
    });
  }
}
  componentDidMount(){
  if(Platform.OS === 'ios' || Platform.OS === 'android'){}
  else{
    //this.setState({entryArray:this.fetchEntries()});
    console.log(this.state.entryArray);
  }
    console.log("diary mount");
  }

  reloadOnBack(){
    var entries=fetchEntries();
    //this.setState({entryArray: entries});
  }

  createEntries(){
   return (this.state.entryArray.map((val) => {
      console.log("key"+val.key);
      return <Entry key={val.key} val={val}
          deleteMethod={ ()=> this.deleteEntry(val.key) }  view={ ()=> this.viewEntry(val.key)}/>
    })
   )
 }

  render() {
    console.log("diary render");
    
    /*if(this.props.route.params){
      console.log(this.props.route.params);
      var entries=this.state.entryArray;
      console.log(entries);
      var it=this.state.entryArray.filter(i => i.key===this.props.route.params.key);
      console.log(it);
      if(it && it.length){}
      else{
      entries.push({
          key:this.props.route.params.key,
          date:this.props.route.params.date,
          title:this.props.route.params.title,
          text: this.props.route.params.text
        });
      console.log(entries);
    this.state.entryArray=entries;
      }
      console.log("entries");
      console.log(entries);
      console.log("entries");
    }*/

    
//    console.log(entries);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>- YOUR DIARY ENTRIES -</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
      {console.log("hihi")}
      {this.createEntries()}

      </ScrollView>

      <View style={styles.footer}>
      
      </View>

      <TouchableOpacity 
      style={styles.addButton} 
      onPress={() => this.props.navigation.navigate('NewEntry', {edit:true, key:Date.now(), beforeGoBack: ()=>{this.reloadOnBack()}})}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

    </View>
    );
  }

  //

  deleteEntry(key) {
    console.log("del");
    var itt=this.state.entryArray.filter(it => it.key!==key);
    console.log(itt);
    this.setState({ entryArray: itt })
  }

  viewEntry(key){
    console.log("view");
    console.log(key);
    var itt=this.state.entryArray.filter(it => it.key===key);
    //get text value from backend
    console.log(this.state.entryArray);
    console.log(itt);
    //var itt = JSON.parse(ittt);
    console.log(itt[0]);
    this.props.navigation.navigate('NewEntry', {edit:false, key:12345679, date:itt[0].date, title:itt[0].title, text:itt[0].text})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    backgroundColor: '#2BA189',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 10,
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