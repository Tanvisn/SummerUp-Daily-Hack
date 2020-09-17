import 'react-native-gesture-handler';
import React, {useState} from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  TextInput, 
  Keyboard, 
  TouchableWithoutFeedback,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  ActivityIndicator,
  Picker } from 'react-native';
  import Constants from 'expo-constants';
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
  import moment from "moment";
  import { url } from './../../components/url';

  export default class RegisterShop extends React.Component{
    constructor(props){
      super(props);
      this.state={
        isDatePickerVisible: false,
        isTimePickerVisible: false,
        key:0,
        date: "",
        title: "",
        mode: "",
        time: "",
        time2:"",
        city: "",
        edit:true,
        shopName: "",
        addr: "",

      };
      
      
    }

   

    render(){

      return (

       <KeyboardAwareScrollView 
       behavior="height" style={{ height:2000 }}
       enable>
       
       <ScrollView>

       <View style={styles.container}>

       <TextInput style={styles.textinput} placeholder="Name of the Shop" 
       placeholderTextColor="black"
       underlineColorAndroid={'transparent'}
       value={this.state.shopName}
      onChange = {(e)=>this.setState({ shopName: e.nativeEvent.text})}/>


       <TextInput style={styles.textinputDiary} placeholder="Address" 
       placeholderTextColor="black" multiline={true}
       underlineColorAndroid={'transparent'} 
       value={this.state.addr}
      onChange = {(e)=>this.setState({ addr: e.nativeEvent.text})}/>


       <TextInput style={styles.textinput} placeholder="City" 
       placeholderTextColor="black"
       underlineColorAndroid={'transparent'}
       value={this.state.city}
       onChange = {(e)=>this.setState({ city: e.nativeEvent.text})}/>

        <Text style={styles.dayText}>Please enter Timings:</Text>
        <Text>IF IT IS A HOLIDAY ENTER "OFF"</Text>
        <Text>PLEASE ENTER IN 24 HOUR FORMAT</Text>

       <View>
       <Text style={styles.dayText}>Monday</Text>
       <View>
       <TextInput style={styles.timeinput} placeholder="Start Time (HH:MM)" 
       placeholderTextColor="black"
       underlineColorAndroid={'transparent'}/>

       <TextInput style={styles.timeinput} placeholder="End Time (HH:MM)" 
       placeholderTextColor="black"
       underlineColorAndroid={'transparent'}/>
       </View>
       </View>

       <View>
       <Text style={styles.dayText}>Tuesday</Text>
       <View>
       <TextInput style={styles.timeinput} placeholder="Start Time (HH:MM)" 
       placeholderTextColor="black"
       underlineColorAndroid={'transparent'}/>

       <TextInput style={styles.timeinput} placeholder="End Time (HH:MM)" 
       placeholderTextColor="black"
       underlineColorAndroid={'transparent'}/>
       </View>
       </View>

       <View>
       <Text style={styles.dayText}>Wednesday</Text>
       <View>
       <TextInput style={styles.timeinput} placeholder="Start Time (HH:MM)" 
       placeholderTextColor="black"
       underlineColorAndroid={'transparent'}/>

       <TextInput style={styles.timeinput} placeholder="End Time (HH:MM)" 
       placeholderTextColor="black"
       underlineColorAndroid={'transparent'}/>
       </View>
       </View>

       <View>
       <Text style={styles.dayText}>Thursday</Text>
       <View>
       <TextInput style={styles.timeinput} placeholder="Start Time (HH:MM)" 
       placeholderTextColor="black"
       underlineColorAndroid={'transparent'}/>

       <TextInput style={styles.timeinput} placeholder="End Time (HH:MM)" 
       placeholderTextColor="black"
       underlineColorAndroid={'transparent'}/>
       </View>
       </View>

       <View>
       <Text style={styles.dayText}>Friday</Text>
       <View>
       <TextInput style={styles.timeinput} placeholder="Start Time (HH:MM)" 
       placeholderTextColor="black"
       underlineColorAndroid={'transparent'}/>

       <TextInput style={styles.timeinput} placeholder="End Time (HH:MM)" 
       placeholderTextColor="black"
       underlineColorAndroid={'transparent'}/>
       </View>
       </View>

       <View>
       <Text style={styles.dayText}>Saturday</Text>
       <View>
       <TextInput style={styles.timeinput} placeholder="Start Time (HH:MM)" 
       placeholderTextColor="black"
       underlineColorAndroid={'transparent'}/>

       <TextInput style={styles.timeinput} placeholder="End Time (HH:MM)" 
       placeholderTextColor="black"
       underlineColorAndroid={'transparent'}/>
       </View>
       </View>

       <View>
       <Text style={styles.dayText}>Sunday</Text>
       <View>
       <TextInput style={styles.timeinput} placeholder="Start Time (HH:MM)" 
       placeholderTextColor="black"
       underlineColorAndroid={'transparent'}/>

       <TextInput style={styles.timeinput} placeholder="End Time (HH:MM)" 
       placeholderTextColor="black"
       underlineColorAndroid={'transparent'}/>
       </View>
       </View>


       <TouchableOpacity style={styles.button}>
       <Text style={styles.btntext}>Save </Text>
       </TouchableOpacity>
       </View>

        </ScrollView>


       </KeyboardAwareScrollView>


       );
    }
  }

  const styles = StyleSheet.create({
    container: {
     flex: 1,
     padding: 20,
     top:0,
     backgroundColor:'#fff',
   },

   input: {
    top: 100,
    paddingLeft: 40,
    paddingRight: 40,
  },

  header: {
    backgroundColor: '#e91e63',
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
       backgroundColor: 'rgba(255,255,255,0.7)',
     },

     textinput: {
      color: 'black',
      fontSize: 18,
      alignSelf: 'stretch',
      height: 50,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft:10,
      marginBottom: 10,
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 5,
      textAlignVertical: "top",
      backgroundColor: 'rgba(255,255,255,0.6)',
    },


    timeinput: {
      color: 'black',
      fontSize: 18,
      alignSelf: 'stretch',
      height: 50,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft:10,
      marginBottom: 10,
      marginTop:10,
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 5,
      textAlignVertical: "top",
      backgroundColor: 'rgba(255,255,255,0.6)',
    },

    textinputDiary: {
      color: 'black',
      fontSize: 18,
      backgroundColor: 'rgba(255,255,255,0.6)',
      alignSelf: 'stretch',
      height: 150,
      marginBottom: 10,
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
      backgroundColor: '#e91e63',
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

    dayText: {
      color: '#000',
      fontSize: 20,
      fontWeight: "bold",
    }
  });
