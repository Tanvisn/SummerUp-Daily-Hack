/*Input and set reminder for Measurement reminder*/
import 'react-native-gesture-handler';
import React, {Component, useState, useEffect, useRef} from "react";
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
  ScrollView,
  Picker, Button, Platform  } from 'react-native';
  import Constants from 'expo-constants';
  import moment from "moment";
  import TimePicker from 'react-native-simple-time-picker';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default class App extends Component {  
  constructor(props){
      super(props);
      this.state={
        expoPushToken:'',
        notification:false,
        isStDatePickerVisible: false,
        isEnDatePickerVisible: false,
        isTimePickerVisible: false,
        key:0,
        chStdate: new Date(),
        Stdate: "",
        Endate: "",
        desc: "",
        mode: "",
        time: "08 : 00",
        tot: "",
        name: "",
      };
      this.hideStDatePicker = this.hideStDatePicker.bind(this);
      this.hideEnDatePicker = this.hideEnDatePicker.bind(this);
      this.hideTimePicker = this.hideTimePicker.bind(this);
      this.handleTimeConfirm = this.handleTimeConfirm.bind(this);
      this.handleStDateConfirm = this.handleStDateConfirm.bind(this);
      this.handleEnDateConfirm = this.handleEnDateConfirm.bind(this);
      this.save = this.save.bind(this);
      this.handleDaysChange = this.handleDaysChange.bind(this);
    }

    hideStDatePicker(){
      this.setState({ isStDatePickerVisible: false});
    };

    hideEnDatePicker(){
      this.setState({ isEnDatePickerVisible: false});
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

    handleEnDateConfirm(Endate) {
      this.hideEnDatePicker();
      this.setState({ Endate:moment(Endate).format('Do MMMM YYYY')});
    };


    handleTimeConfirm(time) {
      this.hideTimePicker();
      this.setState({ time:moment(time).format('HH : mm')});
    };

    handleDaysChange(e){
      console.log(e.nativeEvent.text);
      this.setState({ title: e.nativeEvent.text});
    }

    save(){}

    async sendPushNotification(expoPushToken) {
  if(this.state.chStdate==="" || this.state.tot===""){
        alert("Please enter start date and total number of days!");
      }
      else if(this.state.mode===""){
        alert("Pls select what you want to measure");
      }
      else{
        var date = new Date(this.state.chStdate);
        console.log(date);
        date.setDate(parseInt(this.state.tot)+date.getDate()-1);
        console.log(date);
        date=(moment(date).format("DD-MM-YYYY"));
        console.log(date);
        var Stdate = new Date(this.state.chStdate);
      await fetch(url+'/measurementReminder',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: this.props.route.params.name,
        title: "Measurement Reminder",
        body: "It's time to record your "+this.state.mode,
        data:{
          key:this.state.key,
          screen:"Reminder",
          title:"Measurement Record",
          head : this.state.mode,
          desc: this.state.desc
        },
        start_year: Stdate.getFullYear(),
        start_month: ""+(parseInt(Stdate.getMonth())+1),
        start_date: parseInt(Stdate.getDate()),
        end_year: date.split("-")[2],
        end_month: date.split("-")[1],
        end_date: parseInt(date.split("-")[0]),
        timeArray: [this.state.time.split(" : ")[0]+":"+this.state.time.split(" : ")[1]+":00"],
        curr_token: expoPushToken,
        key:this.state.key,
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
      alert('Failed to get push token for push notification!');
      /*await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
  });*/
      return;
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

        <View style={styles.dropdown}>
          <Picker mode='dropdown' 
          style={styles.picker} 
          selectedValue={this.state.mode}
          onValueChange={(itemValue, itemIndex) => this.setState({ mode: itemValue })}>
          <Picker.Item label="Type of Measurement" value=""/>
          <Picker.Item label="Blood Sugar (before the meal)" value="Blood Sugar(before meal)" />
          <Picker.Item label="Blood Sugar (after the meal)" value="Blood Sugar(after meal)" />
          <Picker.Item label="Weight" value="Weight" />
          <Picker.Item label="Temperature" value="Body Temperature" />
          <Picker.Item label="Heart Rate" value="Heart Rate" />
          <Picker.Item label="Blood Pressure" value="Blood Pressure" />
          </Picker>
          </View>

        <TouchableOpacity onPress={() => this.setState({ isStDatePickerVisible: true})}>
        <TextInput style={styles.textinput} placeholder="Start Date for the reminder" 
        placeholderTextColor="grey"
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

        
        <TextInput style={styles.textinput} placeholder="Total no. of days" 
        placeholderTextColor="grey"
        underlineColorAndroid={'transparent'}
        value={this.state.tot}
        keyboardType={'numeric'}
        onChange = {(e)=>this.setState({ tot: e.nativeEvent.text})}
        />

        <DateTimePickerModal
        isVisible={this.state.isEnDatePickerVisible}
        mode="date"
        onConfirm={this.handleEnDateConfirm}
        onCancel={() => this.setState({ isEnDatePickerVisible: false})}
        />

        <TouchableOpacity onPress={() => this.setState({ isTimePickerVisible: true})}>
        <TextInput style={styles.textinput} placeholder="Time" 
        placeholderTextColor="grey"
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
        

        <TextInput style={styles.textinputDiary} placeholder="Description (Optional)" 
        placeholderTextColor="grey" multiline={true}
        underlineColorAndroid={'transparent'} 
        value={this.state.desc}
        onChange = {(e)=>this.setState({ desc: e.nativeEvent.text})}/>

        <TouchableOpacity style={styles.button} onPress={async () => {
          await this.sendPushNotification(this.state.expoPushToken);
        }}>
        <Text style={styles.btntext}>Set a Reminder  </Text>
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

     picker: {
      height: 50, 
        // width: 220,
        alignSelf: 'stretch',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        //borderRadius: 5,
        //backgroundColor: 'rgba(255,255,255,0.6)',
      },

      dropdown: {
       color: 'black',
       alignSelf: 'stretch',
       height: 50,
       paddingTop: 0,
       paddingBottom: 10,
       paddingLeft:0,
       marginTop: 10,
       marginBottom: 20,
       borderColor: 'black',
       borderWidth: 1,
       borderRadius: 5,
       textAlignVertical: "top",
       fontSize: 18,
       backgroundColor: 'rgba(30, 85, 92,0.1)',
     },

  });