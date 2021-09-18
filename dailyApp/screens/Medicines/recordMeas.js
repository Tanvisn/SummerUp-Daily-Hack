/*Page for recording measurement and confirming notification once notification is sent*/
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Permissions, Notifications } from 'expo';
  import moment from "moment";
import { url } from './../../components/url';
import { NavigationContainer, CommonActions } from "@react-navigation/native";

const PUSH_REGISTRATION_ENDPOINT = 'http://ddf558bd.ngrok.io/token';
const MESSAGE_ENPOINT = 'http://ddf558bd.ngrok.io/message';

export default class Record extends React.Component {
  constructor(props){
      super(props);
      this.state={
        notification: null,
        messageText: '',
        value:'0',
        unit:'',
        edit:0,
        data:{},
        name:'',
      };
      this.sendResponse = this.sendResponse.bind(this);
      this.setEdit = this.setEdit.bind(this);
    }

  handleNotification = (notification) => {
    this.setState({ notification });
  }

  handleChangeText = (text) => {
    this.setState({ messageText: text });
  }

  setEdit(){
    var edit;
    console.log("mymy");
    console.log("mymy");
    console.log(this.props.route.params);
    var data = this.props.route.params.data;
    console.log(data);
    if(data.title==="Event"){
      edit=1;
    }
    else if(data.title==="Special Event"){
      edit=2;
    }
    else if(data.title==="Medicine Record")
      edit=3;
    else if(data.title==="Measurement Record")
      edit=4;
    else if(data.title==="Doctor Appointment")
      edit=5;
    this.setState({edit:edit,data:data,name:this.props.route.params.name})
  }

  sendResponse(){
    var edit=this.state.edit;
    console.log(this.props.route.params);
    var data = this.state.date;
    if(edit<3){
    fetch(url+'/eventsConfirmButton',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        edit: edit,
        eventKey: data.key,
    })
    })

    .then((response) => (response.json()))
    
    .then((res) => {
      console.log("response");
      //console.warn(res);
      if(res.success){

      }
      else{
        alert("Couldn't fetch data. Please try again.");
      }
      //Alert.alert(res.message);
      
    })
    
    .catch(err => {
      console.log(err);
    });
  }
  else{
    fetch(url+'/medicalConfirmButton',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        edit: (edit-2),
        medicineKey: 1234567890,
        date: moment(data.date).format('YYYY-MM-DD'),
        appointmentsKey: data.key,
        inventoryName: data.medName,
        measurementKey : data.key,
        value : Number(this.state.value),
        unit : this.state.unit,

    })
    })

    .then((response) => (response.json()))
    
    .then((res) => {
      console.log("response");
      //console.warn(res);
      if(res.success){
        this.props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
        routes: [
                {name: 'recordNotif'} , 
                ],  
      }));
      }
      else{
        alert("Couldn't fetch data. Please try again.");
      }
      //Alert.alert(res.message);
      
    })
    
    .catch(err => {
      console.log(err);
    });
  }
  }

  componentDidMount() {
    this.setEdit();

  }

  renderNotification() {
    return(
      <View style={styles.container}>
        <Text style={styles.label}>A new message was recieved!</Text>
        <Text>{this.state.notification.data.message}</Text>
      </View>
    )
  }

  render() {
    console.log("blabla "+this.state.data.title+" blabla");
    return (
      <View style={styles.container}>

        <View style={styles.input}>
        
        <View style={{ marginBottom:10 }}>
        <Text style={styles.text}>{this.state.data.head}</Text>
        <Text style={styles.text}>{this.state.data.desc}</Text>
        </View>

        {this.state.edit===4 && 
          <TextInput style={styles.textinput} placeholder="Enter the reading" 
        placeholderTextColor="black"
        underlineColorAndroid={'transparent'}   
        onChange = {(e)=>this.setState({ value: e.nativeEvent.text})}
        value={this.state.value}
        keyboardType={'numeric'}/>
      }

      {this.state.edit===4 && 
        <TextInput style={styles.textinput} placeholder="Unit" 
        placeholderTextColor="black"
        underlineColorAndroid={'transparent'}   
        onChange = {(e)=>this.setState({ unit: e.nativeEvent.text})}
        value={this.state.unit}/>

        }
        

        <TouchableOpacity style={styles.button} onPress={this.sendResponse}>
        <Text style={styles.btntext}>Confirm</Text>
        </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textInput: {
    height: 50,
    width: 300,
    borderColor: '#f6f6f6',
    borderWidth: 1,
    backgroundColor: '#fff',
    padding: 10
  },

  button: {
    padding: 10
  },

  text: {
    fontWeight:"bold",
    fontSize:20,
    color:"black"
  },

  buttonText: {
    fontSize: 18,
    color: '#fff'
  },

  label: {
    fontSize: 18
  },

  input: {
      top: 50,
      paddingLeft: 40,
      paddingRight: 40,
  },

  textinput: {
      color: 'black',
      fontSize: 18,
      width:300,
      height: 50,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft:10,
      marginBottom: 20,
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 5,
      textAlignVertical: "top",
      backgroundColor: 'rgba(30, 85, 92,0.1)',
  },
   
    button: {
      alignSelf: 'stretch',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#1e555c',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 5,
    },

    btntext: {
      color: '#fff',
      fontSize: 20,
      fontWeight: "bold",
    },

});
