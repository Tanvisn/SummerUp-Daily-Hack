/*Input and set doctor appointment reminder*/
import 'react-native-gesture-handler';
import React, {useState} from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { url } from './../../components/url';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  TextInput, 
  Keyboard, 
  TouchableWithoutFeedback,
  ImageBackground,
  Image,
  ActivityIndicator,
  Picker,
  ScrollView } from 'react-native';
  import Constants from 'expo-constants';
  import moment from "moment";
  import TimePicker from 'react-native-simple-time-picker';

  
  export default class DocRecord extends React.Component{
    constructor(props){
      super(props);
      this.state={
        expoPushToken:'',
        notification:false,
        isStDatePickerVisible: false,
        isEnDatePickerVisible: false,
        isTimePickerVisible: false,
        key:0,
        Stdate: "",
        chStdate: new Date(),
        title: "",
        mode: "",
        name: "",
        time: "",
        spec: "",
        addr: "",
        phn: "",
      };
      this.hideStDatePicker = this.hideStDatePicker.bind(this);
      
      this.hideTimePicker = this.hideTimePicker.bind(this);
      this.handleTimeConfirm = this.handleTimeConfirm.bind(this);
      this.handleStDateConfirm = this.handleStDateConfirm.bind(this);
      
      this.save = this.save.bind(this);
    }

    hideStDatePicker(){
      this.setState({ isStDatePickerVisible: false});
    };


    hideTimePicker(){
      this.setState({ isTimePickerVisible: false});
    };

    async handleStDateConfirm(Stdate) {
      this.hideStDatePicker();
      console.log("Stdate");
      console.log(Stdate);
      console.log("Stdate");
      await this.setState({ chStdate:(Stdate), Stdate:moment(Stdate).format('Do MMMM YYYY')});
      console.log(this.state.chStdate);
    };

    handleTimeConfirm(time) {
      this.hideTimePicker();
      this.setState({ time:moment(time).format('HH : mm')});
    };

    save(){}

    async sendPushNotification(expoPushToken) {
      if(this.state.chStdate===""){
        alert("Please enter the date of Appointment!");
      }
      
      else{
        
        var Stdate = new Date(this.state.chStdate);
        await fetch(url+'/docApp',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userName: this.props.route.params.name,
            title: "Appointment Reminder",
            body: "It's time for "+this.state.name+"'s appointment",
            data: {key:this.state.key,screen:"docApp",title:"Doctor Appointment",head:this.state.name,desc:this.state.addr+"\n"+this.state.phn},
            year: Stdate.getFullYear(),
            month: ""+(parseInt(Stdate.getMonth())+1),
            date: Stdate.getDate(),
            hour: this.state.time.split(" : ")[0],
            minutes: this.state.time.split(" : ")[1],
            seconds: "00",
            curr_token: expoPushToken,
            nameOfDoc: this.state.name,
            medicalSpeciality: this.state.spec,
            address: this.state.addr,
            phoneNumber: this.state.phn,
          })
        });
        this.props.navigation.navigate('MedHome')
      }

    }
//Checks whether notification permission is given to the app if not then it alerts!
async registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get token for push notification! Pls allow app to send notifications for a better experience.');
   //   return;
    }
    //Creates a token.
    token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
    this.setState({expoPushToken:token.data});
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

componentDidMount() {
  this.registerForPushNotificationsAsync();
}

render(){

  return (
    <View style={styles.container}>

    <ScrollView>

    <View style={styles.input}>

    <TextInput style={styles.textinput} placeholder="Name of the Doctor" 
    placeholderTextColor="black"
    underlineColorAndroid={'transparent'}
    value={this.state.name} 
    onChange = {(e)=>this.setState({ name: e.nativeEvent.text})}/>

    <TextInput style={styles.textinput} placeholder="Medical Speciality" 
    placeholderTextColor="black"
    underlineColorAndroid={'transparent'}
    value={this.state.spec}
    onChange = {(e)=>this.setState({ spec: e.nativeEvent.text})} />

    <TouchableOpacity onPress={() => this.setState({ isStDatePickerVisible: true})}>
    <TextInput style={styles.textinput} placeholder="Date of the appointment" 
    placeholderTextColor="black"
    underlineColorAndroid={'transparent'} 
    editable={false}
    value={this.state.Stdate}
    onTouchStart={() => this.setState({ isStDatePickerVisible: true})}
    />
    </TouchableOpacity>

    <DateTimePickerModal
    isVisible={this.state.isStDatePickerVisible}
    mode="date"
    onConfirm={this.handleStDateConfirm}
    onCancel={() => this.setState({ isStDatePickerVisible: false})}
    />


    <TouchableOpacity onPress={() => this.setState({ isTimePickerVisible: true})}>
    <TextInput style={styles.textinput} placeholder="Time" 
    placeholderTextColor="black"
    underlineColorAndroid={'transparent'} 
    editable={false}
    value={this.state.time}
    onTouchStart={() => this.setState({ isTimePickerVisible: true})}
    />
    </TouchableOpacity>

    <DateTimePickerModal
    isVisible={this.state.isTimePickerVisible}
    mode="time"
    onConfirm={this.handleTimeConfirm}
    onCancel={() => this.setState({ isTimePickerVisible: false})}
    />


    <TextInput style={styles.textinputDiary} placeholder="Address" 
    placeholderTextColor="black" multiline={true}
    underlineColorAndroid={'transparent'} 
    value={this.state.addr}
    onChange = {(e)=>this.setState({ addr: e.nativeEvent.text})}/>

    <TextInput style={styles.textinput} placeholder="Phone Number" 
    placeholderTextColor="black"
    underlineColorAndroid={'transparent'} keyboardType={'numeric'}
    value={this.state.phn}
    onChange = {(e)=>this.setState({ phn: e.nativeEvent.text})}/>

    <TouchableOpacity style={styles.button} onPress={async () => {
      await this.sendPushNotification(this.state.expoPushToken);
    }}>
    <Text style={styles.btntext}>Set a Reminder </Text>
    </TouchableOpacity>
    </View>

    </ScrollView>
    </View>


    );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  input: {
    top: 100,
    paddingLeft: 40,
    paddingRight: 40,
    height:700,
  },

  header: {
    backgroundColor: '#457b9d',
    alignItems: 'center',
    justifyContent: 'center',
    top: 30,
  },

  headerText: {
    color: 'white',
    fontSize: 22,
    padding: 26,
  },

  title: {
    color: '#2BA189',
    fontWeight: 'bold',
    fontSize: 30,
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: 'black',
    borderBottomWidth: 1,

  },

  textinput: {
    color: 'black',
    fontSize: 18,
    alignSelf: 'stretch',
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

  textinputDiary: {
    color: 'black',
    fontSize: 18,
    backgroundColor: 'rgba(30, 85, 92,0.1)',
    alignSelf: 'stretch',
    height: 150,
    marginBottom: 20,
    borderColor: 'black',
    borderWidth: 1,

    borderRadius: 5,
    textAlignVertical: "top",
    padding: 10,
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

  backBtn: {
    position: 'absolute',
    zIndex: 11,
    left: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
});