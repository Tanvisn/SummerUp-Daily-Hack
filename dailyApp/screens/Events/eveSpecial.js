import 'react-native-gesture-handler';
import React, {useState} from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
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
  export default class EveSpecial extends React.Component{
    constructor(props){
      super(props);
      this.state={
        isStDatePickerVisible: false,
        isEnDatePickerVisible: false,
        isTimePickerVisible: false,
        key:0,
        Stdate: "",
        Endate: "",
        title: "",
        mode: "",
        time: "",
      };
      this.hideStDatePicker = this.hideStDatePicker.bind(this);
      this.hideEnDatePicker = this.hideEnDatePicker.bind(this);
      this.hideTimePicker = this.hideTimePicker.bind(this);
      this.handleTimeConfirm = this.handleTimeConfirm.bind(this);
      this.handleStDateConfirm = this.handleStDateConfirm.bind(this);
      this.handleEnDateConfirm = this.handleEnDateConfirm.bind(this);
      this.save = this.save.bind(this);
      this.handleTitleChange = this.handleTitleChange.bind(this);
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
      this.setState({ Stdate:moment(Stdate).format('Do MMMM YYYY')});
    };

    handleEnDateConfirm(Endate) {
      this.hideEnDatePicker();
      this.setState({ Endate:moment(Endate).format('Do MMMM YYYY')});
    };


    handleTimeConfirm(time) {
      this.hideTimePicker();
      this.setState({ time:moment(time).format('HH : mm')});
    };

    handleTitleChange(e){
      console.log(e.nativeEvent.text);
      this.setState({ title: e.nativeEvent.text});
    }

    save(){
      console.log(this.props.route);
      console.log(this.state.title);
      this.props.navigation.navigate('Diary',{key: Date.now(), date:this.state.date,title:this.state.title});
    }

    render(){

      return (

         <ImageBackground
        source={require('../../assets/eveBackground.png')}
        style={styles.back}
        >

        <View style={styles.container}>


      

        <View style={styles.input}>

        <TextInput style={styles.textinput} placeholder="Event" 
        placeholderTextColor="black"
        underlineColorAndroid={'transparent'} />

        <TouchableOpacity onPress={() => this.setState({ isStDatePickerVisible: true})}>
        <TextInput style={styles.textinput} placeholder="Date" 
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
        
        <TextInput style={styles.textinputDiary} placeholder="Description (optional)" 
        placeholderTextColor="black" multiline={true}
        underlineColorAndroid={'transparent'} />

        <TouchableOpacity style={styles.button}>
        <Text style={styles.btntext}>Get Notified!</Text>
        </TouchableOpacity>
        </View>
        </View>
        </ImageBackground>

        );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(255,255,255,0.3)',
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
      backgroundColor: '#ededfd',
    },

    textinputDiary: {
      color: 'black',
      fontSize: 18,
      backgroundColor: '#ededfd',
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
      backgroundColor: '#3D348B',
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

     back: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
  });