/*tp*/
import 'react-native-gesture-handler';
import React, {useState, useEffect, useRef} from "react";
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
  Picker, Button, Platform  } from 'react-native';
  import Constants from 'expo-constants';
  import moment from "moment";
  import TimePicker from 'react-native-simple-time-picker';
/*  export default class MeasureRecord extends React.Component{
    constructor(props){
      super(props);
      this.state={
        isStDatePickerVisible: false,
        isEnDatePickerVisible: false,
        isTimePickerVisible: false,
        key:0,
        chStdate: "",
        Stdate: "",
        Endate: "",
        desc: "",
        mode: "",
        time: "08 : 00",
        tot: 0,
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

    handleStDateConfirm(Stdate) {
      this.hideStDatePicker();
      this.setState({ chStdate:Stdate, Stdate:moment(Stdate).format('Do MMMM YYYY')});
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

    save(){
      console.log(this.props.route);
      console.log(this.state.chStdate.getDate());
      if(this.state.chStdate==="" || this.state.tot===0){
        alert("Please enter start date and total number of days!");
      }
      else if(this.state.mode===""){
        alert("Pls select what you want to measure");
      }
      else{
        var date = this.state.chStdate;
        date.setDate(date.getDate() + this.state.tot);
        console.log(moment(date).format("DD-MM-YYYY"));
      fetch(url+'/measurementReminder',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: this.props.route.params.name,
        title: "Measurement Reminder",
        body: "It's time to record your "+this.state.mode,
        data: "Idk what to send",
        startDate: moment(this.state.chStdate).format('YYYY,MM,DD'),
        endDate: moment(date).format('YYYY,MM,DD'),
        start_year: "2020",
        start_month: "07",
        start_date: 21,
        end_year: "2020",
        end_month: "07",
        end_date: 22,
        hour: "12",
        minutes: "46",
        seconds: "00"
      })

    })

    .then((response) => (response.json()))
    
    .then((res) => {
      console.log("response");
      console.warn(res);
      //Alert.alert(res.message);
      if(res.success === true){
        console.warn(res);
        this.props.navigation.navigate('MedHome');
        
      }
      else {
        alert("Something went wrong. Please try again");
      }
    })
    
    .catch(err => {
      console.log(err);
    });
      }
    }

    render(){

      return (
        <View style={styles.container}>
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

        <TouchableOpacity style={styles.button} onPress={this.save}>
        <Text style={styles.btntext}>Set a Reminder</Text>
        </TouchableOpacity>
        </View>
        </View>


        );
    }
  }
*/

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
 /* const [expoPushToken, setExpoPushToken] = useState('');
  const [expoPushToken, setExpoPushToken] = useState('');
  const [expoPushToken, setExpoPushToken] = useState('');
  const [expoPushToken, setExpoPushToken] = useState('');
*/
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <View style={styles.container}>
        <View style={styles.input}>

        /*<View style={styles.dropdown}>
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

        */
        <TouchableOpacity style={styles.button} onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}>
        <Text style={styles.btntext}>Set a Reminder</Text>
        </TouchableOpacity>
        </View>
        </View>

  );
}
// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Medicine Reminder',
    body: 'Time to take your pill!',
    data: { data: 'goes here' },
  };
  /*
//if(this.state.chStdate==="" || this.state.tot===0){
  //      alert("Please enter start date and total number of days!");
    //  }
      //else if(this.state.mode===""){
        //alert("Pls select what you want to measure");
//      }
  //    else{
    //    var date = this.state.chStdate;
      //  date.setDate(date.getDate() + this.state.tot);
//        console.log(moment(date).format("DD-MM-YYYY"));*/
      await fetch(url+'/measurementReminder',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: this.props.route.params.name,
        title: "Measurement Reminder",
        body: "It's time to record your "+"weight",
        data: "Idk what to send",
        start_year: "2020",
        start_month: "07",
        start_date: 21,
        end_year: "2020",
        end_month: "07",
        end_date: 22,
        hour: "13",
        minutes: "12",
        seconds: "00"
      })
    });
  //  }

}
//Checks whether notification permission is given to the app if not then it alerts!
async function registerForPushNotificationsAsync() {
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
      return;
    }
    //Creates a token.
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
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
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },

    input: {
      top: 100,
      paddingLeft: 40,
      paddingRight: 40,
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