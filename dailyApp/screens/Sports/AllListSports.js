import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import DialogInput from 'react-native-dialog-input';
import List from './List';
import { url } from './../../components/url';

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


  fetchLists(){
    console.log("fethcing");
 // if(Platform.OS === 'ios' || Platform.OS === 'android'){
  //  return [{key:12345679, date:"22nd June 2020", title:"check", text:"this is some text"}];
 // }
  //else{
    setTimeout(() => {
    fetch(url+'/fitnessGetAllLists',{
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
      //console.warn(res);
      if(res.success){
        this.setState({listArray:res.content });
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
    this.fetchLists();
  });
  console.log(this.state.listArray);
  //}
  console.log("fitness mount");
}


componentWillUnmount(){
  this.props.navigation.removeListener('focus', this.fetchLists);
}

reloadOnBack(){
  this.fetchLists();
  //  this.setState({listArray: entries});
}

createLists(){
 return (this.state.listArray.map((val) => {
  console.log("key"+val.key);
  return <List key={val.key} val={val}
  deleteMethod={ ()=> this.deleteList(val.key) }  view={ ()=> this.viewList(val.key)}/>
})
 )
}

viewList(key){
  console.log("view");
  console.log(key);
  var list=this.state.listArray.filter(it => it.key===key);
    //get text value from backend
    console.log(this.state.listArray);
    console.log(list);
    //var itt = JSON.parse(ittt);
  //  console.log(list[0]);
  this.props.navigation.navigate('NewListSports', {edit:false, key:key, date:list[0].date, name:this.props.route.params.name, items:list[0].list, allDates:this.state.listArray.filter(it => it.key!== key).map((dt)=>{return( dt.date)})})
}



render() {

  return (
    <View style={styles.container}>
    
    <View style={styles.header}>
    <Text style={styles.headerText}>- ALL LISTS -</Text>
    </View>

    <ScrollView style={styles.scrollContainer}>
    {this.createLists()}

    </ScrollView>

    <View style={styles.footer}>

    </View>

    <TouchableOpacity style={styles.addButton} onPress={() => 
      this.props.navigation.navigate('NewListSports',{edit:true, key:Date.now(), name:this.props.route.params.name, allDates:this.state.listArray.map((dt)=>{return( dt.date)})})}>
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
  console.log("del");
    
    fetch(url+'/updateFitnessList',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        edit:4,
        key:key,
        name:this.props.route.params.name
      })
    })

    //recieve entry added confirmation from backend
    .then((response) => (response.json()))
    
    .then((res) => {
      console.log("rese");
      //console.warn(res);
      //Alert.alert(res.message);
      //if entry added
      if(res.success === true){
    //    alert(res.message);
    //    this.setState({listArray:res.content});
        var list = this.state.listArray.filter(it => it.key!==key);
        this.setState({listArray:list});
        
      }
      else {
        alert(res.message);
        //console.warn("error");
      }
    })
    
    .catch(err => {
      console.log(err);
    });
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