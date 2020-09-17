import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Platform } from 'react-native';
import Constants from 'expo-constants';
import Entry from './eveDisplayNote';
import moment from "moment";
const { manifest } = Constants;
import { Entypo } from '@expo/vector-icons';
import MyCalendar from './Calendar';
import { url } from './../../components/url';

export default class AllEntries extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      eventArray: [],
      eventText: '',
      viewCal:false,
    }
    this.reloadOnBack=this.reloadOnBack.bind(this);
    this.fetchEntries=this.fetchEntries.bind(this);
    this.createEntries=this.createEntries.bind(this);
     //   this._unsubscribeSiBlur = this.props.navigation.addListener('blur', e => {
        ////console.warn('blur diary');
   // });
  }

  fetchEntries(){
console.log("fethcing");
 // if(Platform.OS === 'ios' || Platform.OS === 'android'){
  //  return [{key:12345679, date:"22nd June 2020", title:"check", text:"this is some text"}];
 // }
  //else{
  fetch(url+'/getAllEventEntries',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.props.route.params.name
    })
    })

    .then((response) => (response.json()))
    
    .then((res) => {
      console.log("response");
      //console.warn(res);
      if(res.success){
      this.setState({eventArray:res.content});
      }
      else{
        alert("Couldn't fetch data. Please try again.");
      }
      //Alert.alert(res.message);
      
    })
    
    .catch(err => {
      console.log(err);
    });
  //}
}
  componentDidMount(){
//  if(Platform.OS === 'ios' || Platform.OS === 'android'){}
//  else{
    this.focusListener = this.props.navigation.addListener('focus', ()=>{
      this.setState({eventArray:this.props.route.params.eventArray})
    });
    console.log(this.state.entryArray);
  //}
    console.log("diary mount");
  }


  componentWillUnmount(){
    this.props.navigation.removeListener('focus', this.fetchEntries);
  }

  reloadOnBack(){
  //  this.setState({eventArray: entries});
  }

  createEntries(){
   return (this.state.eventArray.map((val) => {
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
      var entries=this.state.eventArray;
      console.log(entries);
      var it=this.state.eventArray.filter(i => i.key===this.props.route.params.key);
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
    this.state.eventArray=entries;
      }
      console.log("entries");
      console.log(entries);
      console.log("entries");
    }*/

    
//    console.log(entries);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>- YOUR EVENT ENTRIES -</Text>
        
      </View>

      <ScrollView style={styles.scrollContainer}>
      {console.log("hihi")}
      {this.createEntries()}

      </ScrollView>
      
      <View style={styles.footer}>
      
      </View>
      

    </View>
    );
  }

  //

  deleteEntry(key) {
    console.log("del");
    
  /*  if(Platform.OS === 'ios' || Platform.OS === 'android'){
      var itt=this.state.eventArray.filter(it => it.key!==key);
      console.log(itt);
      this.setState({ eventArray: itt });
    }

    else{
*/    //send to backend
    
    fetch(url+'/saveEntry',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        edit:3,
        key:key,
        name:this.props.route.params.name
      })
    })

    //recieve entry added confirmation from backend
    .then((response) => (response.json()))
    
    .then((res) => {
      console.log("response");
      //console.warn(res);
      //Alert.alert(res.message);
      //if entry added
      if(res.success === true){
    //    alert(res.message);
    //    this.setState({eventArray:res.content});
        var entry = this.state.eventArray.filter(it => it.key!==key);
        this.setState({eventArray:entry});
        
      }
      else {
        alert(res.message);
        //console.warn("error");
      }
    })
    
    .catch(err => {
      console.log(err);
    });
  //  }
  }

  viewEntry(key){
    console.log("view");
    console.log(key);
    var itt=this.state.eventArray.filter(it => it.key===key);
    //get text value from backend
    console.log(this.state.eventArray);
    console.log(itt);
    //var itt = JSON.parse(ittt);
    console.log(itt[0]);
    if(itt[0].title==="Event Reminder")
    this.props.navigation.navigate('EveReminder', {edit:false, key:key, data:itt[0],  date:this.props.route.params.date, name:this.props.route.params.name});
    else if(itt[0].title==="Special Event Reminder")
    this.props.navigation.navigate('EveSpecial', {edit:false, key:key, date:this.props.route.params.date, data:itt[0], name:this.props.route.params.name});
    else
    this.props.navigation.navigate('EveNotes', {edit:false, key:key, data:itt[0], date:this.props.route.params.date, name:this.props.route.params.name});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    backgroundColor: '#3D348B',
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
})