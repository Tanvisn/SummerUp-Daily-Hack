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
  Picker } from 'react-native';
  import Constants from 'expo-constants';
  import moment from "moment";
  import TimePicker from 'react-native-simple-time-picker';
  import Note from './Note';

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  export default class MedRecord extends React.Component{
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
        Endate: "",
        name:"",
        desc: "",
        desc: "",
        chStdate: new Date(),
        mode: "",
        time: "",
        noteArray: [],
        noteText: '',
        curr: 15,
        rem: 5,
        each: 1
      };
      this.hideStDatePicker = this.hideStDatePicker.bind(this);
      this.hideEnDatePicker = this.hideEnDatePicker.bind(this);
      this.hideTimePicker = this.hideTimePicker.bind(this);
      this.handleTimeConfirm = this.handleTimeConfirm.bind(this);
      this.handleStDateConfirm = this.handleStDateConfirm.bind(this);
      this.handleEnDateConfirm = this.handleEnDateConfirm.bind(this);
      this.save = this.save.bind(this);
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

    save(){
      console.log(this.props.route);
      console.log(this.state.title);
      this.props.navigation.navigate('Diary',{key: Date.now(), date:this.state.date,title:this.state.title});
    }

    async sendPushNotification(expoPushToken) {
      if(this.state.chStdate==="" || this.state.tot===""){
        alert("Please enter start date and total number of days!");
      }
      
      else{
        var date = new Date(this.state.chStdate);
        console.log(date);
        date.setDate(parseInt(this.state.tot)+date.getDate()-1);
        console.log(date);
        date=(moment(date).format("DD-MM-YYYY"));
        console.log(date);
        var Stdate = new Date(this.state.chStdate);
        await fetch(url+'/medicineReminder',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userName: this.props.route.params.name,
            title: "Medicine Reminder",
            body: "It's time to take "+this.state.name,
            data: "Idk what to send",
            start_year: Stdate.getFullYear(),
            start_month: ""+(parseInt(Stdate.getMonth())+1),
            start_date: parseInt(Stdate.getDate()),
            end_year: date.split("-")[2],
            end_month: date.split("-")[1],
            end_date: parseInt(date.split("-")[0]),
            hour: this.state.time.split(" : ")[0],
            minutes: this.state.time.split(" : ")[1],
            seconds: "00",
            curr_token: expoPushToken,
          })
        });
      }

    }

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

changeNumCurr = (n) => {
        if(this.state.curr == 0)
        {
          if(n>0)
          {
            this.setState({ curr: this.state.curr + n});  
          }
          
        }

        else if(this.state.curr > 0)
        {
          this.setState({ curr: this.state.curr + n});  
        }
        
      }

      changeNumRem = (n) => {
        if(this.state.rem == 0)
        {
          if(n>0)
          {
            this.setState({ rem: this.state.rem + n});  
          }
          
        }

        else if(this.state.rem > 0)
        {
          this.setState({ rem: this.state.rem + n});  
        }
        
      }

      changeNumEach = (n) => {
        if(this.state.each == 0)
        {
          if(n>0)
          {
            this.setState({ each: this.state.each + n});  
          }
          
        }

        else if(this.state.each > 0)
        {
          this.setState({ each: this.state.each + n});  
        }
        
      }

      showDialog(isShow){
        this.setState({isDialogVisible: isShow});
      }

componentDidMount() {
  this.registerForPushNotificationsAsync();
/*
  Notifications.addNotificationReceivedListener(notification => {
    this.setState({notification:true});
  });

  Notifications.addNotificationResponseReceivedListener(response => {
    console.log(response);
  });*/
}


render(){
  var notes = this.state.noteArray.map((val,key) => {
          return <Note key={key} keyval={key} val={val}
          deleteMethod={ ()=> this.deleteNote(key) } />
        })

  return (
    <View style={styles.container}>

    <View style={styles.input}>

    <TextInput style={styles.textinput} placeholder="Name of the Medicine" 
    placeholderTextColor="black"
    underlineColorAndroid={'transparent'} 
    value = {this.state.name}
    onChange = {(e)=>this.setState({ name: e.nativeEvent.text})}/>

    <TouchableOpacity onPress={() => this.setState({ isStDatePickerVisible: true})}>
    <TextInput style={styles.textinput} placeholder="Start Date of the course" 
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


    <TextInput style={styles.textinputDiary} placeholder="Description (Optional)" 
    placeholderTextColor="black" multiline={true}
    underlineColorAndroid={'transparent'} 
    value={this.state.desc}
    onChange = {(e)=>this.setState({ desc: e.nativeEvent.text})}/>

    <View style={styles.scrollContainer}>

          {notes}

          </View>


          <View style={{ position:'absolute', top:380 }}>
          <View style={{ left:80 }}>
          <Text style={styles.paragraph}>
          Current Inventory
          </Text>

          </View>

          <View style={{ left: 120, }}>
          <Text style={{
            fontWeight: 'bold',
            fontSize: 24,
            textAlign: 'center',
            color: 'black',
            borderBottomWidth: 1,
            width: 100,
            borderBottomColor: '#1e555c',
          }}>
          {this.state.curr} &nbsp;
          </Text>
          </View>

          <TouchableOpacity style={{
            position:'absolute',
            left:220,
            top: 50
          }}
          onPress={() => this.changeNumCurr(+1)}>
          <AntDesign name="pluscircle" size={26} color="#1e555c" />
          </TouchableOpacity>

          <TouchableOpacity style={{
            position:'absolute',
            left:90,
            top: 50
          }}
          onPress={() => this.changeNumCurr(-1)}>
          <AntDesign name="minuscircle" size={26} color="#1e555c" />
          </TouchableOpacity>

          <View style={{ left:130 }}>
          <Text style={styles.paragraph}>
          Pill(s)
          </Text>

          </View>

          
          </View>

          <View style={{ position:'absolute', top:500 }}>

          <View style={{ left:50 }}>
          <Text style={styles.paragraph}>
          Pill(s) taken in one dose
          </Text>
          </View>


          <View style={{ left: 120, }}>
          <Text style={{
            fontWeight: 'bold',
            fontSize: 24,
            textAlign: 'center',
            color: 'black',
            borderBottomWidth: 1,
            width: 100,
            borderBottomColor: '#1e555c',
            marginBottom: 20,
          }}>
          {this.state.each} &nbsp;
          </Text>
          </View>

          <TouchableOpacity style={{
            position:'absolute',
            left:220,
            top: 50
          }}
          onPress={() => this.changeNumEach(+0.25)}>
          <AntDesign name="pluscircle" size={26} color="#1e555c" />
          </TouchableOpacity>

          <TouchableOpacity style={{
            position:'absolute',
            left:90,
            top: 50
          }}
          onPress={() => this.changeNumEach(-0.25)}>
          <AntDesign name="minuscircle" size={26} color="#1e555c" />
          </TouchableOpacity>

          </View>

          <View style={{ position:'absolute', top:590 }}>

          <View style={{ left:90 }}>
          <Text style={styles.paragraph}>
          Remind me when
          </Text>
          </View>

          

          <View style={{ left: 120, }}>
          <Text style={{
            fontWeight: 'bold',
            fontSize: 24,
            textAlign: 'center',
            color: 'black',
            borderBottomWidth: 1,
            width: 100,
            borderBottomColor: '#1e555c',
          }}>
          {this.state.rem} &nbsp;
          </Text>
          </View>

          <TouchableOpacity style={{
            position:'absolute',
            left:220,
            top: 50
          }}
          onPress={() => this.changeNumRem(+1)}>
          <AntDesign name="pluscircle" size={26} color="#1e555c" />
          </TouchableOpacity>

          <TouchableOpacity style={{
            position:'absolute',
            left:90,
            top: 50
          }}
          onPress={() => this.changeNumRem(-1)}>
          <AntDesign name="minuscircle" size={26} color="#1e555c" />
          </TouchableOpacity>

          <View style={{ left:70 }}>
          <Text style={styles.paragraph}>
          pill(s) are remaining
          </Text>
          </View>

          </View>

          <TouchableOpacity onPress={this.addNote.bind(this)} style={styles.button}>
          <Text style={styles.btntext}>Add Reminder Time   <Feather name="clock" size={24} color="white" /></Text>
          </TouchableOpacity>

    <TouchableOpacity style={styles.button} onPress={async () => {
      await this.sendPushNotification(this.state.expoPushToken);
    }}>
    <Text style={styles.btntext}>Set a Reminder</Text>
    </TouchableOpacity>
    </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff",
  },

  paragraph: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
    alignItems:'center',
    color: '#1e555c',
  },


  scrollContainer: {
    top: 440,
    marginBottom:60,
    height:1000,
  },


  textInput: {
    alignSelf: 'stretch',
    color: '#fff',
    padding: 20,
    backgroundColor: '#252525',
    borderTopWidth: 2,
    borderTopColor: '#ededed',
  },

  item:{
    width:"80%",
    backgroundColor:"#fff",
    borderRadius:20,
    padding:10,
    marginBottom:10,
    flexDirection:"row",
  },

  input: {
    top: 30,
    paddingLeft: 40,
    paddingRight: 40,
    height:2000,
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
    width: 300,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#1e555c',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    position: 'absolute',
    top:780,
    left:20,
  },

  saveButton: {
    width: 300,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#1e555c',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
        //bottom:700,
        top:0,
        left:20,
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

      footer: {
        bottom: 50,
        left: 20,
        right: 0,
        zIndex: 10,
        width: 300,
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#1e555c',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
      },

    });