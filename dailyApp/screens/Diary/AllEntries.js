import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Platform } from 'react-native';
import Constants from 'expo-constants';
import Entry from './Entry';
import moment from "moment";
const { manifest } = Constants;
import { Entypo } from '@expo/vector-icons';
import MyCalendar from './Calendar1';
import { url } from './../../components/url';

export default class AllEntries extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      entryArray: [],
      entryText: '',
      viewCal:false,
    }
    this.reloadOnBack=this.reloadOnBack.bind(this);
    this.fetchEntries=this.fetchEntries.bind(this);
    this.createEntries=this.createEntries.bind(this);
    this._unsubscribeSiFocus = this.props.navigation.addListener('focus', e => {
        ////console.warn('focus diary');
        this.fetchEntries();
    });
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
    setTimeout(() => {
  fetch(url+'/getAllDiaryEntries',{
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
      this.setState({entryArray:res.content});
      }
      else{
        alert("Couldn't fetch data. Please try again.");
      }
      //Alert.alert(res.message);
      
    })
    
    .catch(err => {
      console.log(err);
    });
  },10)
  //}
}
  componentDidMount(){
//  if(Platform.OS === 'ios' || Platform.OS === 'android'){}
//  else{
    this.focusListener = this.props.navigation.addListener('focus', ()=>{
      this.fetchEntries();
    });
    console.log(this.state.entryArray);
  //}
    console.log("diary mount");
  }


  componentWillUnmount(){
    this.props.navigation.removeListener('focus', this.fetchEntries);
  }

  reloadOnBack(){
    this.fetchEntries();
  //  this.setState({entryArray: entries});
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
        <TouchableOpacity style={{
          position:'absolute',
          paddingBottom: 10,
          right:20
        }}
        onPress={() => this.setState({viewCal: !this.state.viewCal})}> 
        {this.state.viewCal?
        <Entypo name="list" size={24} color="white" />:
        <Entypo name="calendar" size={24} color="white" />
        }
        </TouchableOpacity>
      </View>

      {this.state.viewCal?
        < MyCalendar entryArray={this.state.entryArray} navigation={this.props.navigation} route={this.props.route}/>:
        (
      <ScrollView style={styles.scrollContainer}>
      {console.log("hihi")}
      {this.createEntries()}

      </ScrollView>
      )
      }

      <View style={styles.footer}>
      
      </View>
      { !this.state.viewCal &&
      <TouchableOpacity 
      style={styles.addButton} 
      onPress={() => this.props.navigation.navigate('NewEntry', {edit:true, key:Date.now(), name:this.props.route.params.name})}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      }

    </View>
    );
  }

  //

  deleteEntry(key) {
    console.log("del");
    
  /*  if(Platform.OS === 'ios' || Platform.OS === 'android'){
      var itt=this.state.entryArray.filter(it => it.key!==key);
      console.log(itt);
      this.setState({ entryArray: itt });
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
    //    this.setState({entryArray:res.content});
        var entry = this.state.entryArray.filter(it => it.key!==key);
        this.setState({entryArray:entry});
        
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
    var itt=this.state.entryArray.filter(it => it.key===key);
    //get text value from backend
    console.log(this.state.entryArray);
    console.log(itt);
    //var itt = JSON.parse(ittt);
    console.log(itt[0]);
    this.props.navigation.navigate('NewEntry', {edit:false, key:key, date:itt[0].date, title:itt[0].title, text:itt[0].text, name:this.props.route.params.name})
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